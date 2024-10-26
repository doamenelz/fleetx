import { STATUS_COLORS, StatusBadge } from "@/components";
import { classNames } from "@/lib/utilities/helperFunctions";
import { sampleVehicleReminders, VehicleReminders } from "@/models";
import { FC } from "react";

export const getScheduleColor = (type: string) => {
  switch (type) {
    case "payment":
      return "bg-brand-orangeHabanero";
    case "service":
      return "bg-brand-kabuki";
    case "inspection":
      return "bg-brand-tan";
    case "renewals":
      return "bg-brand-vistaBlue";
    case "others":
      return "bg-indigo-900";
    default:
      return "bg-indigo-900";
  }
};

//Service&Repairs,Renewals,Inspection,Payments,Others

const ScheduleCell: FC<{ data: VehicleReminders }> = ({ data }) => {
  return (
    <li className="py-4 sm:flex justify-between text-xs ">
      <div className="text-left space-y-1">
        <div className="flex items-center gap-1">
          <div
            className={classNames(
              "h-2 rounded-full w-2",
              getScheduleColor(data.type)
            )}
          ></div>
          <time
            dateTime="2022-01-19"
            className={classNames(
              "flex-none font-light text-xs text-left capitalize"
            )}
          >
            {data.type}
          </time>
        </div>
        <p className=" text-brand-indiGlow font-medium sm:mt-0">
          {data.reminderId}
        </p>
        <div className="capitalize text-[10px]">{data.status}</div>
      </div>
      <p className="flex-none sm:ml-6 text-slate-600 text-xs font-light">
        {data.startTime}{" "}
        {data.endTime != "" && data.endTime != undefined && `- ${data.endTime}`}
      </p>
    </li>
  );
};

export const ScheduleList: FC<{}> = () => {
  return (
    <div className="px-4 border-l">
      <p className="text-slate-700 text-left pl-2 text-sm font-semibold">
        Scheduled Activities
      </p>
      <ol className="divide-y border-c-mid pl-2">
        {sampleVehicleReminders.map((reminder) => (
          <ScheduleCell
            data={reminder}
            key={reminder.id}
          />
        ))}
      </ol>
    </div>
  );
};
