import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

import ScoopOption from "./ScoopOption";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((err) => console.log(err));
  }, [optionType]);

  // TODO: replace null with ToppingOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : null;

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
