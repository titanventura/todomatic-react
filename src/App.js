import Heading from "./components/heading/Heading";
import TodoInput from "./components/TodoInput/TodoInput";
import { useState } from "react";
import TodoList from "./components/TodoList/TodoList";
import constants from "./constants";
import Filter from "./components/Filter/Filter";

function App(props) {
	const { tasks: initialTasks } = constants;

	const [tasks, setTasks] = useState(initialTasks);
	const addTask = (newTask) => {
		setTasks([...tasks, newTask]);
	};

	const deleteTask = (taskId) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	};

	const editTask = (id, newName) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, name: newName } : task
			)
		);
	};

	const toggleComplete = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id
					? { ...task, isComplete: !task.isComplete }
					: task
			)
		);
	};

	return (
		<div className="todoapp stack-large">
			<Heading />
			<TodoInput addTask={addTask} />
			<div className="filters btn-group stack-exception">
			{[1, 2, 3].map((e) => (
				<Filter key={e} name="sm" isPressed={false} />
			))}
			</div>
			<h2 id="list-heading" data-testid="reamaining-task-text">
				{tasks.length} {tasks.length === 1 ? "task" : "tasks"} remaining
			</h2>
			<TodoList
				tasks={tasks}
				deleteTask={deleteTask}
				editTask={editTask}
				toggleComplete={toggleComplete}
			/>
		</div>
	);
}
export default App;
