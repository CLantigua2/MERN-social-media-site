import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../redux/actions/postActions';

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {}
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	componentDidUpdate(prevProps) {
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		// get user who's making the post from auth
		const { user } = this.props.auth;
		// get the post from state
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.props.addPost(newPost);
		this.setState({
			text: ''
		});
	};

	render() {
		const { errors, text } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Something...</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<TextAreaFieldGroup
								placeholder="create a Post"
								name="text"
								value={text}
								handleChange={this.handleChange}
								error={errors.text}
							/>
							<button className="btn btn-dark">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors,
	auth: state.auth
});

export default connect(mapStateToProps, { addPost })(PostForm);
