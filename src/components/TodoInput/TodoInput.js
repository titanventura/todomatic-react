import { nanoid } from "nanoid";
import React, { useState } from "react";

function TodoInput(props) {
	const { addTask } = props;
	const [curTodo, setCurTodo] = useState("");

	const handleChange = (e) => {
		setCurTodo(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addTask({
			id: nanoid(),
			name: curTodo,
			completed: false,
		});
		setCurTodo("");
	};

	return (
		<form data-testid="new-todo-form" onSubmit={handleSubmit}>
			<h2 className="label-wrapper">
				<label htmlFor="new-todo-input" className="label__lg">
					What needs to be done?
				</label>
			</h2>
			<input
				data-testid="new-todo-input"
				type="text"
				id="new-todo-input"
				className="input input__lg"
				name="text"
				autoComplete="off"
				value={curTodo}
				onChange={handleChange}
			/>
			<button
				data-testid="todo-add-btn"
				type="submit"
				className="btn btn__primary btn__lg"
			>
				Add
			</button>
		</form>
	);
}

export default TodoInput;
