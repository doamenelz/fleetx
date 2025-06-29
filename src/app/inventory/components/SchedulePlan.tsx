import { BoxCalendar } from "../../../components/Calendar/BoxCalendar";
import { FC, useContext, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  ALL_MONTHS,
  allDatesInMonth,
  isDateInRange,
  getFirstAndLastDayOfMonth,
} from "@/lib/utilities/dateHelpers";
import { CalendarStore, DateIndicator } from "@/context/CalendarStore";

import { getScheduleColor, ScheduleList } from "./ScheduleListing";
import { classNames } from "@/lib/utilities/helperFunctions";
import { SCHEDULE_TYPES, ScheduleEntry } from "@/models/ScheduleEntry";
import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";

export const ScheduleView: FC<{ vehicleId: string }> = ({ vehicleId }) => {
  /** State Controls for the Calendar Toggles */

  const [toggleMonth, setToggleMonth] = useState(new Date().getMonth());
  const [toggleYear, setToggleYear] = useState(new Date().getFullYear());
  const [toggledDay, setToggleDay] = useState(new Date());
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [apiResponse, setApiResponse] = useState<APICompletion | undefined>();
  const today = new Date();
  const [isLoading, setIsLoading] = useState(true);
  const rootContext = useContext(RootContext);
  const [allDates, setAllDates] = useState<Date[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<ScheduleEntry[]>(
    []
  );

  const scheduleTypes = [
    SCHEDULE_TYPES.INSPECTION,
    SCHEDULE_TYPES.RENEWAL,
    SCHEDULE_TYPES.SERVICE,
  ];

  const getDistinctSchedules = (schedules: ScheduleEntry[]) => {
    const seen = new Set();
    return schedules.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const updateSchedules = (data: ScheduleEntry[]) => {
    const _days = getFirstAndLastDayOfMonth(toggleYear, toggleMonth);
    const _filteredSchedules: ScheduleEntry[] = [];
    const _featuredDates: DateIndicator[] = [];

    const setFeaturedDate = (schedule: ScheduleEntry) => {
      return {
        date: new Date(schedule.date),
        color: getScheduleColor(schedule.type),
      };
    };

    //Check if the the selected calendar date is in the current month and parse through the list of schedules
    // isDateInRange(_days.firstDay, _days.lastDay, selectedCalendarDate)
    //   ? data.map((schedule) => {
    //       if (
    //         // isDateInRange(_days.firstDay, _days.lastDay, selectedCalendarDate)
    //         isDateInRange(
    //           new Date(selectedCalendarDate.setUTCHours(0, 0, 0, 0)),
    //           new Date(selectedCalendarDate.setUTCHours(23, 59, 59, 999)), //.setUTCHours(23, 59, 59, 999),
    //           new Date(schedule.date)
    //         )
    //       ) {
    //         console.log("Date in range", schedule.date);
    //         _featuredDates.push(setFeaturedDate(schedule));
    //         _filteredSchedules.push(schedule);
    //       }
    //     })
    //   : // If the selected date is not in the current month, filter by the date range
    //     data.map((schedule) => {
    //       if (
    //         // isDateInRange(_days.firstDay, _days.lastDay, selectedCalendarDate)
    //         isDateInRange(
    //           _days.firstDay,
    //           _days.lastDay,
    //           new Date(schedule.date)
    //         )
    //       ) {
    //         _filteredSchedules.push(schedule);
    //         _featuredDates.push(setFeaturedDate(schedule));
    //       }
    //     });

    data.map((schedule) => {
      if (
        // isDateInRange(_days.firstDay, _days.lastDay, selectedCalendarDate)
        isDateInRange(_days.firstDay, _days.lastDay, new Date(schedule.date))
      ) {
        _filteredSchedules.push(schedule);
        _featuredDates.push(setFeaturedDate(schedule));
      }
    });
    setFilteredSchedules(_filteredSchedules);
  };

  const getSchedule = async () => {
    setIsLoading(true);
    const _days = getFirstAndLastDayOfMonth(toggleYear, toggleMonth);
    const api = await apiHandler({
      url: `${
        rootContext.envVar.baseURL
      }/schedule?vehicleId=${vehicleId}&startDate=${
        _days.firstDay.toISOString().split("T")[0]
      }&endDate=${_days.lastDay.toISOString().split("T")[0]}`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    setApiResponse(api);
    if (api.success) {
      const _schedules = schedules;

      const combinedSchedules = getDistinctSchedules([
        ..._schedules,
        ...(api.data as ScheduleEntry[]),
      ]);

      setSchedules(combinedSchedules);
      updateSchedules(combinedSchedules);
    }
    setIsLoading(false);
  };

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
    setSelectedCalendarDate(today);
  };

  useEffect(() => {
    let dates: Date[] = allDatesInMonth(toggleMonth, toggleYear);
    setAllDates(dates);
    getSchedule();
  }, [toggleMonth, toggleYear]);

  // useEffect(() => {
  //   console.log("Selected Calendar Date Changed", selectedCalendarDate);
  //   console.log("Toggled Day Changed", schedules);
  //   updateSchedules(schedules);
  // }, [selectedCalendarDate]);

  return (
    <CalendarStore.Provider
      value={{
        today: today,
        selectedMonth: toggleMonth,
        selectedYear: toggleYear,
        selectedDay: toggledDay,
        datesInMonth: allDates,
        canClickDateCell: false,
        selectedCalendarDate: selectedCalendarDate,
        highlightedDates: filteredSchedules.map((schedule) => ({
          date: new Date(schedule.date),
          color: getScheduleColor(schedule.type),
        })),
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
            <LegendItem
              key={scheduleType}
              type={scheduleType}
            />
          ))}
        </div>
      </div>

      <BoxCalendar
        calendarContent={
          <>
            <ScheduleList
              schedules={filteredSchedules}
              isLoading={isLoading}
              isSuccess={apiResponse?.success ?? false}
              getSchedules={getSchedule}
            />
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
