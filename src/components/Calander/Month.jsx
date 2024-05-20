import React from "react";
import PropTypes from "prop-types";
import { Day } from "./Day";

export function Month({ month }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 8vh)",
        maxHeight: "calc(100vh - 8vh)",
      }}
      className="flex-1 grid grid-cols-7 grid-rows-5 w-full"
    >
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, j) => (
            <Day day={day} rowIndex={i} key={j} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

Month.propTypes = {
  month: PropTypes.array.isRequired,
};
