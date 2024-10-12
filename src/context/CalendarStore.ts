import React from "react";
import { Employee } from "@/models";
import { TimeOffDetails } from "@/app/time-off/models/TimeOff";

export const CalendarStore = React.createContext<{
  today: Date;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: Date;
  datesInMonth: Date[];
  employees: TimeOffDetails[];
  selectedCalendarDate: Date;
  updateSelectedCalendarDate: Function;
}>({
  today: new Date(),
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  selectedDay: new Date(),
  datesInMonth: [],
  employees: [],
  selectedCalendarDate: new Date(),
  updateSelectedCalendarDate: () => {},
});
