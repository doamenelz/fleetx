import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { FC } from "react";

import { ALL_MONTHS, parseCalStart } from "@/lib/utilities/dateHelpers";
import { classNames } from "@/lib/utilities/helperFunctions";
import { INPUT_TYPES, InputObject } from "../TextInput";
export interface CalendarProps {
  selectedDate: Date;
  /** This function updates the date prop */
  updateDate?: Function;
  /** This function closes the modal/view if this component is used with a picker */
  closeFocus?: () => void;
}

/** The Calendar component is designed to fill the width of the container its in. It can be used with a picker, or as an independent component */
export const CalendarCard: FC<CalendarProps> = ({ selectedDate, ...props }) => {
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate.toLocaleString("en-us", { month: "long" })
  );

  const allYears = () => {
    let yearsArray: [number] = [selectedDate.getFullYear()];

    for (let i = 1; i < 9; i++) {
      yearsArray.push(selectedDate.getFullYear() + i);
    }

    return yearsArray;
  };
  const [selectedDay, setSelectedDay] = useState(selectedDate);

  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [years, setYears] = useState<number[]>(allYears());
  const allDates = () => {
    let _selectedMonth = ALL_MONTHS.find(
      (item) => item.long === selectedMonth
    )!.id;
    let date = new Date(selectedYear, _selectedMonth, 1);

    let dates: Date[] = [];
    while (date.getMonth() === _selectedMonth) {
      let _date = new Date(date);
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
    console.log(month);

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
    let firstYear = years.at(-1)! + 1;
    let yearsArray: [number] = [firstYear];

    for (let i = 1; i < 9; i++) {
      yearsArray.push(firstYear + i);
    }

    console.log(yearsArray);

    setYears(yearsArray);
  };

  const previousYears = () => {
    let firstYear = years[0] - 9;
    let yearsArray: [number] = [firstYear];

    for (let i = 1; i < 9; i++) {
      yearsArray.push(firstYear + i);
    }

    console.log(yearsArray);

    setYears(yearsArray);
  };

  return (
    <div className="w-full p-3">
      <div className="text-center ">
        <div className="flex items-center text-gray-900 pb-2 border-b">
          {/* <button
            type="button"
            onClick={() => previousYears()}
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          </button> */}
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
          {/* <button
            onClick={() => nextYears()}
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </button> */}
        </div>

        {showYear && (
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => previousYears()}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
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
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        )}

        {showMonth && (
          <div className="grid grid-cols-3 mt-3 ">
            {ALL_MONTHS.map((item) => (
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
                  className={classNames(
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
