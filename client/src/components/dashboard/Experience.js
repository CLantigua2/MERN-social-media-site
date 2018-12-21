import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import * as moment from 'moment';

class Experience extends Component {
	render() {
		const experience = this.props.experience.map((exp) => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
					{exp.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{exp.from}</Moment>}
				</td>
				<td>
					<button className="btn btn-danger">Delete</button>
				</td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-2">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
						{experience}
					</thead>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {};

export default connect(null)(withRouter(Experience));