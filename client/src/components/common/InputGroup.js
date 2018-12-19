import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const InputGroup = ({ name, placeholder, value, error, type, autoComplete, icon, handleChange }) => {
	return (
		<div className="input-group mb-3">
			<div className="input-goup-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input
				autoComplete={autoComplete}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				type="text"
				name={name}
				value={value}
				onChange={handleChange}
			/>

			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

InputGroup.protoTypes = {
	name: propTypes.string.isRequired,
	placeholder: propTypes.string,
	value: propTypes.string.isRequired,
	icon: propTypes.string,
	error: propTypes.string,
	type: propTypes.string.isRequired,
	autoComplete: propTypes.string,
	handleChange: propTypes.func.isRequired
};

InputGroup.defaultProps = {
	type: 'text'
};

export default InputGroup;
