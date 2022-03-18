import React, { useState } from "react";

function TodoItem(props) {
	const {
		id,
		name: curTodoName,
		isComplete,
		deleteTask,
		editTask,
		toggleComplete,
	} = props;

	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(curTodoName);

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		editTask(id, name);
		setIsEditing(false);
	};

	const editingTemplate = (
		<form className="stack-small" onSubmit={handleEditSubmit}>
			<div className="form-group">
				<input
					id={id}
					value={name}
					data-testid={`${id}-edit-input`}
					onChange={handleNameChange}
					className="todo-text"
					type="text"
				/>
			</div>
			<div className="btn-group">
				<button
					type="button"
					data-testid={`${id}-edit-cancel-btn`}
					onClick={() => {
						setIsEditing(false);
					}}
					className="btn todo-cancel"
				>
					Cancel
					<span className="visually-hidden">renaming {name}</span>
				</button>
				<button
					type="submit"
					data-testid={`${id}-edit-save-btn`}
					className="btn btn__primary todo-edit"
				>
					Save
					<span className="visually-hidden">new name for {name}</span>
				</button>
			</div>
		</form>
	);

	const handleEditClick = (e) => {
		setIsEditing(true);
	};

	const viewTemplate = (
		<div className="stack-small">
			<div className="c-cb">
				<input
					id={id}
					type="checkbox"
					defaultChecked={isComplete}
					data-testid={`${id}-checkbox`}
					onChange={() => toggleComplete(id)}
				/>
				<label
					className="todo-label"
					data-testid={`${id}-label`}
					htmlFor={id}
				>
					{name}
				</label>
			</div>
			<div className="btn-group">
				<button
					type="button"
					data-testid={`${id}-edit-btn`}
					onClick={handleEditClick}
					className="btn"
				>
					Edit <span className="visually-hidden">{name}</span>
				</button>
				<button
					type="button"
					className="btn btn__danger"
					onClick={(e) => {
						deleteTask(id);
					}}
					data-testid={`${id}-delete-btn`}
				>
					Delete <span className="visually-hidden">{name}</span>
				</button>
			</div>
		</div>
	);

	return (
		<li
			className="todo"
			data-testid={id}
			aria-label="todoItem"
			data-iscomplete={isComplete}
		>
			{isEditing ? editingTemplate : viewTemplate}
		</li>
	);
}

export default TodoItem;
