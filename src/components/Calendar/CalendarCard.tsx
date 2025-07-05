/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { FC } from "react";

import clsx from "clsx";
import { ALL_MONTHS, MonthObject, parseCalStart } from "./dateHelpers";
export interface CalendarProps {
  selectedDate: Date;
  /** This function updates the date prop */
  updateDate?: Function;
  /** This function closes the modal/view if this component is used with a picker */
  closeFocus?: () => void;
  maxDate?: Date;
  minDate?: Date;
}

function getYears(
  startYear: number,
  endYear: number,
  currentYear?: number
): number[] {
  if (startYear > endYear) {
    throw new Error("startYear must be less than or equal to endYear");
  }

  const years: number[] = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  if (currentYear === undefined) {
    return years;
  }

  if (currentYear < startYear || currentYear > endYear) {
    throw new Error("currentYear must be within the specified range");
  }

  const currentIndex = years.indexOf(currentYear);
  return years.slice(currentIndex + 1);
}

const getYearsInView = (years: number[], year: number): number[] => {
  const index = years.indexOf(year);
  if (index === -1) return [];
  // Return up to 9 elements starting from index
  const _years = years.slice(index, index + 9);
  return _years;
};

function getYearsInViewPrevious(years: number[], year: number): number[] {
  const index = years.indexOf(year);
  if (index === -1) return [];
  const start = Math.max(0, index - 8);
  return years.slice(start, index + 1);
}

const compareFirstIndexes = (
  yearsInView: number[],
  allYears: number[]
): boolean => {
  const _yivFirstIndex = yearsInView[0];
  const allYearsFirstIndex = allYears[0];
  return _yivFirstIndex === allYearsFirstIndex;
};
const compareLastIndexes = (
  yearsInView: number[],
  allYears: number[]
): boolean => {
  // const _yivLastIndex = yearsInView.length > 0 ? yearsInView.length - 1 : -1;
  // const allYearsLastIndex = allYears.length > 0 ? allYears.length - 1 : -1;

  const _yivLastIndex =
    yearsInView.length > 0 ? yearsInView[yearsInView.length - 1] : undefined;
  const allYearsLastIndex =
    allYears.length > 0 ? allYears[allYears.length - 1] : undefined;
  return _yivLastIndex === allYearsLastIndex;
};

