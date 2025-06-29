import React from "react";
export const CalendarStore = React.createContext<{
  today: Date;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: Date;
  datesInMonth: Date[];

  selectedCalendarDate: Date;
  updateSelectedCalendarDate: Function;
  canClickDateCell?: boolean;
  highlightedDates?: DateIndicator[];
  setHighlightedDates?: React.Dispatch<React.SetStateAction<DateIndicator[]>>;
}>({
  today: new Date(),
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  selectedDay: new Date(),
  datesInMonth: [],

  selectedCalendarDate: new Date(),
  updateSelectedCalendarDate: () => {},
});

export interface DateIndicator {
  date: Date;
  color: string;
}
