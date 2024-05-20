import React from "react";
import { CreateEventButton } from "./Button";
import { SmallCalander } from "./Calander";
import Lable from "./Lable";

export default function Sidebar({ isSlider, setIsSlider }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 8vh)",
        maxHeight: "calc(100vh - 8vh)",
      }}
      className="flex flex-col gap-y-10 p-3 border-r min-w-1/6 border-gray-500"
    >
      <CreateEventButton />
      <SmallCalander />
      <Lable />
    </div>
  );
}
