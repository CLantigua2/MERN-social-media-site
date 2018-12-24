import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../redux/actions/postActions';

class PostItem extends Component {
	state = {
		liked: false
	};
	onDeleteClick = (id) => {
		this.props.deletePost(id);
	};

	onLikeClick = (id) => {
		this.setState({ liked: true });
		this.props.addLike(id);
	};

	onUnlikeClick = (id) => {
		this.setState({ liked: false });
		this.props.removeLike(id);
	};

	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter((like) => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { post, auth, showActions } = this.props;
		const { liked } = this.state;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
						</a>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{showActions ? (
							<span>
								{liked === false ? (
									<button
										onClick={(e) => {
											e.preventDefault();
											this.onLikeClick(post._id);
										}}
										type="button"
										className="btn btn-light mr-4"
									>
										<i
											className="fas fa-thumbs-up"
											onClick={() => {
												this.findUserLike(post.likes);
											}}
										/>
									</button>
								) : (
									<button
										onClick={(e) => {
											e.preventDefault();
											this.onUnlikeClick(post._id);
										}}
										type="button"
										className="btn btn-light mr-2"
									>
										<i className="text-primary fas fa-thumbs-up" />
										<span className="badge badge-light">{post.likes.length}</span>
									</button>
								)}
								<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
									Comments
								</Link>
								{post.user === auth.user.id ? (
									<button
										onClick={(e) => {
											e.preventDefault();
											this.onDeleteClick(post._id);
										}}
										type="button"
										className="btn btn-danger mr-1"
									>
										<i className="fas fa-times" />
									</button>
								) : null}
							</span>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = {
	showActions: true
};

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
