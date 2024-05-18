import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { data } from "../data.js";
import GlobalContext from "../context/GlobalContext.js";
import Modal from "./Modal.js";

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

  const isEventOver = (event) => {
    const startTime = dayjs(
      event.date + " " + event.startTime,
      "YYYY-MM-DD hh:mm A",
      true
    );
    const endTime = dayjs(
      event.date + " " + event.endTime,
      "YYYY-MM-DD hh:mm A",
      true
    );
    const currentTime = dayjs();
    return currentTime.isAfter(startTime) && currentTime.isAfter(endTime);
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
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
          <p className="font-semibold text-white text-xs">
            +{events.length - 2} more
          </p>
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { data } from "../data.js";

// export default function Day({ day, rowIndex }) {
//   const [events, setEvents] = useState([]);

//   const eventTypeColors = {
//     meeting: "bg-[#34a4eb]",
//     appointment: "bg-green-500",
//     reminder: "bg-yellow-500",
//     task: "bg-purple-500",
//     // Add more event types and colors as needed
//   };

//   const getCurrentDay = (day) => {
//     const isCurrentMonthDay = day.month() === dayjs().month();
//     return isCurrentMonthDay
//       ? day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
//         ? "bg-blue-500 rounded-full text-white"
//         : ""
//       : "text-gray-400";
//   };

//   useEffect(() => {
//     const dayEvents = data.filter((e) => e.date === day.format("DD-MM-YYYY"));
//     setEvents(dayEvents);
//   }, [day]);

//   return (
//     <div className={`border border-gray-200 flex flex-col`}>
//       {rowIndex === 0 && (
//         <header className="border-b border-gray-200 p-2 text-start">
//           <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
//         </header>
//       )}
//       <div
//         className={`text-sm m-3 p-[4px] px-[6px] text-start w-max ${getCurrentDay(
//           day
//         )}`}
//       >
//         {day.format("DD")}
//       </div>
//       {(events.length > 0 && events.length <= 3) ? (
//         events.map((e, i) => (
//           <div
//             key={i}
//             className={`p-2 border-l-4 rounded-md mb-2 overflow-hidden ${
//               eventTypeColors[e.type] || "bg-gray-300"
//             }`}
//             style={{ maxWidth: "calc(100% - 16px)", maxHeight: "80px" }}
//           >
//             <p className="font-semibold text-white text-xs">{e.title}</p>
//             <p className="text-xs text-gray-100">{`${e.startTime} - ${e.endTime}`}</p>
//             <p className="text-xs text-gray-100">{e.description}</p>
//           </div>
//         ))) : events.length > 0 && (
//           <div
//             className={`p-2 border-l-4 rounded-md mb-2 overflow-hidden ${
//               eventTypeColors["task"] || "bg-gray-300"
//             }`}
//             style={{ maxWidth: "calc(100% - 16px)", maxHeight: "80px" }}
//           >
//             <p className="font-semibold text-white text-xs">+{events.length - 3} more</p>
//           </div>

//         )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { data } from "../data.js";

// export default function Day({ day, rowIndex }) {
//   const [events, setEvents] = useState([]);

//   const getCurrentDay = (day) => {
//   const isCurrentMonthDay = day.month() === dayjs().month();
//   return isCurrentMonthDay
//     ? day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
//       ? "bg-blue-500 rounded-full text-white"
//       : " "
//     : "text-gray-400"; // Different styling for days of other months
// };

//   useEffect(() => {
//     const dayEvents = data.filter((e) => e.date === day.format("DD-MM-YYYY"));
//     console.log(dayEvents, data[0].date === day.format("DD-MM-YYYY"));
//     setEvents(dayEvents);
//   }, []);

//   return (
//     <div className={`border border-gray-200 flex flex-col`}>
//       {rowIndex === 0 && (
//         <header className="border-b border-gray-200 p-2 text-start">
//           <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
//         </header>
//       )}{" "}
//       <div
//         className={`text-sm m-3 p-[4px] px-[6px]  text-start w-max ${getCurrentDay(
//           day
//         )}`}
//       >
//         {day.format("DD")}
//       </div>
//       {events.length > 0 &&
//         events.map((e, i) => {
//           return (
//             <div key={i} className="bg-gray-50 p-2 border-r-2">
//               <p>{e.title}</p>
//               <p className=" text-sm font-thin ">{e.startTime} - {e.endTime}</p>
//             </div>
//           );
//         })}
//     </div>
//   );
// }
