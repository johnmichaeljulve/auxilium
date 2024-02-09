import React from "react";

const CustomInput = ({ text, type = "text", handleChange, value, name }) => {
	return (
		<>
			<label>{text}</label>
			<input
				type={type}
				className={`h-10 rounded border-solid border-white border-2 bg-transparent indent-1`}
				autoComplete="off"
				onChange={handleChange}
				value={value}
				name={name}
			/>
		</>
	);
};

export default CustomInput;
