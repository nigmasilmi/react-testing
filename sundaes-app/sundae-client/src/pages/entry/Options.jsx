import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../AlertBanner";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }
  // TODO: replace null with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionItems}</Row>;
};

export default Options;
