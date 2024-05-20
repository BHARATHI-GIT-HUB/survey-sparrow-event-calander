import React from "react";
import { CreateEventButton } from "./Button";
import { SmallCalander } from "./Calander";
import Lable from "./Lable";

export default function Sidebar({ isSlider, setIsSlider }) {
  return (
    <div className="hidden md:flex h-screen flex-col gap-y-10 p-3 border-r min-w-1/6 border-gray-500">
      <CreateEventButton />
      <SmallCalander />
      <Lable />
    </div>
  );
}
