import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, info, handleChange, options }) => {
	const selectOptions = options.map((option) => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));
	return (
		<div className="form-group">
			<select
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				name={name}
				value={value}
				onChange={handleChange}
			>
				{selectOptions}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

SelectListGroup.protoTypes = {
	name: propTypes.string.isRequired,
	autoComplete: propTypes.string,
	value: propTypes.string.isRequired,
	info: propTypes.string,
	error: propTypes.string,
	handleChange: propTypes.func.isRequired,
	options: propTypes.array.isRequired
};

export default SelectListGroup;
