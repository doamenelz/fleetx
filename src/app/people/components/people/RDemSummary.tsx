"use client";

import { IconList } from "@/assets/IconList";
import { AnalyticsMainCopy, Lbl, TextLabel } from "@/components";
import { ICON_SIZES, Icon } from "@/components/Icons";
import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";

export const RDemSummary = () => {
  return (
    <div className="rounded-md px-4 py-2 h-full space-y-2 bg-slate-50/50 border-cLight ">
      <TextLabel label="" copy={"Overview"} />
      <div className="divide-y">
        <BasicCell
          title="Total Employees"
          main="520"
          copy={
            <div className="text-xs font-semibold pr-1 text-red-700 pt-2 flex gap-1 ">
              <Icon icon={IconList.arrowDown} size={ICON_SIZES.sm} />
              19 Employees
              <span className="font-light">
                <Lbl label=" have exited since May 2023" />
              </span>
            </div>
          }
        />
        <BasicCell
          title="Average Age"
          main="44.2 years"
          copy={
            <div className="text-xs font-semibold pr-1 text-green-700 pt-2 flex gap-1 ">
              <Icon icon={IconList.trendArrowUp} size={ICON_SIZES.sm} />
              1.5 years{" "}
              <span className="text-xs text-slate-600 font-light">
                (May 2023)
              </span>
            </div>
          }
        />
        <SBSCell
          title="Gender distribution"
          lhs={
            <div className="space-y-0 flex items-baseline gap-1">
              <AnalyticsMainCopy text="78%" />
              <span className="font-light text-slate-900">
                <Lbl label="(Male)" />
              </span>
            </div>
          }
          rhs={
            <div className="space-y-0 flex items-baseline gap-1 pl-4">
              <AnalyticsMainCopy text="22%" />
              <span className="font-light text-slate-900">
                <Lbl label="(Female)" />
              </span>
            </div>
          }
          copy={""}
          isEqual
        />
        {/* <BasicCell
          title="Average Length of Service"
          main="2.5 years"
          copy={
            <p className="text-xs font-semibold pr-1 text-green-700 pt-2 flex gap-1">
              <Icon icon={IconList.trendArrowDown} size={ICON_SIZES.sm} />
              2.45%
              <span className="font-light">
                <Lbl label="Ave Attrition Rate per Quarter" />
              </span>
            </p>
          }
        /> */}
        <BasicCell
          title="Largest Geopolitical Zone"
          main="South West"
          copy={
            <div className="text-xs font-semibold pr-1 text-green-700 pt-2 flex gap-1 ">
              <Icon icon={IconList.arrowUp} size={ICON_SIZES.sm} />8 Employees
              <span className="text-xs text-slate-600 font-light">
                increase since May 2023
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
};

const BasicCell: FC<{
  title: string;
  main: string;
  copy: string | JSX.Element;
}> = ({ title, main, copy }) => {
  return (
    <div className=" space-y-1 py-4">
      <Lbl label={title} />
      <div className="justify-between flex-col">
        <AnalyticsMainCopy text={main} />
        {typeof copy === "string" ? <Lbl label={copy} /> : copy}
      </div>
    </div>
  );
};

const SBSCell: FC<{
  title: string;
  lhs: string | JSX.Element;
  rhs: string | JSX.Element;
  copy?: string;
  isEqual?: boolean;
}> = ({ title, lhs, rhs, copy, isEqual }) => {
  return (
    <div className="space-y-1 py-4">
      <Lbl label={title} />

      {typeof lhs === "string" ? (
        <div
          className={classNames(
            isEqual ? "grid grid-cols-2" : "flex items-center divide-x",
            ""
          )}
        >
          <AnalyticsMainCopy text={lhs} />
          <p className="pl-4 text-3xl font-medium">{rhs}</p>
        </div>
      ) : (
        <div
          className={classNames(
            isEqual
              ? "grid grid-cols-2 divide-x"
              : "flex items-center divide-x-2",
            ""
          )}
        >
          {lhs}
          {rhs}
        </div>
      )}
      {copy && (
        <p className="bottom-4 text-xs font-light  text-slate-700">{copy}</p>
      )}
    </div>
  );
};
