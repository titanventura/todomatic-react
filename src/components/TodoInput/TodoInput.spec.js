import { fireEvent, render } from "@testing-library/react";
import TodoInput from "./TodoInput";

describe("Should render all input component elements", () => {
	it("should render label, input and button", () => {
		const { container, getByLabelText } = render(<TodoInput />);

		expect(getByLabelText("What needs to be done?")).toBeDefined();
		expect(container.querySelector("input")).toBeDefined();
		expect(container.querySelector("button")).toBeDefined();
	});

	it("should contain empty input and button text should be Add", () => {
		const { getByTestId } = render(<TodoInput />);
		expect(getByTestId("new-todo-input")).toBeEmptyDOMElement();
		expect(getByTestId("todo-add-btn")).toHaveTextContent("Add");
	});
});

describe("Should accept input and clear it", () => {
	it("Should accept input value", () => {
		const { getByTestId } = render(<TodoInput addTask={()=>{}} />);
		const todoInputElem = getByTestId("new-todo-input");
		const todoFormElem = getByTestId("new-todo-form");

		fireEvent.change(todoInputElem, {
			target: { value: "something" },
		});

		expect(todoInputElem).toHaveValue("something")

		fireEvent.submit(todoFormElem);
		expect(todoInputElem).toBeEmptyDOMElement();
	});
});
