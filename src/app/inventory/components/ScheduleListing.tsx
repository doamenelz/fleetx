import {
  Button,
  BUTTON_SKIN,
  CopyLoader,
  EmptyTable,
  ICON_POSITION,
} from "@/components";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { SCHEDULE_TYPES, ScheduleEntry } from "@/models/ScheduleEntry";
import clsx from "clsx";
import { PackageOpen, Redo, TriangleAlert } from "lucide-react";
import { FC } from "react";

export const getScheduleColor = (type: string) => {
  switch (type) {
    case "payment":
      return "bg-brand-orangeHabanero";
    case SCHEDULE_TYPES.SERVICE:
      return "bg-brand-kabuki";
    case SCHEDULE_TYPES.INSPECTION:
      return "bg-brand-orangeHabanero";
    case SCHEDULE_TYPES.RENEWAL:
      return "bg-brand-vistaBlue";
    case "others":
      return "bg-indigo-900";
    default:
      return "bg-indigo-900";
  }
};

//Service&Repairs,Renewals,Inspection,Payments,Others

const ScheduleCell: FC<{ data: ScheduleEntry }> = ({ data }) => {
  return (
    <li className="py-4 sm:flex justify-between text-xs ">
      <div className="text-left space-y-1">
        <div className="flex items-center gap-1">
          <div
            className={clsx(
              "h-2 rounded-full w-2",
              getScheduleColor(data.type)
            )}
          ></div>
          <time
            dateTime="2022-01-19"
            className={clsx(
              "flex-none font-light text-xs text-left capitalize"
            )}
          >
            {data.type}
          </time>
        </div>
        <p className=" text-brand-indiGlow font-medium sm:mt-0">{data.name}</p>
        <div className="capitalize text-[10px]">{data.status}</div>
      </div>
      <p className="flex-none sm:ml-6 text-slate-600 text-xs font-light">
        {formatDate(new Date(data.date), DATE_OPTIONS.dMY)}
      </p>
    </li>
  );
};

export const ScheduleList: FC<{
  schedules: ScheduleEntry[];
  isLoading: boolean;
  isSuccess: boolean;
  getSchedules: () => void;
}> = ({ schedules, isLoading, isSuccess, getSchedules }) => {
  return (
    <div className="px-4 border-l">
      <p className="text-slate-700 text-left pl-2 text-sm font-semibold">
        Scheduled Activities
      </p>
      {isLoading && <CopyLoader />}
      {!isLoading && !isSuccess && (
        <EmptyTable
          title="Something went wrong"
          image={
            <div>
              <TriangleAlert className="size-8 mx-auto text-error-400" />
            </div>
          }
          action={
            <Button
              onClick={getSchedules}
              label="Retry"
              skin={BUTTON_SKIN.secondary}
              icon={{
                asset: <Redo className="size-3" />,
                position: ICON_POSITION.trailing,
              }}
            />
          }
        />
      )}
      {!isLoading && isSuccess && schedules.length === 0 && (
        <EmptyTable
          title="Nothing scheduled"
          image={
            <div>
              <PackageOpen className="size-8 mx-auto text-gray-400" />
            </div>
          }
        />
      )}
      {!isLoading && isSuccess && schedules.length > 0 && (
        <ol className="divide-y border-c-mid pl-2">
          {schedules.map((schedule) => (
            <ScheduleCell
              data={schedule}
              key={schedule.id}
            />
          ))}
        </ol>
      )}
    </div>
  );
};
