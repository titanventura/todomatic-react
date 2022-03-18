import { fireEvent, render } from "@testing-library/react";
import TodoItem from "./TodoItem";

describe("Todo Rendering", () => {
	it("Should render name properly", () => {
		const todoProps = {
			id: "todo-test",
			name: "Test todo item",
			isComplete: false,
		};

		const { getByTestId } = render(<TodoItem {...todoProps} />);

		expect(getByTestId(`${todoProps.id}-label`)).toHaveTextContent(
			todoProps.name
		);

		expect(getByTestId(`${todoProps.id}-checkbox`)).not.toBeChecked();

		fireEvent.change(getByTestId(`${todoProps.id}-checkbox`), {
			target: {
				checked: true,
			},
		});

		expect(getByTestId(`${todoProps.id}-checkbox`)).toBeChecked();
	});
});

describe("Todo change state to editing", () => {
	it("Should change to edit template upon edit btn click", () => {
		const todoProps = {
			id: "todo-test",
			name: "todo test name",
			isComplete: false,
			toggleTaskCompleted: () => {},
			deleteTask: () => {},
		};
		const todoComponent = render(<TodoItem {...todoProps} />);
		const getTodoEditBtn = () =>
			todoComponent.queryByTestId(`${todoProps.id}-edit-btn`);

		let todoEditBtn;
		const checkInitialState = () => {
			todoEditBtn = getTodoEditBtn();
			// console.log(todoEditBtn);
			expect(todoEditBtn).not.toBeNull();
		};
		checkInitialState();

		fireEvent.click(todoEditBtn);
		todoEditBtn = getTodoEditBtn();
		expect(todoEditBtn).toBeNull();

		[
			`${todoProps.id}-edit-save-btn`,
			`${todoProps.id}-edit-cancel-btn`,
		].forEach((elemId) => {
			expect(todoComponent.queryByTestId(elemId)).not.toBeNull();
		});

		fireEvent.click(
			todoComponent.getByTestId(`${todoProps.id}-edit-cancel-btn`)
		);

		checkInitialState();
	});
});
