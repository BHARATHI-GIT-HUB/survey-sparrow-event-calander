import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../../util";
import GlobalContext from "../../context/GlobalContext";
import { handleNextMonth, handlePrevMonth } from "../../util";
import dayjs from "dayjs";
export function SmallCalander() {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const { smallCalmonthindex, setSmallcalmonthindex, months } =
    useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = React.useState(smallCalmonthindex);

  const [currentMonthDate, setCurrentMonthDate] = React.useState(
    getMonth(currentMonth)
  );

  const getCurrentDay = (day) => {
    const isCurrentMonthDay = day.month() === smallCalmonthindex;
    return isCurrentMonthDay
      ? day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
        ? "bg-blue-200 rounded-full "
        : ""
      : "text-gray-400";
  };

  useEffect(() => {
    setCurrentMonthDate(getMonth(smallCalmonthindex));
    setCurrentMonth(smallCalmonthindex);
  }, [smallCalmonthindex]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-3 ">
        <div className="flex items-center pl-3 justify-between w-full">
          <div>
            {months[smallCalmonthindex]} {dayjs().year()}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSmallcalmonthindex(smallCalmonthindex - 1);
                setCurrentMonth(smallCalmonthindex);
              }}
              disabled={smallCalmonthindex <= 0 ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                setSmallcalmonthindex(smallCalmonthindex + 1);
                setCurrentMonth(smallCalmonthindex);
              }}
              disabled={smallCalmonthindex >= 11 ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 grid-rows-5  space-y-2 space-x-2 place-items-center w-full">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className="font-normal text-sm">
              {day}
            </div>
          ))}
          {currentMonthDate.map((row, rowidx) => (
            <React.Fragment key={rowidx}>
              {row.map((day, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <button
                      // onClick={setCurrentMonthDate()}

                      className={`text-xs p-[3px] ${getCurrentDay(day)}`}
                    >
                      {day.format("DD")}
                    </button>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
