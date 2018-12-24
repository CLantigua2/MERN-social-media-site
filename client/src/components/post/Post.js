import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getPost } from '../../redux/actions/postActions';

class Post extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}
	render() {
		return (
			<div>
				<h1>Hello Post</h1>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post
});

Post.propTypes = {
	getPost: propTypes.func.isRequired,
	post: propTypes.object.isRequired
};

export default connect(mapStateToProps, { getPost })(Post);
