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

	render() {
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Something...</div>
					<div className="card-body">
						<TextAreaFieldGroup
							placeholder="create a Post"
							name="text"
							value={this.state.text}
							handleChange={this.handleChange}
						/>
						<button className="btn btn-dark">Submit</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addPost })(PostForm);
