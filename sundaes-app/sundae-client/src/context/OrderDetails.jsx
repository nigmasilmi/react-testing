import { useEffect } from "react";
import { createContext, useContext, useState, useMemo } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// custom hook to check if we are inside a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      "userOrderDetails must be used within an OrderDetailsProvider"
    );
  }
  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  console.log("optionCounts", optionCounts);
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
};

// this is the main functional component
export const OrderDetailsProvider = (props) => {
  // state to manage the number of scoops and toppings
  const [optionsCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  // total of cost for scoops, toppings and the total to pay
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  // calculations for new values of price
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionsCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionsCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionsCounts]);

  // {getter, setter}
  // getter: object containing option counts for scoops and toppings, subtotal and total
  // setter: updateOptionCount
  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionsCounts = { ...optionsCounts, totals };

      // update option count for this item with the new value
      const optionCountsMap = optionsCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCounts(newOptionsCounts);
    };

    return [{ ...optionsCounts, totals }, updateItemCount];
  }, [optionsCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
