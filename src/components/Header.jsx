import React, { useState, useEffect } from "react";
import GlobalContext from "../context/Context";
import { getMonth } from "../util";
import logo from "../assets/images/logo.png";
import { useClick } from "../hooks/useClick";
export default function Header({ isSlider, setIsSlider }) {
  const { monthIndex, setMonthIndex, months } = React.useContext(GlobalContext);

  const { handleNextMonth, handlePrevMonth } = useClick();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdown, setIsdropdown] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const [currentMonth, setCurrentMonth] = React.useState(monthIndex);
  const [currentMonthDate, setCurrentMonthDate] = React.useState(
    getMonth(monthIndex)
  );

  useEffect(() => {
    setCurrentMonthDate(getMonth(monthIndex));
    setCurrentMonth(monthIndex);
  }, [monthIndex]);

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-300 px-5 py-3 sticky top-0 bg-white ">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsSlider(!isSlider);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-3 mx-4">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <h3 className="text-2xl font-light text-gray-500">Calander</h3>
          </div>
          <div className="flex items-center gap-10 ">
            <button className="border hidden md:flex gap-3 items-center rounded-md border-gray-200 p-2">
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
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handlePrevMonth(monthIndex, setMonthIndex, setCurrentMonth)
                }
                disabled={monthIndex <= 0 ? true : false}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </button>

              <button
                onClick={() =>
                  handleNextMonth(monthIndex, setMonthIndex, setCurrentMonth)
                }
                disabled={monthIndex >= 11 ? true : false}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xl font-light text-gray-600">
              {months[monthIndex]} 2024
            </p>
          </div>
        </div>
        <div className="relative inline-block text-left">
          <div>
            <button
              className=" hidden md:flex  w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setIsdropdown(!isDropdown)}
            >
              Months
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isDropdown && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="none">
                {months.map((m, i) => (
                  <a
                    key={i}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => {
                      setMonthIndex(i);
                      setCurrentMonth(i);
                      setIsdropdown(false);
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
    </>
  );
}
