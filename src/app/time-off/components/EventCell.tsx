import { DATE_OPTIONS, addDays, formatDate } from "@/lib/utilities/dateHelpers";
import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";

export enum EVENT_CELL_TYPE {
  company,
  statHoliday,
}

export interface CalendarEvent {
  id: string;
  label: string;
  date: string;
  type: EVENT_CELL_TYPE;
}

export const EventCell: FC<CalendarEvent> = ({ label, date, type }) => {
  return (
    <div
      className={classNames(
        type == EVENT_CELL_TYPE.statHoliday
          ? "p-2 bg-primary-50"
          : "p-2 bg-warning-50"
      )}
    >
      <div className="flex items-center gap-3 text-left">
        <div
          className={classNames(
            "w-2 h-10 rounded-sm",
            type == EVENT_CELL_TYPE.statHoliday
              ? "bg-primary-900"
              : "bg-warning-500"
          )}
        ></div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-900">{label}</p>
          <p className="text-xs text-gray-700">{date}</p>
        </div>
      </div>
    </div>
  );
};

export const EventSection: FC<{
  sectionTitle: string;
  events: CalendarEvent[];
}> = ({ sectionTitle, events }) => {
  return (
    <section id={sectionTitle}>
      <p className="py-1 text-xs text-left text-gray-700">{sectionTitle}</p>
      <ul className="space-y-2">
        {events.map((e) => (
          <li id={e.id} key={e.id}>
            <EventCell
              label={e.label}
              type={
                e.type == EVENT_CELL_TYPE.company
                  ? EVENT_CELL_TYPE.company
                  : EVENT_CELL_TYPE.statHoliday
              }
              date={e.date}
              id={e.id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export const sampleCompanyEvents: CalendarEvent[] = [
  {
    id: "001",
    label: "Performance Appraisals",
    type: EVENT_CELL_TYPE.company,
    date: formatDate(addDays(new Date(), 7), DATE_OPTIONS.full),
  },
];

export const sampleStatHolidays: CalendarEvent[] = [
  {
    id: "001",
    label: "Eid Mubarak",
    type: EVENT_CELL_TYPE.statHoliday,
    date: formatDate(addDays(new Date(), 3), DATE_OPTIONS.full),
  },
  {
    id: "002",
    label: "Workers Day (All Locations)",
    type: EVENT_CELL_TYPE.statHoliday,
    date: formatDate(addDays(new Date(), 10), DATE_OPTIONS.full),
  },
];
