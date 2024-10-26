import { SectionHeader } from "../../../components/Headers";
import { BoxCalendar } from "../../../components/Calendar/BoxCalendar";
import { FC, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  checkIfDateInRange,
  ALL_MONTHS,
  allDatesInMonth,
} from "@/lib/utilities/dateHelpers";
import { CalendarStore } from "@/context/CalendarStore";
import {
  TimeOffDetails,
  sampleCalendarEmployee,
} from "@/app/time-off/models/TimeOff";

import { getScheduleColor, ScheduleList } from "./ScheduleListing";
import { classNames } from "@/lib/utilities/helperFunctions";

export const ScheduleView = () => {
  /** State Controls for the Calendar Toggles */
  const [toggleMonth, setToggleMonth] = useState(new Date().getMonth());
  const [toggleYear, setToggleYear] = useState(new Date().getFullYear());
  const [toggledDay, setToggleDay] = useState(new Date());
  const today = new Date();

  const [allDates, setAllDates] = useState<Date[]>([]);

  const scheduleTypes = [
    "payment",
    "service",
    "inspection",
    "renewals",
    "others",
  ];

  /** Date selected on the Calendar Control */
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(toggledDay);

  const addMonth = () => {
    /** TODO:  */
    if (toggleMonth <= 10) {
      setToggleMonth(toggleMonth + 1);
    } else {
      setToggleMonth(0);
      setToggleYear(toggleYear + 1);
    }
  };

  const previousMonth = () => {
    if (toggleMonth >= 1) {
      setToggleMonth(toggleMonth - 1);
    } else {
      setToggleMonth(11);
      setToggleYear(toggleYear - 1);
    }
  };

  const goToToday = () => {
    setToggleDay(today);
    setToggleMonth(today.getMonth());
    setToggleYear(today.getFullYear());
  };

  useEffect(() => {
    let dates: Date[] = allDatesInMonth(toggleMonth, toggleYear);
    setAllDates(dates);
    // console.log(dates.length);
    console.log(dates[0].getDay());
  }, [toggleMonth, toggleYear]);

  return (
    <CalendarStore.Provider
      value={{
        today: today,
        selectedMonth: toggleMonth,
        selectedYear: toggleYear,
        selectedDay: toggledDay,
        datesInMonth: allDates,
        selectedCalendarDate: selectedCalendarDate,
        updateSelectedCalendarDate: setSelectedCalendarDate,
      }}
    >
      <div className="flex items-center justify-between gap-x-3 text-sm py-2">
        <div className="flex gap-2">
          <div className="relative flex items-center bg-white rounded-md md:items-stretch ">
            <div
              className="absolute inset-0 rounded-md pointer-events-none ring-1 ring-inset ring-gray-200"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={previousMonth}
              className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-400 rounded-l-md hover:text-primary-500 md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon
                className="w-5 h-5"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-primary-900  md:block w-[150px]"
            >
              {ALL_MONTHS[toggleMonth].long} {toggleYear}
            </button>
            <span className="relative w-px h-5 -mx-px bg-gray-300 md:hidden" />
            <button
              onClick={addMonth}
              type="button"
              className="flex items-center justify-center py-2 pl-4 pr-3 text-gray-400 rounded-r-md hover:text-primary-500 md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon
                className="w-5 h-5"
                aria-hidden="true"
              />
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-3 py-2 text-xs font-semibold rounded-md text-primary-700 hover:bg-primary-50 hover:text-primary-900"
          >
            Go to Today
          </button>
        </div>

        <div className="items-center gap-4 px-4 text-xs lg:flex">
          {scheduleTypes.map((scheduleType) => (
            <LegendItem type={scheduleType} />
          ))}
        </div>
      </div>
      <BoxCalendar
        calendarContent={
          <>
            <ScheduleList />
          </>
        }
      />
    </CalendarStore.Provider>
  );
};

const LegendItem: FC<{ type: string }> = ({ type }) => {
  return (
    <div className="flex text-xs items-center gap-1 capitalize">
      <div
        className={classNames("w-2 h-2 rounded-full", getScheduleColor(type))}
      ></div>
      {type}
    </div>
  );
};
