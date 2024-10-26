import React from "react";
export const CalendarStore = React.createContext<{
  today: Date;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: Date;
  datesInMonth: Date[];

  selectedCalendarDate: Date;
  updateSelectedCalendarDate: Function;
}>({
  today: new Date(),
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  selectedDay: new Date(),
  datesInMonth: [],

  selectedCalendarDate: new Date(),
  updateSelectedCalendarDate: () => {},
});
