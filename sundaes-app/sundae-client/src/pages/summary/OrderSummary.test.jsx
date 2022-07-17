import { render, screen, fireEvent } from "@testing-library/react";
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
    fireEvent.click(enabCheckbox);
    const confBtn = screen.getByRole("button", { name: "Confirm order" });
    expect(confBtn).toBeEnabled();
    fireEvent.click(enabCheckbox);
    expect(confBtn).toBeDisabled();
  });
});
