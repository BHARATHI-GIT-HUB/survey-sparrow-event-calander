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
    meeting: "bg-[#34a4eb]",
    appointment: "bg-green-500",
    reminder: "bg-[#edca4a]",
    task: "bg-purple-500",
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
    <div className={`border border-gray-200  flex flex-col  `}>
      {rowIndex === 0 && (
        <header className="border-b border-gray-200 p-2 text-start">
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        </header>
      )}
      <div
        className={`text-sm m-3 p-[4px] px-[6px]  w-max ${getCurrentDay(day)}`}
      >
        {day.format("DD")}
      </div>
      {/* {console.info(events.length > 0, day)} */}
      {events.length > 0 &&
        events.slice(0, 2).map((e, i) => (
          <div
            key={i}
            className={` mx-2 px-2 py-1 text-white rounded-[5px] mb-2 overflow-hidden  pb-2 ${
              eventTypeColors[e.type] || "bg-gray-400"
            }`}
            // style={{
            //   maxWidth: "calc(100% - 16px)",
            //   maxHeight: calculateEventCardHeight(),
            // }}
          >
            <p className="font-semibold text-xs">{e.title}</p>
            {/* <p className="text-xs">{`${e.startTime} - ${e.endTime}`}</p> */}
          </div>
        ))}
      {/* {events.length > 0 &&
        events.slice(0, 2).map((e, i) => {
          {
            console.info(e);
          }
          <div
            key={i}
            className={`mx-2 p-2 border-x-4 border  rounded-[5px] mb-2  pb-2 ${
              eventTypeColors[e.type] || "bg-gray-400"
            }`}
            style={
              {
                // maxWidth: "calc(100% - 16px)",
                // maxHeight: calculateEventCardHeight(),
              }
            }
            onClick={() => setIsModalOpen(true)}
          >
            <p
              className={`font-semibold text-xs ${
                isEventOver(e) && "line-through"
              }`}
            >
              {e.title}
            </p>
            <p className="text-xs">{`${e.startTime} - ${e.endTime}`}</p>
          </div>;
        })} */}
      {events.length > 3 && (
        <div
          className={`mx-2 px-2 py-1  rounded-md mb-2 overflow-hidden cursor-pointer bg-purple-500 `}
          style={{ maxHeight: "60px" }}
        >
          <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            events={events}
            day={day}
          />

          <button
            className="font-semibold text-white text-xs"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            +{events.length - 2} more
          </button>
        </div>
      )}
    </div>
  );
}
