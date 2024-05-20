import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { Month } from "../components/Calander";
import GlobalContext from "../context/Context";
import { getMonth } from "../util";

export function Scheduler() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(monthIndex);
  const [isSlider, setIsSlider] = useState(true);
  const [currentMonthDate, setCurrentMonthDate] = useState(
    getMonth(monthIndex)
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    setCurrentMonthDate(getMonth(monthIndex));
    setCurrentMonth(monthIndex);
  }, [monthIndex]);

  return (
    <>
      <Header isSlider={isSlider} setIsSlider={setIsSlider} />
      <div className="flex">
        <div className={`${isSlider ? "hidden" : ""}`}>
          <Sidebar />
        </div>
        <Month month={currentMonthDate} setCurrentMonth={setCurrentMonthDate} />
      </div>
    </>
  );
}
