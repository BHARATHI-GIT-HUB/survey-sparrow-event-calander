import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { data } from "../../data.js";
import GlobalContext from "../../context/GlobalContext.js";
import Modal from "../Modal.js";
import { isEventOver, sortEvent } from "../../util.js";

export function Day({ day, rowIndex }) {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventTypeColors = {
    meeting: "bg-[#34a4eb]",
    appointment: "bg-green-500",
    reminder: "bg-[#edca4a]",
    task: "bg-purple-500",
  };

  const getCurrentDay = (day) => {
    const isCurrentMonthDay = day.month() === monthIndex;
    return isCurrentMonthDay
      ? day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
        ? "bg-blue-400 rounded-full text-white"
        : ""
      : "text-gray-400";
  };

  console.log(sortEvent(events), "sort");

  useEffect(() => {
    const dayEvents = data.filter((e) => e.date === day.format("YYYY-MM-DD"));
    setEvents(dayEvents);
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
    <div className={`border border-gray-200 `}>
      {rowIndex === 0 && (
        <header className="border-b border-gray-200 p-2 ">
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        </header>
      )}
      <div
        className={`text-sm m-2 px-[5px] p-[4px] max-w-max   ${getCurrentDay(
          day
        )}`}
      >
        {day.format("DD")}
      </div>
      <div className="flex flex-col justify-center  gap-y-2 py-2">
        {events.length > 0 &&
          events.slice(0, 2).map((e, i) => (
            <div
              key={i}
              className={`mx-2 px-2 py-1 text-white rounded-[5px] overflow-hidden ${
                eventTypeColors[e.type] || "bg-gray-400"
              }`}
            >
              <p className="font-semibold text-xs capitalize">{e.title}</p>
            </div>
          ))}
      </div>
      {events.length > 3 && (
        <>
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            events={events}
            day={day}
          />
          <div
            className={`mx-2 px-2 rounded-md overflow-hidden cursor-pointer bg-purple-500 `}
            // style={{ maxHeight: "60px" }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <button className="font-semibold text-white text-xs">
              +{events.length - 2} more
            </button>
          </div>
        </>
      )}
    </div>
  );
}