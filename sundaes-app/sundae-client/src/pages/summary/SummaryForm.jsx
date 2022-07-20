import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const checkboxHandler = () => {
    setTcChecked((prevState) => !prevState);
  };

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={checkboxHandler}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;