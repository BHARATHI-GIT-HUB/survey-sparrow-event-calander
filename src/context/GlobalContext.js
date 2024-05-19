import React from "react";
const GlobalContext = React.createContext({
  monthIndex: 0,
  smallCalmonthindex: 0,
  setMonthIndex: () => {},
  setSmallcalmonthindex: () => {},
  months: [],
});

export default GlobalContext;
