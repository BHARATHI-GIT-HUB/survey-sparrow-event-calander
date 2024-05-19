import React from "react";
import CreateEventButton from "./CreateEventBtn";
import SmallCalander from "./SmallCalander";
import Lable from "./Lable";

export default function Sidebar() {
  return (
    <div className="h-screen flex flex-col gap-y-10 p-3 border-r w-1/6 border-gray-500 ">
      <CreateEventButton />
      <SmallCalander />
      <Lable />
    </div>
  );
}