const getMonthsInSelectedYear = (selectedYear: number, minDate: Date) => {
  const minDateMonth = minDate.getMonth();
  let months: MonthObject[] = [];

  if (minDate.getFullYear() === selectedYear) {
    ALL_MONTHS.map((month) => {
      if (month.id >= minDateMonth) {
        months.push(month);
      }
    });
  } else {
    months = ALL_MONTHS.map((month) => month);
  }

  return months;
};
/** The Calendar component is designed to fill the width of the container its in. It can be used with a picker, or as an independent component */
export const CalendarCard: FC<CalendarProps> = ({ selectedDate, ...props }) => {
  //------ Get Global Year Range Start -------
  const _maxDate = new Date();
  const maxDate =
    props.maxDate ??
    new Date(_maxDate.setFullYear(_maxDate.getFullYear() + 21));
  const _minDate = new Date();
  const minDate =
    props.minDate ??
    new Date(_minDate.setFullYear(_minDate.getFullYear() - 21));

  /** Total Years to show in Calendar */
  const allYearsInRange: number[] = Array.from(
    { length: maxDate.getFullYear() - minDate.getFullYear() + 1 },
    (_, i) => minDate.getFullYear() + i
  );

  //------ Get Global Year Range End -------

  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate.toLocaleString("en-us", { month: "long" })
  );

  const [selectedDay, setSelectedDay] = useState(selectedDate);

  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [years, setYears] = useState<number[]>(
    getYearsInView(allYearsInRange, selectedDate.getFullYear())
  );
  const allDates = () => {
    const _selectedMonth = getMonthsInSelectedYear(selectedYear, minDate).find(
      (item) => item.long === selectedMonth
    )!.id;
    //TODO: Fix this to set min day
    const date = new Date(selectedYear, _selectedMonth, 1);

    const dates: Date[] = [];
    while (date.getMonth() === _selectedMonth) {
      const _date = new Date(date);
      dates.push(_date);
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const selectYearHandler = (value: number) => {
    setSelectedYear(value);
    setShowYear(false);
    setShowMonth(false);
  };

  const selectMonthHandler = (month: string) => {
    setSelectedMonth(month);

    setShowMonth(false);
    setShowYear(false);
  };

  const selectDayHandler = (date: Date) => {
    setSelectedDay(date);
    props.updateDate!(date);
    props.closeFocus!();
  };

  const compareDates = (dateA: Date, dateB: Date) => {
    if (
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const nextYears = () => {
    const _lastYearInView = years[years.length - 1];
    const _years = getYearsInView(allYearsInRange, _lastYearInView + 1);
    setYears(_years);
  };

  const previousYears = () => {
    const firstYearInView = years[0];
    const _years = getYearsInViewPrevious(allYearsInRange, firstYearInView - 1);
    setYears(_years);
  };

  return (
    <div className="w-full p-3">
      <div className="text-center ">
        <div className="flex items-center text-gray-900 pb-2 border-b">
          <div className="flex-auto text-sm font-semibold">
            <button
              type="button"
              onClick={() => {
                setShowMonth(true);
                setShowYear(false);
              }}
              key={"selectedMonth"}
              className="px-6 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
            >
              {ALL_MONTHS.find((item) => item.long === selectedMonth)?.long}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowYear(true);
                setShowMonth(false);
              }}
              key={"selectedYear"}
              className="px-6 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
            >
              {selectedYear}
            </button>
          </div>
        </div>

        {showYear && (
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => previousYears()}
              disabled={compareFirstIndexes(years, allYearsInRange)}
              className={clsx(
                "-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500",
                compareFirstIndexes(years, allYearsInRange) &&
                  "cursor-not-allowed"
              )}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon
                className="w-5 h-5"
                aria-hidden="true"
              />
            </button>
            <div className="w-full grid grid-cols-3 mt-3">
              {years.map((year) => (
                <button
                  type="button"
                  onClick={() => selectYearHandler(year)}
                  key={year}
                  className="py-2 text-sm font-normal text-gray-700 rounded-md hover:bg-gray-50"
                >
                  {year}
                </button>
              ))}
            </div>
            <button
              onClick={() => nextYears()}
              disabled={compareLastIndexes(years, allYearsInRange)}
              type="button"
              className={clsx(
                "-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500",
                compareLastIndexes(years, allYearsInRange) &&
                  "cursor-not-allowed"
              )}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon
                className="w-5 h-5"
                aria-hidden="true"
              />
            </button>
          </div>
        )}

        {showMonth && (
          <div className="grid grid-cols-3 mt-3 ">
            {getMonthsInSelectedYear(selectedYear, minDate).map((item) => (
              <button
                type="button"
                onClick={() => selectMonthHandler(item.long)}
                key={item.id}
                className="py-2 text-sm font-normal text-gray-700 rounded-md hover:bg-gray-50"
              >
                {item.long}
              </button>
            ))}
          </div>
        )}

        {!showYear && !showMonth && (
          <>
            <div className="grid grid-cols-7 mt-2 text-xs leading-6 text-gray-500">
              <div>Su</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-px mt-2 text-sm bg-gray-200 shadow isolate ring-1 ring-gray-200">
              {allDates().map((day) => (
                <button
                  key={day.getDate()}
                  type="button"
                  onClick={() => {
                    selectDayHandler(day);
                  }}
                  className={clsx(
                    "bg-white divide-x-0 py-1.5 hover:bg-gray-100 focus:z-10",
                    day.getDate() === 1 ? parseCalStart(day.getDay()) : ``
                  )}
                >
                  <time
                    className={` mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
                      compareDates(day, selectedDate) &&
                      !compareDates(day, selectedDay)
                        ? "text-indigo-900 font-semibold"
                        : ""
                    } ${
                      compareDates(day, selectedDay) &&
                      "rounded-full bg-indigo-900 text-white"
                    } `}
                  >
                    {day.getDate()}
                  </time>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
