import { useState, useRef } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z]\B)/g, " $1");
}

function App() {
  const [color, setColor] = useState("MediumVioletRed");
  const newButtonColor =
    color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";
  const inputRef = useRef();

  const [isDisabled, setIsDisabled] = useState(false);

  const changeColorHandler = () => {
    setColor(newButtonColor);
  };

  const ableButtonHandler = (event) => {
    // setIsDisabled((prevState) => !prevState);
    setIsDisabled(event.target.checked);
  };

  return (
    <div className="App">
      <button
        onClick={changeColorHandler}
        disabled={isDisabled}
        style={{ backgroundColor: isDisabled ? "gray" : color, color: "white" }}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <input
        type="checkbox"
        id="enable-button-checkbox"
        aria-checked={isDisabled}
        onChange={ableButtonHandler}
        ref={inputRef}
      />
      <label htmlFor="enable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
