import React, { useState } from "react";

const SummaryForm = () => {
  const [enableBtn, setEnableBtn] = useState(true);

  const checkboxHandler = () => {
    setEnableBtn((prevState) => !prevState);
  };

  return (
    <div>
      <label htmlFor="enable-btn-id">I agree to Terms and Conditions</label>
      <input type="checkbox" id="enable-btn-id" onChange={checkboxHandler} />
      <button disabled={enableBtn}>Confirm order</button>
    </div>
  );
};

export default SummaryForm;
