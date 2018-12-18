import React, { Component } from 'react';
import { connect } from 'react-redux'; // connects component to store
import { registerUser } from '../../redux/actions/authActions'; // imports the action we want to use
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		const newUser = {
			name,
			email,
			password,
			password2
		};

		this.props.registerUser(newUser, this.props.history); // use register user function from store and pass newUser
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	// get changes from this.props in redux state
	static getDerivedStateFromProps(nextProps, prevState) {
		return nextProps.errors ? { errors: nextProps.errors } : null;
	}

	// if component updated then send the new props to state
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	render() {
		const { errors, name, email, password, password2 } = this.state;
		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Name..."
									name="name"
									type="name"
									value={name}
									handleChange={this.handleChange}
									error={errors.name}
									autoComplete="name"
								/>
								<TextFieldGroup
									placeholder="Email..."
									name="email"
									type="email"
									value={email}
									handleChange={this.handleChange}
									error={errors.email}
									autoComplete="email"
									info="This site uses Gravatar, please upload one if you want a profile image"
								/>
								<TextFieldGroup
									placeholder="Password..."
									name="password"
									type="password"
									value={password}
									handleChange={this.handleChange}
									error={errors.password}
									autoComplete="password"
								/>
								<TextFieldGroup
									placeholder="Please type your password again..."
									name="password2"
									type="password"
									value={password2}
									handleChange={this.handleChange}
									error={errors.password2}
									autoComplete="password"
								/>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
