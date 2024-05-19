import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { data } from "../data.js";
import GlobalContext from "../context/GlobalContext.js";
import Modal from "./Modal.js";
import { isEventOver } from "../util.js";

export default function Day({ day, rowIndex }) {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventTypeColors = {
    meeting: "border-[#34a4eb]",
    appointment: "border-green-500",
    reminder: "border-[#edca4a]",
    task: "border-purple-500",
  };

  const getCurrentDay = (day) => {
    const isCurrentMonthDay = day.month() === monthIndex;
    return isCurrentMonthDay
      ? day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
        ? "bg-blue-500 rounded-full text-white"
        : ""
      : "text-gray-400";
  };

  useEffect(() => {
    const dayEvents = data.filter((e) => e.date === day.format("YYYY-MM-DD"));
    setEvents(dayEvents);
    console.log("day envent", dayEvents, events);
  }, [day]);

  const calculateEventCardHeight = () => {
    if (events.length <= 3) {
      return "60px";
    } else {
      const additionalEvents = events.length - 3;
      const additionalHeight = additionalEvents * 20;
      return `calc(80px + ${additionalHeight}px)`;
    }
  };

  return (
    <div className={`border border-gray-200 flex flex-col min-h-[230px]`}>
      {rowIndex === 0 && (
        <header className="border-b border-gray-200 p-2 text-start">
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        </header>
      )}
      <div
        className={`text-sm m-3 p-[4px] px-[6px]  text-start w-max ${getCurrentDay(
          day
        )}`}
      >
        {day.format("DD")}
      </div>
      {events.length > 0 &&
        events.slice(0, 2).map((e, i) => (
          <div
            key={i}
            className={`mx-2 p-2 border-x-4 border  rounded-[5px] mb-2 overflow-hidden  pb-2 ${
              eventTypeColors[e.type] || "bg-gray-400"
            }`}
            style={{
              // maxWidth: "calc(100% - 16px)",
              maxHeight: calculateEventCardHeight(),
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <p
              className={`font-semibold text-xs ${
                isEventOver(e) ? "line-through" : ""
              }`}
            >
              {e.title}
            </p>
            <p className="text-xs">{`${e.startTime} - ${e.endTime}`}</p>
            <p className="text-xs">{e.description}</p>
          </div>
        ))}
      {events.length > 3 && (
        <div
          className={`mx-2 p-2  rounded-md mb-2 overflow-hidden cursor-pointer bg-purple-500 `}
          style={{ maxHeight: "60px" }}
        >
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            events={events}
            day={day}
          />

          <p
            className="font-semibold text-white text-xs"
            onClick={() => {
              setIsModalOpen(true);
              console.log(isModalOpen);
            }}
          >
            +{events.length - 2} more
          </p>
        </div>
      )}
    </div>
  );
}
