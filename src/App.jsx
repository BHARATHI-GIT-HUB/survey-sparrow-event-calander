import "./App.css";
import React, { useEffect } from "react";
import { getMonth } from "./util";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import dayjs from "dayjs";
import Modal from "./components/Modal";

function App() {
  const { monthIndex, setMonthIndex } = React.useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = React.useState(monthIndex);
  const [currentMonthDate, setCurrentMonthDate] = React.useState(
    getMonth(monthIndex)
  );

  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setCurrentMonthDate(getMonth(monthIndex));
    setCurrentMonth(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
    setCurrentMonth(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
    setCurrentMonth(monthIndex + 1);
  };

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
    <React.Fragment>
      <Modal />
      <div className="border border-gray-200 border-b-0 rounded-xl flex flex-col items-start font-inter">
        <p className="text-xl  p-4">Calender</p>
        <div className="border-y border-gray-200 px-4 py-3 self-start w-full flex justify-between">
          <div className="flex  gap-5">
            <button className="border flex gap-2 items-center rounded-md border-gray-200 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="bi bi-calendar4"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
              </svg>
              Today
            </button>
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={handlePrevMonth}
                disabled={monthIndex <= 0 ? true : false}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              </button>
              <p className="text-lg">
                {months[currentMonth] + " " + dayjs().year()}
              </p>
              <button
                onClick={handleNextMonth}
                disabled={monthIndex >= 11 ? true : false}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* <button className="border rounded-md border-gray-200 p-2 flex items-center gap-2">
            {" "}
            Months
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button> */}

          <div className="relative inline-block text-left">
            <div>
              <button
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setIsOpen(!isOpen)}
              >
                Months
                <svg
                  className="-mr-1 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="none">
                  {months.map((m, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      tabindex="-1"
                      id={`menu-item-${i}`}
                      onClick={() => {
                        setMonthIndex(i);
                        setCurrentMonth(i);
                        setIsOpen(false);
                      }}
                    >
                      {m}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Month month={currentMonthDate} setCurrentMonth={setCurrentMonthDate} />
      </div>
    </React.Fragment>
  );
}

export default App;
