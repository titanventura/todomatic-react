import "./App.css";
import Todo from "./componenets/Todo";
import TodoForm from "./componenets/TodoForm";
import FilterButton from "./componenets/FilterButton";
import React, { useState, useRef, useEffect, useDebugValue } from "react";
import { nanoid } from "nanoid";

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function App(props) {
	const [tasks, setTasks] = useState(props.tasks);

	function addTask(name) {
		// alert(name);
		const newTask = {
			id: `todo-${nanoid()}`,
			name,
			completed: false,
		};

		setTasks([...tasks, newTask]);
	}

	function toggleComplete(taskId) {
		setTasks(
			tasks?.map((task) => {
				if (task.id === taskId) {
					return {
						...task,
						completed: !task.completed,
					};
				}
				return task;
			})
		);
	}

	function editTask(taskId, name) {
		setTasks(
			tasks?.map((task) => {
				if (task.id === taskId) {
					return {
						...task,
						name,
					};
				}
				return task;
			})
		);
	}

	function deleteTask(taskId) {
		setTasks(tasks.filter((task) => task.id !== taskId));
	}

	const tasksDesc = tasks.length > 1 ? "tasks" : "task";

	const FILTERS = {
		All: () => true,
		Active: (task) => !task.completed,
		Completed: (task) => task.completed,
	};

	const FILTER_NAMES = Object.keys(FILTERS);
	const [filter, setFilter] = useState("All");

	const listHeadingRef = useRef(null);
	const prevLength = usePrevious(tasks.length);

	useEffect(() => {
		if (tasks.length - prevLength === -1) {
			listHeadingRef.current.focus();
		}
	}, [tasks.length, prevLength]);

	return (
		<div className="todoapp stack-large">
			<h1>TodoMatic</h1>
			<TodoForm addTask={addTask} />
			<div className="filters btn-group stack-exception">
				{FILTER_NAMES.map((filterKey) => {
					return (
						<FilterButton
							key={filterKey}
							text={filterKey}
							isPressed={filterKey === filter}
							setPressed={setFilter}
						/>
					);
				})}
			</div>
			<h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
				{tasks.length} {tasksDesc} remaining
			</h2>
			<ul
				role="list"
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading"
			>
				{tasks?.filter(FILTERS[filter]).map((task, index) => {
					return (
						<Todo
							key={task.id}
							{...task}
							toggleComplete={toggleComplete}
							editTask={editTask}
							deleteTask={deleteTask}
						/>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
