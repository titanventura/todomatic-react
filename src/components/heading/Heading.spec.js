import { render } from "@testing-library/react";
import Heading from "./Heading";

describe("test heading", () => {
	it("should display TodoMatic Heading", () => {
		const { getByTestId } = render(<Heading />);
		expect(getByTestId("app-heading")).toHaveTextContent("TodoMatic");
	});
});
