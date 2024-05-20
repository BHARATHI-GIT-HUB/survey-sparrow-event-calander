import { useState } from "react";

export const useClick = () => {
  const handlePrevMonth = (monthIndex, setMonthIndex, setCurrentMonth) => {
    setMonthIndex(monthIndex - 1);
    setCurrentMonth(monthIndex);
  };

  const handleNextMonth = (monthIndex, setMonthIndex, setCurrentMonth) => {
    setMonthIndex(monthIndex + 1);
    setCurrentMonth(monthIndex);
  };

  return { handlePrevMonth, handleNextMonth };
};
