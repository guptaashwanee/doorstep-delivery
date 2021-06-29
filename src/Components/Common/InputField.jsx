import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const InputField = ({
	handleChange,
	error,
	type,
	value,
	icon,
	placeholder,
	name,
	id,
	label,
	variant,
	...rest
}) => {
	return (
		<TextField
			error={error}
			placeholder={placeholder}
			id={id || name}
			label={label}
			type={type}
			fullWidth
			name={name}
			value={value}
			onChange={handleChange}
			variant={variant || "standard"}
			color="primary"
			helperText={error}
			InputProps={
				icon && {
					startAdornment: (
						<InputAdornment position="start">{icon}</InputAdornment>
					),
				}
			}
			{...rest}
		></TextField>
	);
};

export default InputField;
