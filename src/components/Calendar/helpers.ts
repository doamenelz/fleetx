import { Employee } from "@/models";
import { TimeOffDetails } from "@/app/time-off/models/TimeOff";
import { checkIfDateInRange } from "@/lib/utilities/dateHelpers";
export const getCalendarColumnStart = (date: Date) => {
  let dayOfWeek = date.getDay();
  switch (dayOfWeek) {
    case 0:
      return `col-start-1`;
    case 1:
      return `col-start-2`;
    case 2:
      return `col-start-3`;
    case 3:
      return `col-start-4`;
    case 4:
      return `col-start-5`;
    case 5:
      return `col-start-6`;
    case 6:
      return `col-start-7`;

    default:
      return `col-start-3`;
  }
};

/** This function is used to check if the supplied BoxDate
 * falls within an Employee's leaveStart and leaveEnd date.
 * It also filters out the weekend */
export const getEmployeesInSelectedDate = (
  boxDate: Date,
  employeesArray: TimeOffDetails[]
) => {
  let filteredEmployees: TimeOffDetails[] = [];

  filteredEmployees = employeesArray.filter(
    (emp) =>
      checkIfDateInRange(
        new Date(emp.startDate),
        new Date(emp.endDate),
        boxDate
      ) &&
      boxDate.getDay() !== 0 &&
      boxDate.getDay() !== 6
  );

  return filteredEmployees;
};
