import React from "react";

const formField = ({
	labelName,
	placeHolder,
	inputType,
	isTextArea,
	value,
	handleChange,
}) => {
	return (
		<label>
			{labelName && <span>{labelName}</span>}
			{isTextArea ? (
				<textarea
					required
					value={value}
					onChange={handleChange}
                    rows={10}
                    placeholder={placeHolder}
					className="outline-none border-[1px] text-black rounded-[4px]"
				/>
			) : (
				<input
					type={inputType}
					required
					value={value}
					onChange={handleChange}
                    placeholder={placeHolder}
					className="outline-none border-[1px] text-black rounded-[4px]"
				/>
			)}
		</label>
	);
};

export default formField;
