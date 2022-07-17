import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);
  // find the element with the role of button and the text with that name
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);
  // expect the bg to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the btn text to be 'Change to red'
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);
  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("checkbox enables and disables the button", () => {
  render(<App />);
  // select the checkbox
  const checkBx = screen.getByRole("checkbox", { name: "Disable button" });
  // select the button
  const colorBtn = screen.getByRole("button", { name: /Change to/i });
  // click on the checkbox
  fireEvent.click(checkBx);
  // expect button to be disabled
  expect(colorBtn).toBeDisabled();
  // click the checkbox
  fireEvent.click(checkBx);

  // expect button to be enabled
  expect(colorBtn).toBeEnabled();
});

test("Disabled button has gray background and reverts to red", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // disable button
  fireEvent.click(checkbox);
  expect(colorBtn).toHaveStyle("background-color: gray");
});

test("Clicked disabled button has gray background and reverts to blue", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorBtn = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // change button to blue
  fireEvent.click(colorBtn);

  // disable button
  fireEvent.click(checkbox);
  expect(colorBtn).toHaveStyle("background-color: gray");
});

//

describe("Spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works one innerr capital letters", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
