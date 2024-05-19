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
