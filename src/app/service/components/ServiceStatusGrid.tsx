"use client";

import clsx from "clsx";
import { FC } from "react";

export const ServiceStatusGrid: FC<{
  data: { label: string; value: string }[];
}> = ({ data }) => {
  return (
    <dl className="mx-auto my-2 lg:flex grid grid-cols-1 gap-px divide-x sm:grid-cols-2 justify-evenly border">
      {data.map((stat, index) => (
        <div
          key={index}
          className="flex flex-wrap w-full items-baseline justify-between gap-x-4  bg-white px-4 py-4 sm:px-6 xl:px-8"
        >
          <dt className="text-xs font-medium leading-6 text-gray-500">
            {stat.label}
          </dt>

          <dd
            className={clsx(
              "w-full flex-none text-3xl font-medium leading-10 tracking-tight ",
              stat.label === "Overdue" && Number(stat.value) > 0
                ? " text-red-700"
                : "text-slate-700"
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
