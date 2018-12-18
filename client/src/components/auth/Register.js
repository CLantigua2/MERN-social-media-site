import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux'; // connects component to store
import { registerUser } from '../../redux/actions/authActions'; // imports the action we want to use
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.name
										})}
										autoComplete="new-name"
										placeholder="Name"
										name="name"
										value={name}
										onChange={this.handleChange}
									/>
									{errors.name && <div className="invalid-feedback">{errors.name}</div>}
								</div>
								<div className="form-group">
									<input
										autoComplete="new-email"
										type="email"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.email
										})}
										placeholder="Email Address"
										name="email"
										value={email}
										onChange={this.handleChange}
									/>
									{errors.email && <div className="invalid-feedback">{errors.email}</div>}
									<small className="form-text text-muted">
										This site uses Gravatar so if you want a profile image, use a Gravatar email
									</small>
								</div>
								<div className="form-group">
									<input
										autoComplete="new-password"
										type="password"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password
										})}
										placeholder="Password"
										name="password"
										value={password}
										onChange={this.handleChange}
									/>
									{errors.password && <div className="invalid-feedback">{errors.password}</div>}
								</div>
								<div className="form-group">
									<input
										autoComplete="new-password"
										type="password"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password2
										})}
										placeholder="Confirm Password"
										name="password2"
										value={password2}
										onChange={this.handleChange}
									/>
									{errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.PropTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
