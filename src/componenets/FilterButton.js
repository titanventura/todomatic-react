import React from "react";

function FilterButton(props) {
	const { text, isPressed, setPressed } = props;
	return (
		<button
			type="button"
			className="btn toggle-btn"
			aria-pressed={`${isPressed}`}
			onClick={(e) => {
				setPressed(text);
			}}
		>
			<span className="visually-hidden">Show </span>
			<span>{text}</span>
			<span className="visually-hidden"> tasks</span>
		</button>
	);
}

export default FilterButton;
