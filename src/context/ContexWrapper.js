import dayjs from "dayjs";
import { useState } from "react";
import PropTypes from "prop-types";

import GlobalContext from "./GlobalContext";

export default function ContexWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

ContexWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
