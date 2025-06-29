export const getCalendarColumnStart = (date: Date) => {
  const dayOfWeek = date.getDay();
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
