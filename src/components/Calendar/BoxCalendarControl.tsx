import { useContext } from "react";
import { compareDates } from "@/lib/utilities/dateHelpers";
import { getCalendarColumnStart, getEmployeesInSelectedDate } from "./helpers";
import { CalendarStore } from "@/context/CalendarStore";
import { AVATAR_SIZES, Avatar } from "../Avatar";
import { Employee } from "@/models";
import { TimeOffDetails } from "@/app/time-off/models/TimeOff";

export const BoxCalendarControl = () => {
  const calendarStore = useContext(CalendarStore);

  return (
    <>
      <WeekHeader />
      <div className="hidden lg:grid grid-cols-7 mt-1 text-xs text-left bg-gray-200 divide-x divide-y isolate ring-1 ring-gray-200 h-[calc(100vh-300px)]">
        {calendarStore.datesInMonth.map((day, index) => (
          <button
            onClick={() => calendarStore.updateSelectedCalendarDate(day)}
            key={index}
            className={`divide-x-0 flex-col py-2 text-left hover:bg-primary-50 ${"py-3 focus:z-10"} ${
              compareDates(day, calendarStore.selectedCalendarDate)
                ? "bg-primary-900"
                : day.getDay() === 6 || day.getDay() === 0
                ? "bg-gray-50"
                : "bg-white"
            } ${day.getDate() === 1 && getCalendarColumnStart(day)} `}
          >
            <div className="flex items-center gap-2 px-3">
              <time
                className={`text-left flex h-6 w-6 items-center justify-center rounded-full ${
                  compareDates(day, calendarStore.selectedDay) &&
                  !compareDates(day, calendarStore.selectedCalendarDate)
                    ? "text-primary-900 "
                    : ""
                } ${
                  compareDates(day, calendarStore.selectedCalendarDate) &&
                  "rounded-full bg-primary-920 text-white "
                } `}
              >
                {day.getDate()}
              </time>
              {day.getMonth() === calendarStore.selectedDay.getMonth() &&
                day.getDate() === 6 && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-300"></div>
                )}
              {day.getMonth() === calendarStore.selectedDay.getMonth() &&
                day.getDate() === 6 && (
                  <div className="w-2.5 h-2.5 rounded-full bg-warning-300"></div>
                )}
            </div>

            <div className="flex items-center flex-shrink-0 px-3 mt-2 -space-x-1 ">
              {getEmployeesInSelectedDate(day, calendarStore.employees)
                .slice(0, 3)
                .map((employee: TimeOffDetails) => (
                  <Avatar
                    key={employee.id}
                    firstName={employee.employee.bioData.firstName}
                    lastName={employee.employee.bioData.lastName}
                    imageUrl={employee.employee.bioData.avatar}
                    size={AVATAR_SIZES.xs}
                  />
                ))}
              {getEmployeesInSelectedDate(day, calendarStore.employees).length >
                3 && (
                <span className="p-0.5 bg-white rounded-full">
                  +
                  {getEmployeesInSelectedDate(day, calendarStore.employees)
                    .length - 3}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-7 mt-1 text-xs text-left bg-gray-200 divide-x divide-y lg:hidden isolate ring-1 ring-gray-200 ">
        {calendarStore.datesInMonth.map((day, index) => (
          <button
            onClick={() => calendarStore.updateSelectedCalendarDate(day)}
            key={index}
            className={`divide-x-0 flex-col px-1 py-3 text-left hover:bg-indigo-50/20  ${
              compareDates(day, calendarStore.selectedCalendarDate)
                ? "bg-primary-900"
                : day.getDay() === 6 || day.getDay() === 0
                ? "bg-gray-50"
                : "bg-white"
            } ${day.getDate() === 1 && getCalendarColumnStart(day)} `}
          >
            <div className="flex gap-2">
              <time
                className={`text-left flex h-6 w-6 items-center justify-center rounded-full ${
                  compareDates(day, calendarStore.selectedDay) &&
                  !compareDates(day, calendarStore.selectedCalendarDate)
                    ? "text-primary-900 "
                    : ""
                } ${
                  compareDates(day, calendarStore.selectedCalendarDate) &&
                  "rounded-full bg-primary-920 text-white "
                } `}
              >
                {day.getDate()}
              </time>
              <div>
                {day.getMonth() === calendarStore.selectedDay.getMonth() &&
                  day.getDate() === 6 && (
                    <div className="w-2 h-2 rounded-full bg-primary-300"></div>
                  )}
                {day.getMonth() === calendarStore.selectedDay.getMonth() &&
                  day.getDate() === 6 && (
                    <div className="w-2 h-2 mt-1 rounded-full bg-warning-300"></div>
                  )}

                {getEmployeesInSelectedDate(day, calendarStore.employees)
                  .length >= 1 && (
                  <div className="w-2 h-2 mt-1 bg-gray-700 rounded-full"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

const WeekHeader = () => {
  return (
    <div className="grid grid-cols-7 text-xs leading-6 text-gray-700 border divide-x bg-gray-25">
      <div className="px-3 py-1 text-left">Sun</div>
      <div className="px-3 py-1 text-left">Mon</div>
      <div className="px-3 py-1 text-left">Tue</div>
      <div className="px-3 py-1 text-left">Wed</div>
      <div className="px-3 py-1 text-left">Thu</div>
      <div className="px-3 py-1 text-left">Fri</div>
      <div className="px-3 py-1 text-left">Sat</div>
    </div>
  );
};
