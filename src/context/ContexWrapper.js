import dayjs from "dayjs";
import { useState } from "react";
import PropTypes from "prop-types";

import GlobalContext from "./GlobalContext";

export default function ContexWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalmonthindex, setSmallcalmonthindex] = useState(dayjs().month());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        smallCalmonthindex,
        setMonthIndex,
        setSmallcalmonthindex,
        months,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

ContexWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
