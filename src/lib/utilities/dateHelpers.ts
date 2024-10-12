export interface MonthObject {
  id: number;
  short: string;
  long: string;
}

export const allDatesInMonth = (month: number, year: number) => {
  let date = new Date(year, month, 1);
  let allDates: Date[] = [];
  while (date.getMonth() === month) {
    allDates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return allDates;
};

export const ALL_MONTHS: MonthObject[] = [
  { id: 0, short: "Jan", long: "January" },
  { id: 1, short: "Feb", long: "February" },
  { id: 2, short: "Mar", long: "March" },
  { id: 3, short: "Apr", long: "April" },
  { id: 4, short: "May", long: "May" },
  { id: 5, short: "Jun", long: "June" },
  { id: 6, short: "Jul", long: "July" },
  { id: 7, short: "Aug", long: "August" },
  { id: 8, short: "Sep", long: "September" },
  { id: 9, short: "Oct", long: "October" },
  { id: 10, short: "Nov", long: "November" },
  { id: 11, short: "Dec", long: "December" },
];

export interface MonthStruct {
  id: string;
  start: Date;
  end: Date;
}

export const parseCalStart = (dayOneWeekDay: number) => {
  switch (dayOneWeekDay) {
    case 0:
      return "col-start-1";
    case 1:
      return "col-start-2";
    case 2:
      return "col-start-3";
    case 3:
      return "col-start-4";
    case 4:
      return "col-start-5";
    case 5:
      return "col-start-6";
    case 6:
      return "col-start-7";

    default:
      return "col-start-7";
  }
};

export const getWeeksInMonth = (year: number, month: number) => {
  const weeks = [];
  const firstDay: Date = new Date(year, month, 1);
  const lastDay: Date = new Date(year, month + 1, 0);

  const daysInMonth: number = lastDay.getDate();
  let dayOfWeek: number = firstDay.getDay();
  let start = firstDay.getDate();
  let end: number;

  console.log(
    `First Date is ${firstDay}, dayofweek is ${firstDay.getDay()} start is ${start}`
  );

  for (let i = 1; i < daysInMonth + 1; i++) {
    if (dayOfWeek === 0 || i === 1) {
      start = i;
      console.log(`Start is ${dayOfWeek} date is `);
    }

    if (dayOfWeek === 6 || i === daysInMonth) {
      end = i;
      console.log(`End is ${i}`);

      if (start !== end) {
        weeks.push({
          start: start,
          end: end,
        });
      }
    }

    dayOfWeek = new Date(year, month, i).getDay();
  }

  console.log(weeks);
  return weeks;
};

export const dayOfWeek = (day: number) => {
  let dayConfig = {
    dayString: "",
    startCol: 0,
  };

  switch (day) {
    case 0:
      dayConfig = {
        dayString: "Su",
        startCol: 0,
      };
      break;
    case 1:
      dayConfig = {
        dayString: "Mo",
        startCol: 1,
      };
      break;
    case 2:
      dayConfig = {
        dayString: "Tu",
        startCol: 2,
      };
      break;
    case 3:
      dayConfig = {
        dayString: "We",
        startCol: 3,
      };
      break;
    case 4:
      dayConfig = {
        dayString: "Th",
        startCol: 4,
      };
      break;
    case 5:
      dayConfig = {
        dayString: "Fr",
        startCol: 5,
      };
      break;
    case 6:
      dayConfig = {
        dayString: "Sa",
        startCol: 6,
      };
      break;

    default:
      break;
  }

  return dayConfig;
};

export const checkIfDateInRange = (start: Date, end: Date, testDate: Date) => {
  return (
    testDate.getDate() >= start.getDate() && testDate.getDate() <= end.getDate()
  );
};

export enum DATE_OPTIONS {
  full,
  short,
  dMY,
  dM,
}

export const formatDate = (date: Date, options: DATE_OPTIONS) => {
  let _options: Intl.DateTimeFormatOptions = {};
  switch (options) {
    case DATE_OPTIONS.full:
      _options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      break;

    case DATE_OPTIONS.short:
      _options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      break;

    case DATE_OPTIONS.dMY:
      _options = {
        // weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      break;
    case DATE_OPTIONS.dM:
      _options = {
        month: "short",
        day: "numeric",
      };
      break;

    default:
      break;
  }
  // let options: Intl.DateTimeFormatOptions = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // };
  return date.toLocaleDateString("en-CA", _options);
};

export const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const MONTHS_AS_STRING = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const compareDates = (dateA: Date, dateB: Date) => {
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
