import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isEventOver } from "../util";

export default function Modal({ isModalOpen, setIsModalOpen, events, day }) {
  const eventTypeColors = {
    meeting: "bg-[#34a4eb]",
    appointment: "bg-green-500",
    reminder: "bg-[#edca4a]",
    task: "bg-purple-500",
  };

  const close = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex  flex-shrink-0 items-center justify-center rounded-full bg-blue-400 sm:mx-0 sm:h-8 sm:w-8">
                      <p className=" rounded-full text-white">
                        {day.format("DD")}
                      </p>
                    </div>
                    <ul className="flex flex-col space-y-4 items-center justify-center divide-y">
                      {events.map((e, i) => {
                        return (
                          <li
                            key={i}
                            className={`text-center sm:ml-4 sm:mt-0 sm:text-left capitalize ${
                              i > 0 ? "pt-4" : ""
                            }`}
                          >
                            <h3
                              className={`flex gap-2 items-center justify-start text-base font-semibold leading-6  ${
                                isEventOver(e) ? "line-through" : ""
                              } `}
                              id="modal-title"
                            >
                              <p
                                className={`w-2 h-2 ${
                                  eventTypeColors[e.type]
                                } rounded-full`}
                              ></p>
                              {e.title}
                            </h3>

                            <p className="text-xs mt-1">
                              {" "}
                              {e.startTime} - {e.endTime}{" "}
                            </p>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                {e.description}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={close}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};
