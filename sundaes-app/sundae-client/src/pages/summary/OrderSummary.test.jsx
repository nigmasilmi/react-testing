import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "./SummaryForm";

describe("OrderSummary", () => {
  render(<SummaryForm />);
  it("confirm order button is initially disabled", () => {
    const confBtn = screen.getByRole("button", { name: "Confirm order" });
    expect(confBtn).toBeDisabled();
  });

  it("checked checkbox enables and disables the button", () => {
    render(<SummaryForm />);

    const enabCheckbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });

    userEvent.click(enabCheckbox);
    const confBtn = screen.getByRole("button", { name: "Confirm order" });
    expect(confBtn).toBeEnabled();
    userEvent.click(enabCheckbox);
    expect(confBtn).toBeDisabled();
  });
});
describe("popover", () => {
  it("popover is absent initially", () => {
    render(<SummaryForm />);
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
  });
  it("popover appears when hover over the trigger and dissapears on hovering out", async () => {
    render(<SummaryForm />);

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    // remember that getBy is going to throw if no element is found
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();
    userEvent.unhover(termsAndConditions);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
