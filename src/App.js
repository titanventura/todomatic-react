import Heading from "./components/heading/Heading";
import TodoInput from "./components/TodoInput/TodoInput";
import { useState } from "react";
import TodoList from "./components/TodoList/TodoList";
import constants from "./constants";

function App(props) {
	const { tasks: initialTasks } = constants;

	const [tasks, setTasks] = useState(initialTasks);
	const addTask = (newTask) => {
		setTasks([...tasks, newTask]);
	};
	return (
		<div className="todoapp stack-large">
			<Heading />
			<TodoInput addTask={addTask} />
			<div className="filters btn-group stack-exception">
				<button
					type="button"
					className="btn toggle-btn"
					aria-pressed="true"
				>
					<span className="visually-hidden">Show </span>
					<span>all</span>
					<span className="visually-hidden"> tasks</span>
				</button>
				<button
					type="button"
					className="btn toggle-btn"
					aria-pressed="false"
				>
					<span className="visually-hidden">Show </span>
					<span>Active</span>
					<span className="visually-hidden"> tasks</span>
				</button>
				<button
					type="button"
					className="btn toggle-btn"
					aria-pressed="false"
				>
					<span className="visually-hidden">Show </span>
					<span>Completed</span>
					<span className="visually-hidden"> tasks</span>
				</button>
			</div>
			<h2 id="list-heading">3 tasks remaining</h2>
			<TodoList tasks={tasks} />
		</div>
	);
}
export default App;
