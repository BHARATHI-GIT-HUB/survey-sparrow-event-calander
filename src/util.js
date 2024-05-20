import dayjs from "dayjs";

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  // to fill the first week with the last days of the previous month
  let currentMonthCount = 0 - firstDayOfMonth;

  const dayMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(0).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return dayMatrix;
};

export const isEventOver = (event) => {
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

export const sortEvent = (events) => {
  return events.sort((firstEvent, secondEvent) => {
    const firstStartTime = dayjs(
      firstEvent.date + " " + firstEvent.startTime,
      "YYYY-MM-DD hh:mm A",
      true
    );
    const secondStartTime = dayjs(
      secondEvent.date + " " + secondEvent.startTime,
      "YYYY-MM-DD hh:mm A",
      true
    );
    return firstStartTime > secondStartTime
      ? 1
      : firstStartTime < secondStartTime
      ? -1
      : 0;
  });
};

export function handlePrevMonth(monthIndex, setMonthIndex, setCurrentMonth) {
  setMonthIndex(monthIndex - 1);
  setCurrentMonth(monthIndex - 1);
}

export function handleNextMonth(monthIndex, setMonthIndex, setCurrentMonth) {
  setMonthIndex(monthIndex + 1);
  setCurrentMonth(monthIndex + 1);
}
