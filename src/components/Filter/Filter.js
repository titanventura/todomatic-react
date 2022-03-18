import React from "react";

function Filter(props) {
	const { name, isPressed, setPressed } = props;

	return (
		<button
			type="button"
			className="btn toggle-btn"
			onClick={() => {
				setPressed(name);
			}}
			data-testid={`${name}-filter`}
			aria-label="filterBtn"
			aria-pressed={isPressed}
		>
			<span className="visually-hidden">Show </span>
			<span>{name}</span>
			<span className="visually-hidden"> tasks</span>
		</button>
	);
}

export default Filter;
