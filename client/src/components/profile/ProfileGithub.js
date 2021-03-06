import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
	constructor(props) {
		super(props);
		this.state = {
			repos: []
		};
	}

	componentDidMount() {
		const { username } = this.props;

		fetch(`/api/profile/github/${username}`)
			.then((res) => res.json())
			.then((data) => {
				if (this.refs.myRef) {
					this.setState({ repos: data });
				}
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { repos } = this.state;
		let repoItems;
		if (repos) {
			repoItems = repos.slice(0, 5).map((repo) => (
				<div key={repo.id} className="card card-body mb-2">
					<div className="row">
						<div className="col-md-6">
							<h4>
								<a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">
									{' '}
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div className="col-md-6">
							<span className="badge badge-info mr-3 p-2">Stars: {repo.stargazers_count}</span>
							<span className="badge badge-secondary mr-3 p-2">Watchers: {repo.watchers_count}</span>
							<span className="badge badge-success p-2">Forks: {repo.forks_count}</span>
						</div>
					</div>
				</div>
			));
		}

		return (
			<div ref="myRef">
				<hr />
				<h3 className="mb-4">Latest Github Repos </h3>
				{repoItems ? repoItems : undefined}
			</div>
		);
	}
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileGithub;
