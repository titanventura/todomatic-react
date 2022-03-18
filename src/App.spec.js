import { fireEvent, render } from "@testing-library/react";

import React from "react";
import App from "./App";

describe("adding of a new todo", () => {
	it("Should make a difference in the length of todos before and after the addition", () => {
		const { getByTestId, getAllByLabelText } = render(<App></App>);
		const getTodosLength = () => getAllByLabelText("todoItem").length;
		const prevTodosLength = getTodosLength();

		fireEvent.change(getByTestId("new-todo-input"), {
			target: {
				value: "test todo",
			},
		});

		fireEvent.submit(getByTestId("new-todo-form"));

		const newTodosLength = getTodosLength();

		expect(newTodosLength).toBe(prevTodosLength + 1);
	});

	it("Should make a difference to the reamaining task(s) text", () => {
		const { getByTestId, getAllByLabelText, queryAllByLabelText } = render(
			<App></App>
		);
		fireEvent.change(getByTestId("new-todo-input"), {
			target: {
				value: "test todo",
			},
		});
		fireEvent.submit(getByTestId("new-todo-form"));

		const getTodos = () => queryAllByLabelText("todoItem");
		const getTodosLength = () => getTodos().length;
		let todoLength = getTodosLength();
		expect(getByTestId("reamaining-task-text")).toHaveTextContent(
			`${todoLength} ${todoLength == 1 ? "task" : "tasks"} remaining`
		);

		getAllByLabelText("todoItem").forEach((elem) => {
			fireEvent.click(
				getByTestId(`${elem.getAttribute("data-testid")}-delete-btn`)
			);
		});
		todoLength = getTodosLength();

		expect(getByTestId("reamaining-task-text")).toHaveTextContent(
			`${todoLength} ${todoLength == 1 ? "task" : "tasks"} remaining`
		);
	});
});

describe("todo updations : Edit & Delete", () => {
	it("Should delete the selected todo and in turn remove it from the DOM", () => {
		const app = render(<App />);
		const getTodoItems = () => app.queryAllByLabelText("todoItem");
		const todoItems = getTodoItems();
		const initTodoLength = todoItems.length;

		const firstTodo = todoItems[0];
		const testId = firstTodo.dataset.testid;
		expect(testId).toBe("todo-0");

		// Before the fireEvent (delete) is called, the viewTemplate must be there and
		// then the entire test should disappear.
		const initialTestIds = [
			`${testId}-label`,
			`${testId}-edit-btn`,
			`${testId}-delete-btn`,
		];

		initialTestIds.forEach((id) => {
			expect(app.getByTestId(id)).toBeDefined();
		});

		const editBtnTestIds = [
			`${testId}-edit-input`,
			`${testId}-edit-cancel-input`,
			`${testId}-edit-save-input`,
		];

		editBtnTestIds.forEach((id) => {
			expect(app.queryByTestId(id)).toBeNull();
		});

		// fireEvent
		fireEvent.click(app.getByTestId(`${testId}-delete-btn`));

		const todoItemsAfterDelete = getTodoItems();

		expect(todoItemsAfterDelete.length).toBe(initTodoLength - 1);
	});

	it("Should edit an existing todo and get it saved", () => {
		const appComponent = render(<App />);
		const allTodos = appComponent.queryAllByLabelText("todoItem");
		const firstTodo = allTodos[0];
		const firstTodoTestId = firstTodo.getAttribute("data-testid");

		const firstTodoEditBtn = appComponent.getByTestId(
			`${firstTodoTestId}-edit-btn`
		);

		const previousTodoLabel = appComponent.getByTestId(
			`${firstTodoTestId}-label`
		).textContent;

		fireEvent.click(firstTodoEditBtn);

		const editTodoInput = appComponent.getByTestId(
			`${firstTodoTestId}-edit-input`
		);

		const changeLabel = "Changed Todo";
		fireEvent.change(editTodoInput, {
			target: {
				value: changeLabel,
			},
		});
		fireEvent.click(
			appComponent.getByTestId(`${firstTodoTestId}-edit-save-btn`)
		);
		const newTodoLabelElement = appComponent.getByTestId(
			`${firstTodoTestId}-label`
		);
		expect(newTodoLabelElement).not.toHaveTextContent(previousTodoLabel);
		expect(newTodoLabelElement).toHaveTextContent(changeLabel);
	});

	it("Should mark a todo as complete", () => {
		const appComponent = render(<App />);
		const getAllTodos = () => appComponent.queryAllByLabelText("todoItem");

		// console.log(appComponent);

		let allTodos = getAllTodos();

		const boolChecked = (todo) => todo.getAttribute("data-iscomplete");

		const filterOnCriteria = (allTodos, cb) => {
			return allTodos.filter((todo) => {
				return cb(todo) === 'true';
			});
		};

		const checkedOnes = filterOnCriteria(allTodos, boolChecked);
		const firstTodo = allTodos[0];

		const firstTodoTestId = firstTodo.getAttribute("data-testid");

		const firstTodoCheckBox = appComponent.getByTestId(
			`${firstTodoTestId}-checkbox`
		);
		fireEvent.click(firstTodoCheckBox);

		const checkedOnesNow = filterOnCriteria(getAllTodos(), boolChecked);
		expect(checkedOnesNow.length).toBe(checkedOnes.length + 1);
	});
});
