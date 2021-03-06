import { render, screen } from "../../../test-utils/testing-library";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

describe("totalUpdates", () => {
  it("update scoop subtotal when scoops change", async () => {
    render(<Options optionType="scoops" />);
    // make sure total starts out $0.00
    const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
    expect(scoopSubtotal).toHaveTextContent("0.00");
    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2 and check the subtotal

    const chocolateInput = screen.getByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopSubtotal).toHaveTextContent("6.00");
  });
  it("updates subtotal when toppings are selected", async () => {
    render(<Options optionType="toppings" />);
    // must start with subtotal of 0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // find the checkbox
    const peanutTopping = await screen.findByRole("checkbox", {
      name: "Peanut butter cups",
    });
    userEvent.click(peanutTopping);
    expect(toppingsSubtotal).toHaveTextContent("1.50");

    const hfTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hfTopping);
    expect(toppingsSubtotal).toHaveTextContent("3.00");

    userEvent.click(peanutTopping);
    expect(toppingsSubtotal).toHaveTextContent("1.50");
  });
});
describe("grandTotal", () => {
  it("updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    // const grandTotal = screen.getByRole("heading", { name: /grand total \$/i });
    const grandTotal = screen.getByText(/grand total/i, { exact: false });

    // check that grand total starts out at 0.00
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const hfTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hfTopping);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  it("updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    // const grandTotal = screen.getByRole("heading", { name: /grand total \$/i });
    const grandTotal = screen.getByText(/grand total/i, { exact: false });

    const hfTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hfTopping);
    expect(grandTotal).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");
    expect(grandTotal).toHaveTextContent("7.50");
  });
  it("updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText(/grand total/i, { exact: false });
    // const grandTotal = screen.getByRole("heading", { name: /grand total \$/i });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "3");
    expect(grandTotal).toHaveTextContent("6.00");
    const hfTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hfTopping);
    expect(grandTotal).toHaveTextContent("7.50");
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    userEvent.click(hfTopping);
    expect(grandTotal).toHaveTextContent("4.00");
  });
});
