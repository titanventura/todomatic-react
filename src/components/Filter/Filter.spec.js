import { fireEvent, render } from "@testing-library/react";
import App from "../../App";
import constants from "../../constants";

const FILTERS = constants.filters;

describe("Test 'All' Filter", () => {
	it("If a filter is pressed, only show that filter as highlighted", () => {
		const appComponent = render(<App />);
		FILTERS.forEach((filterPrefix) => {
			const filterTestId = `${filterPrefix}-filter`;
			const filterBtn = appComponent.getByTestId(filterTestId);
			fireEvent.click(filterBtn);

			const allFiltersOnTheDOM =
				appComponent.queryAllByLabelText("filterBtn");

			const allOtherFiltersExceptTheCurrentFilter =
				allFiltersOnTheDOM.filter(
					(filterBtn) =>
						filterBtn.getAttribute("data-testid") !== filterTestId
				);

			allOtherFiltersExceptTheCurrentFilter.forEach((filterBtn) => {
				expect(filterBtn).toHaveAttribute("aria-pressed", "false");
			});
		});
	});

	it("Should render all items if All filter is selected", () => {
		const appComp = render(<App />);

		const allFilterPrefix = constants.ALL;

		const allFilterBtnTestId = `${allFilterPrefix}-filter`;

		const allFilterBtn = appComp.getByTestId(allFilterBtnTestId);

		// Click the button to test out

		fireEvent.click(allFilterBtn);

		// mark every alternate todo as complete
		const getAllTodos = () => appComp.queryAllByLabelText("todoItem");
		let allTodoItems = getAllTodos();
		let allTodosLengthPreviously = allTodoItems.length;

		allTodoItems.forEach((item, index) => {
			const itemCheckbox = appComp.getByTestId(
				`${item.getAttribute("data-testid")}-checkbox`
			);
			const isComplete =
				itemCheckbox.getAttribute("data-iscomplete") === "true";
			if (index % 2 == 0) {
				if (!isComplete) {
					fireEvent.click(itemCheckbox);
				}
			} else {
				if (isComplete) {
					fireEvent.click(itemCheckbox);
				}
			}
		});

		allTodoItems = getAllTodos();
		const checkedTodos = allTodoItems.filter(
			(item) => item.getAttribute("data-iscomplete") === "true"
		);

		const unCheckedTodos = allTodoItems.filter(
			(item) => item.getAttribute("data-iscomplete") === "false"
		);

		expect(checkedTodos.length + unCheckedTodos.length).toBe(
			allTodosLengthPreviously
		);
	});

	it("Should render only active(unchecked) items if active tab is selected.", () => {
		const appComp = render(<App />);
		const allFilterPrefix = constants.ALL;
		const allFilterBtnTestId = `${allFilterPrefix}-filter`;
		const allFilterBtn = appComp.getByTestId(allFilterBtnTestId);

		fireEvent.click(allFilterBtn);

		// mark every alternate todo as complete
		const getAllTodos = () => appComp.queryAllByLabelText("todoItem");
		let allTodoItems = getAllTodos();
		let allTodosLengthPreviously = allTodoItems.length;

		if (allTodosLengthPreviously < 2) return;

		const getCheckedItems = () =>
			allTodoItems.filter(
				(item) => item.getAttribute("data-iscomplete") === "true"
			);

		const getUnCheckedItems = () =>
			allTodoItems.filter(
				(item) => item.getAttribute("data-iscomplete") === "false"
			);

		const checkedPrevLength = getCheckedItems().length;
		const unCheckedPrevLength = getUnCheckedItems().length;

		allTodoItems.forEach((item, index) => {
			const itemCheckbox = appComp.getByTestId(
				`${item.getAttribute("data-testid")}-checkbox`
			);
			const isComplete =
				itemCheckbox.getAttribute("data-iscomplete") === "true";
			if (index % 2 == 0) {
				if (!isComplete) {
					fireEvent.click(itemCheckbox);
				}
			} else {
				if (isComplete) {
					fireEvent.click(itemCheckbox);
				}
			}
		});

		fireEvent.click(appComp.getByTestId(`${constants.ACTIVE}-filter`));

		allTodoItems = getAllTodos();
		const checkedTodos = getCheckedItems();
		const unCheckedTodos = getUnCheckedItems();

		expect(allTodoItems.length).toBe(unCheckedTodos.length);
		expect(allTodosLengthPreviously).toBeGreaterThanOrEqual(
			unCheckedTodos.length
		);
		expect(checkedTodos.length).toBe(0);
	});

	it("Should render only complete(checked) items if complete tab is selected. ", () => {
		const appComp = render(<App />);
		const allFilterPrefix = constants.ALL;
		const allFilterBtnTestId = `${allFilterPrefix}-filter`;
		const allFilterBtn = appComp.getByTestId(allFilterBtnTestId);

		fireEvent.click(allFilterBtn);

		// mark every alternate todo as complete
		const getAllTodos = () => appComp.queryAllByLabelText("todoItem");
		let allTodoItems = getAllTodos();
		let allTodosLengthPreviously = allTodoItems.length;

		if (allTodosLengthPreviously < 2) return;

		const getCheckedItems = () =>
			allTodoItems.filter(
				(item) => item.getAttribute("data-iscomplete") === "true"
			);

		const getUnCheckedItems = () =>
			allTodoItems.filter(
				(item) => item.getAttribute("data-iscomplete") === "false"
			);

		const checkedPrevLength = getCheckedItems().length;
		const unCheckedPrevLength = getUnCheckedItems().length;

		allTodoItems.forEach((item, index) => {
			const itemCheckbox = appComp.getByTestId(
				`${item.getAttribute("data-testid")}-checkbox`
			);
			const isComplete =
				itemCheckbox.getAttribute("data-iscomplete") === "true";
			if (index % 2 == 0) {
				if (!isComplete) {
					fireEvent.click(itemCheckbox);
				}
			} else {
				if (isComplete) {
					fireEvent.click(itemCheckbox);
				}
			}
		});

		fireEvent.click(appComp.getByTestId(`${constants.COMPLETED}-filter`));

		allTodoItems = getAllTodos();
		const checkedTodos = getCheckedItems();
		const unCheckedTodos = getUnCheckedItems();

		expect(allTodoItems.length).toBe(checkedTodos.length);
		expect(allTodosLengthPreviously).toBeGreaterThanOrEqual(
			checkedTodos.length
		);
		expect(unCheckedTodos.length).toBe(0);
	});
});
