import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../redux/actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const {
			handle,
			company,
			website,
			location,
			status,
			skills,
			githubusername,
			bio,
			twitter,
			facebook,
			linkedin,
			youtube,
			instagram
		} = this.state;
		const profileData = {
			handle,
			company,
			website,
			location,
			status,
			skills,
			githubusername,
			bio,
			twitter,
			facebook,
			linkedin,
			youtube,
			instagram
		};
		this.props.createProfile(profileData, this.props.history);
	};

	render() {
		const { errors, displaySocialInputs } = this.state;
		let socialInputs;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						changeHandler={this.changeHandler}
						error={errors.twitter}
					/>

					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						changeHandler={this.changeHandler}
						error={errors.facebook}
					/>

					<InputGroup
						placeholder="LinkedIn Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						changeHandler={this.changeHandler}
						error={errors.linkedin}
					/>

					<InputGroup
						placeholder="Youtube Profile URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						changeHandler={this.changeHandler}
						error={errors.youtube}
					/>

					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						changeHandler={this.changeHandler}
						error={errors.instagram}
					/>
				</div>
			);
		}
		//select options for status
		const options = [
			{ label: '* Select Professional Status', value: '0' },
			{ label: 'Front End Developer', value: 'Front End Developer' },
			{ label: 'Back End Developer', value: 'Back End Developer' },
			{ label: 'Full Stack Developer', value: 'Full Stack Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Quality Engineer', value: 'Quality Engineer' },
			{ label: 'Designer', value: 'Designer' },
			{ label: 'Senior Designer', value: 'Senior Designer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' }
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">
								Let's get some information to make your profile stand out
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile username"
									name="handle"
									value={this.state.handle}
									handleChange={this.changeHandler}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname"
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									changeHandler={this.changeHandler}
									options={options}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
								/>

								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									handleChange={this.changeHandler}
									error={errors.company}
									info="Could be your own company or one that you work for"
								/>

								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									handleChange={this.changeHandler}
									error={errors.website}
									info="Could be your own website or a company site"
								/>

								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									handleChange={this.changeHandler}
									error={errors.location}
									info="City or city and state suggested (eg. Seattle, WA)"
								/>

								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									handleChange={this.changeHandler}
									error={errors.skills}
									info="Please use commas to separete values (eg. HTML, CSS, JavaScript, PHP)"
								/>

								<TextFieldGroup
									placeholder="Github Username"
									name="githubusername"
									value={this.state.githubusername}
									handleChange={this.changeHandler}
									error={errors.githubusername}
									info="If you want your latest repos and a Github link, include your username"
								/>

								<TextAreaFieldGroup
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									handleChange={this.changeHandler}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											this.setState((prevState) => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
										className="btn btn-light"
									>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input type="submit" value="Submit" className="btn btn-block btn-info mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});
export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
