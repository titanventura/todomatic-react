import React, { useState, useRef, useEffect } from "react";

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export default function Todo(props) {
	const { name, completed, id, deleteTask, toggleComplete, editTask } = props;
	const [isEditing, setEditing] = useState(false);
	const [curName, setCurName] = useState(name);

	const editBtnRef = useRef(null);
	const editInputRef = useRef(null);

	const wasEditing = usePrevious(isEditing);

	const editingTemplate = (
		<form className="stack-small">
			<div className="form-group">
				<input
					id={id}
					className="todo-text"
					type="text"
					value={curName}
					onChange={(e) => {
						setCurName(e.target.value);
					}}
					ref={editInputRef}
				/>
			</div>
			<div className="btn-group">
				<button
					type="button"
					className="btn todo-cancel"
					onClick={(e) => {
						setEditing(false);
					}}
				>
					Cancel
					<span className="visually-hidden">renaming {name}</span>
				</button>
				<button
					type="submit"
					className="btn btn__primary todo-edit"
					onClick={(e) => {
						editTask(id, curName);
						setEditing(false);
					}}
				>
					Save
					<span className="visually-hidden">new name for {name}</span>
				</button>
			</div>
		</form>
	);

	const viewTemplate = (
		<div className="stack-small">
			<div className="c-cb">
				<input
					id={id}
					type="checkbox"
					defaultChecked={completed}
					onChange={() => toggleComplete(id)}
				/>
				<label className="todo-label" htmlFor={id}>
					{name}
				</label>
			</div>
			<div className="btn-group">
				<button
					type="button"
					className="btn"
					onClick={() => {
						setEditing(true);
						editInputRef.current.focus();
					}}
					ref={editBtnRef}
				>
					Edit <span className="visually-hidden">{name}</span>
				</button>
				<button
					type="button"
					className="btn btn__danger"
					onClick={() => deleteTask(id)}
				>
					Delete <span className="visually-hidden">{name}</span>
				</button>
			</div>
		</div>
	);

	useEffect(() => {
		if (isEditing && !wasEditing) {
			editInputRef.current.focus();
		} else if (!isEditing && wasEditing) {
			editBtnRef.current.focus();
		}
	}, [isEditing]);

	return (
		<li className="todo stack-small">
			{isEditing ? editingTemplate : viewTemplate}
		</li>
	);
}
