import { SectionHeader } from "../Headers";
import { BoxCalendar } from "./BoxCalendar";
import { FC, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  checkIfDateInRange,
  ALL_MONTHS,
  allDatesInMonth,
  formatDate,
  DATE_OPTIONS,
} from "@/lib/utilities/dateHelpers";
import { Employee, sampleEmployeeList } from "@/models";
import { CalendarStore } from "@/context/CalendarStore";
import {
  TimeOffDetails,
  sampleCalendarEmployee,
} from "@/app/time-off/models/TimeOff";
import { AVATAR_SIZES, AvatarCell } from "../Avatar";
import {
  EventSection,
  sampleCompanyEvents,
  sampleStatHolidays,
} from "@/app/time-off/components/EventCell";

export const Calendar = () => {
  /** State Controls for the Calendar Toggles */
  const [toggleMonth, setToggleMonth] = useState(new Date().getMonth());
  const [toggleYear, setToggleYear] = useState(new Date().getFullYear());
  const [toggledDay, setToggleDay] = useState(new Date());
  const today = new Date();

  const [allDates, setAllDates] = useState<Date[]>([]);

  /** Date selected on the Calendar Control */
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(toggledDay);

  const employeesInDate = (boxDate: Date) => {
    let filteredEmployees: TimeOffDetails[] = [];

    filteredEmployees = sampleCalendarEmployee.filter((emp) =>
      checkIfDateInRange(
        new Date(emp.startDate),
        new Date(emp.endDate),
        boxDate
      )
    );

    return filteredEmployees;
  };

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
        employees: sampleCalendarEmployee,
        selectedCalendarDate: selectedCalendarDate,
        updateSelectedCalendarDate: setSelectedCalendarDate,
      }}
    >
      <SectionHeader
        title="Calendar"
        button={
          <div className="flex items-center justify-between gap-x-3 text-sm">
            <div className="items-center gap-4 px-4 py-2 text-xs border-r lg:flex">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-300"></div>{" "}
                Holidays
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning-300"></div>{" "}
                Company Events
              </div>
              <div className="flex items-center gap-2 lg:hidden">
                <div className="w-3 h-3 bg-gray-700 rounded-full"></div> Out Of
                Office
              </div>
            </div>
            <button
              onClick={goToToday}
              className="px-3 py-2 text-xs font-semibold rounded-md text-primary-700 hover:bg-primary-50 hover:text-primary-900"
            >
              Today
            </button>
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
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
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
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        }
      />

      <BoxCalendar
        calendarContent={
          <CalendarContent
            selectedDate={toggledDay}
            selectedDay={selectedCalendarDate}
            filteredTeamMembers={employeesInDate(selectedCalendarDate).filter(
              (emp) => emp.employee.jobInformation?.teamId === "Architecture"
            )}
            filteredRestOfOrgMembers={employeesInDate(
              selectedCalendarDate
            ).filter(
              (emp) => emp.employee.jobInformation?.teamId !== "Architecture"
            )}
            fullHeight
          />
        }
      />
    </CalendarStore.Provider>
  );
};

const CalendarContent: FC<{
  selectedDay: Date;
  selectedDate: Date;
  filteredTeamMembers: TimeOffDetails[];
  filteredRestOfOrgMembers: TimeOffDetails[];
  fullHeight?: boolean;
}> = ({
  selectedDay,
  selectedDate,
  filteredTeamMembers,
  filteredRestOfOrgMembers,
  fullHeight,
}) => {
  return (
    <div className="col-span-4 mb-16 lg:mb-0 lg:col-span-1 ">
      <p className="mt-3 mb-4 text-sm font-medium text-left text-gray-900">
        {formatDate(selectedDay, DATE_OPTIONS.dMY)}
      </p>
      <div
        className={`overflow-auto ${
          fullHeight && "lg:h-[calc(100vh-300px)]"
        } border rounded-md bg-gray-25 overscroll-contain space-y-6 pb-4`}
      >
        {selectedDay.getDate() === 6 && (
          <div className="px-4 py-2">
            <EventSection
              sectionTitle="Statutory Holidays"
              events={sampleStatHolidays}
            />
          </div>
        )}

        {selectedDay.getDate() === 6 && (
          <div className="px-4">
            <EventSection
              sectionTitle="Company Events"
              events={sampleCompanyEvents}
            />
          </div>
        )}

        <EmployeeListing title="My Team" employees={filteredTeamMembers} />
        {filteredRestOfOrgMembers.length > 0 && (
          <EmployeeListing
            title="Other Teams"
            employees={filteredRestOfOrgMembers}
          />
        )}
      </div>
    </div>
  );
};

const EmployeeListing: FC<{
  title: string;
  employees: TimeOffDetails[];
}> = ({ title, employees }) => {
  return (
    <div>
      <p className="p-4 text-xs text-left text-gray-700">{`${title} (${employees.length})`}</p>

      {employees.length > 0 ? (
        <ul className="px-4 space-y-8 ">
          {employees.map((employee) => (
            <li key={employee.id}>
              <AvatarCell
                size={AVATAR_SIZES.sm}
                firstName={employee.employee.bioData.firstName}
                lastName={employee.employee.bioData.lastName}
                fullName={employee.employee.bioData.fullName}
                imageUrl={employee.employee.bioData.avatar}
                rowComponent={
                  <p className="text-xs text-gray-500">
                    {formatDate(new Date(employee.startDate), DATE_OPTIONS.dM)}-{" "}
                    {formatDate(new Date(employee.endDate), DATE_OPTIONS.dM)}
                  </p>
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-3 mx-4 text-sm text-gray-700 rounded-sm bg-gray-50 ">
          Nothing scheduled
        </div>
      )}
    </div>
  );
};
