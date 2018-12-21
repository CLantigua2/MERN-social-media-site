import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import PropTypes from 'prop-types';
import { addEducation } from '../../redux/actions/profileActions';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		const eduData = {
			school: this.state.school,
			degree: this.state.title,
			fieldofstudy: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addEducation(eduData, this.props.history);
	};

	onCheck = (e) => {
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		});
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
							<small className="d-block pb-3">*= required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* School"
									name="school"
									handleChange={this.handleChange}
									value={this.state.school}
									error={errors.school}
								/>
								<TextFieldGroup
									placeholder="* Degree or Certification"
									name="degree"
									value={this.state.degree}
									handleChange={this.handleChange}
									error={errors.degree}
								/>
								<TextFieldGroup
									placeholder="* Field of Study"
									name="fieldofstudy"
									value={this.state.fieldofstudy}
									handleChange={this.handleChange}
									error={errors.fieldofstudy}
								/>
								<h6>From Date</h6>
								<TextFieldGroup
									name="from"
									type="date"
									value={this.state.from}
									handleChange={this.handleChange}
									error={errors.from}
								/>
								<h6>To Date</h6>
								<TextFieldGroup
									name="to"
									type="date"
									value={this.state.to}
									handleChange={this.handleChange}
									error={errors.to}
									disabled={this.state.disabled ? 'disabled' : ''}
								/>
								<div className="form-check mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
										id="current"
									/>
									<label htmlFor="current" className="form-check-label">
										Current Job
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Job Description"
									name="description"
									value={this.state.description}
									handleChange={this.handleChange}
									error={errors.description}
									info="Tell us about the position"
								/>
								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
