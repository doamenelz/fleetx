import { FC } from "react";

import { BoxCalendarControl } from "./BoxCalendarControl";

export const BoxCalendar: FC<{
  calendarContent?: JSX.Element;
}> = ({ calendarContent }) => {
  //   const getLeaveDates = (employee: Employee) => {
  //     let allDates: Date[] = [];

  //     for (let index = 0; index < employee.leavePlan!.length; index++) {
  //       let startDate: Date = employee.leavePlan![index].leaveStart!;
  //       let endDate: Date = employee.leavePlan![index].resumptionDate!;

  //       while (startDate <= endDate) {
  //         allDates.push(new Date(startDate));
  //         startDate.setDate(startDate.getDate() + 1);
  //       }
  //     }

  //     return allDates;
  //   };

  /**
   *
   * TODO: Today not auto-selecting Date
   * TODO: Date picker  */
  return (
    <div className="py-3">
      <div className="text-center ">
        <div className="p-2 bg-gray-100 rounded-sm">
          <div className="grid grid-cols-4 gap-4">
            <div
              className={`col-span-4 ${
                calendarContent !== undefined && "lg:col-span-3"
              }`}
            >
              <BoxCalendarControl />
            </div>

            {calendarContent}
          </div>
        </div>
      </div>
    </div>
  );
};
