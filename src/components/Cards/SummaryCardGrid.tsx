import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";

const stats = [
  {
    name: "Total Employees",
    value: "$405,091.00",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Total Payroll",
    value: "$12,787.00",
    change: "+54.02%",
    changeType: "negative",
  },
  {
    name: "Gender Distribution",
    value: "$245,988.00",
    change: "-1.39%",
    changeType: "positive",
  },
  {
    name: "Wellness Score",
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative",
  },
];

export interface SummaryCardObject {
  name: string;
  value: string;
  change: string;
  changeType: "negative" | "positive" | "neutral";
}

export const sampleStats: SummaryCardObject[] = [
  {
    name: "Current Employees",
    value: "520",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Last Payroll",
    value: "NGN 23.45m",
    change: "+2.66%",
    changeType: "positive",
  },
  {
    name: "Average Age",
    value: "38.6 years",
    change: "-2%",
    changeType: "neutral",
  },
  {
    name: "Employee Wellness Score",
    value: "94",
    change: "+1",
    changeType: "positive",
  },
];
export const SummaryCardHeader: FC<{ stats: SummaryCardObject[] }> = ({
  stats,
}) => {
  return (
    // <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
    <dl className="mx-auto lg:flex grid grid-cols-1 gap-px divide-x sm:grid-cols-2 justify-evenly border-b">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap w-full items-baseline justify-between gap-x-4  bg-white px-4 py-4 sm:px-6 xl:px-8"
        >
          <dt className="text-xs font-medium leading-6 text-gray-500">
            {stat.name}
          </dt>
          {/* <dd
            className={classNames(
              stat.changeType === "negative"
                ? "text-rose-600"
                : stat.changeType === "positive"
                ? "text-green-700"
                : "text-gray-700",

              "text-xs font-medium"
            )}
          >
            {stat.change}
          </dd> */}

          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-slate-700">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
