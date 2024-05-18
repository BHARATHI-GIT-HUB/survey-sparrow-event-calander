import React from "react";
import PropTypes from "prop-types";
import Day from "./Day";

export default function Month({ month }) {
  return (
    <div className="flex-1  grid grid-cols-7 grid-rows-5 w-full">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, j) => (
            <React.Fragment key={j}>
              <Day day={day} rowIndex={i} />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

Month.propTypes = {
  month: PropTypes.array.isRequired,
};
