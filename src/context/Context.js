import React from "react";
const Context = React.createContext({
  monthIndex: 0,
  smallCalmonthindex: 0,
  setMonthIndex: () => {},
  setSmallcalmonthindex: () => {},
  months: [],
});

export default Context;
