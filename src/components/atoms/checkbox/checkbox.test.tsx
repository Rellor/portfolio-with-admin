import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from ".";

describe("Checkbox", () => {
  test("toggles when clicked", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<Checkbox checked={false} onChange={onChange} label="Test" />);

    await user.click(screen.getByRole("checkbox"));

    expect(onChange).toHaveBeenCalled();
  });
});
