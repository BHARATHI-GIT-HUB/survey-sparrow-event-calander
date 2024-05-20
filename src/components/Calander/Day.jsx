import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { data } from "../../data.js";
import GlobalContext from "../../context/Context.js";
import Modal from "../Modal.js";
import { isEventOver, sortEvent } from "../../util.js";

export function Day({ day, rowIndex }) {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCurrentDay = (day) => {
    const isCurrentMonthDay = day.month() === monthIndex;
    return isCurrentMonthDay
      ? day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
        ? "bg-blue-400 rounded-full text-white"
        : ""
      : "text-gray-400";
  };

  useEffect(() => {
    const dayEvents = data.filter((e) => e.date === day.format("YYYY-MM-DD"));
    setEvents(dayEvents);
  }, [day]);

  return (
    <div className={`border border-gray-200 flex flex-col`}>
      <div className="flex flex-col items-end border-gray-300">
        {rowIndex === 0 && (
          <div className="border-b w-full py-1 px-2">
            <p className="text-sm mt-1  text-end">
              {day.format("ddd").toUpperCase()}
            </p>
          </div>
        )}

        <p className={`text-sm p-1 m-2 text-center  ${getCurrentDay(day)}`}>
          {day.format("DD")}
        </p>
      </div>

      <div className="flex-1">
        {events.length > 0 &&
          events.slice(0, 3).map((e, i) => (
            <div
              key={i}
              style={{ backgroundColor: e.colour }}
              className={`mx-2 md:px-2 mb-1  text-white rounded-[5px] overflow-hidden
               `}
            >
              <p
                className={`text-gray-500 text-sm  truncate capitalize
               ${isEventOver(e) ? "line-through text-gray-600" : ""}`}
              >
                {e.title}
              </p>
            </div>
          ))}
        {events.length > 3 && (
          <>
            <Modal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              events={events}
              day={day}
            />
            <div
              className={`mx-2 px-1 rounded-md overflow-hidden cursor-pointer bg-purple-500 `}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <button className="font-semibold text-white text-xs">
                +{events.length - 3} more
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
