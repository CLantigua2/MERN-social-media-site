import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const TextFieldGroup = ({ name, placeholder, value, error, info, type, handleChange, disabled, autoComplete }) => {
	return (
		<div className="form-group">
			<input
				autoComplete={autoComplete}
				type={type}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={handleChange}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextFieldGroup.protoTypes = {
	name: propTypes.string.isRequired,
	placeholder: propTypes.string,
	value: propTypes.string.isRequired,
	info: propTypes.string,
	error: propTypes.string,
	type: propTypes.string.isRequired,
	handleChange: propTypes.func.isRequired,
	disabled: propTypes.string
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;
