import React from "react";
import TodoItem from "../TodoItem/TodoItem";

function TodoList(props) {
	const { tasks, deleteTask, editTask, toggleComplete } = props;
	return (
		<ul
			role="list"
			className="todo-list stack-large stack-exception"
			aria-labelledby="list-heading"
		>
			{tasks.map((task) => (
				<TodoItem
					{...task}
					key={task.id}
					deleteTask={deleteTask}
					editTask={editTask}
					toggleComplete={toggleComplete}
				/>
			))}
		</ul>
	);
}

export default TodoList;
