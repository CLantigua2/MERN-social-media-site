import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	render() {
		return (
			<div>
				<div className="landing">
					<div className="dark-overlay landing-inner text-light ">
						<div className="container">
							<div className="row">
								<div className="col-md-12 text-center ">
									<h1 className="display-3 mb-4">DevSocial</h1>
									<img
										src="https://image.flaticon.com/icons/svg/1055/1055673.svg"
										width="224"
										height="224"
										alt="Customer review free icon"
										title="Customer review free icon"
									/>
									<p className="lead">
										{' '}
										Create a developer profile/portfolio, share posts and get help from other
										developers
									</p>
									<hr />
									<Link to="/register" className="btn btn-lg btn-info mr-2">
										Sign Up
									</Link>
									<Link to="/login" className="btn btn-lg btn-light">
										Login
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* About us section */}
				<section className="about">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center p-5 mb-5">
								<h2>About DevSocial</h2>

								<p className="lead">
									At DevSocial, we aim to make it easier to connect with professionals that have
									common interests. You can share projects or just talk about the newest technology
									that you're interested in. Check someones latest github repositories or have a
									friendly chat. Once you create a profile, you can add any and all of your social
									medial links to give your new friends an idea where they can find or your content.
								</p>
							</div>
						</div>
					</div>
				</section>
				{/* new image with stuff in it */}
				<div className="second-landing">
					<div className="second-landing-inner text-light dark-overlay">
						<div className="container">
							<div className="row">
								<div className="col-md-12 text-center p-5 mb-4 mt-5">
									<h2>Social Space For Developers</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Landing);
