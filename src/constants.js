const DATA = [
	{ id: "todo-0", name: "Eat", isComplete: false },
	{ id: "todo-1", name: "Sleep", isComplete: false },
	{ id: "todo-2", name: "Repeat", isComplete: false },
];

const ALL = "All";
const ACTIVE = "Active";
const COMPLETED = "Completed";

const FILTERS = [ALL, ACTIVE, COMPLETED];

export default {
	tasks: DATA,
	filters: FILTERS,
	ALL,
	ACTIVE,
	COMPLETED,
};
