import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		const loginUser = {
			email,
			password
		};
		this.props.loginUser(loginUser);
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
		if (this.props.auth.isAuthenticated) {
			this.setState({ isAuthenticated: this.props.auth.isAuthenticated });
			this.props.history.push('/dashboard');
		}
	}

	render() {
		const { email, password, errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your DevConnector account</p>
							<form onSubmit={this.handleSubmit}>
								<TextFieldGroup
									placeholder="Email..."
									name="email"
									type="email"
									value={email}
									handleChange={this.handleChange}
									error={errors.email}
									autoComplete="email"
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
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
