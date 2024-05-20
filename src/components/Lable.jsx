import React from "react";

export default function Lable() {
  const eventTypeColors = {
    meeting: "bg-[#34a4eb]",
    appointment: "bg-green-500",
    reminder: "bg-[#edca4a]",
    task: "bg-purple-500",
  };

  return (
    <div className="mx-2">
      <h3 className="text-gray-400 text-2xl py-2">Lables</h3>
      <ul className="flex flex-col gap-y-3">
        {Object.entries(eventTypeColors).map(([event, colour]) => (
          <li key={event} className="flex items-center gap-2">
            <p className={`h-3 w-3 rounded-full ${colour} `}></p>
            <p className="capitalize">{event}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
