import { IconList } from "@/assets/IconList";
import { Lbl } from "@/components";
import { ICON_SIZES, Icon } from "@/components/Icons";
import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";

/** Summary Card that uses a Main Copy (string), and a Label Component / String. Used to highlight a single data point */
export const SCMainRowSingle: FC<{
  title: string;
  main: string;
  copy: string | JSX.Element;
}> = ({ title, main, copy }) => {
  return (
    <div className="px-4 py-4 bg-white border rounded-md sm:px-6 space-y-1 shadow-sm relative">
      <Lbl label={title} />
      <div className="justify-between flex-col">
        <p className="text-3xl font-semibold">{main}</p>
        {typeof copy === "string" ? <Lbl label={copy} /> : copy}
      </div>
    </div>
  );
};

export const SCSideBySide: FC<{
  title: string;
  lhs: string | JSX.Element;
  rhs: string | JSX.Element;
  copy?: string;
  isEqual?: boolean;
}> = ({ title, lhs, rhs, copy, isEqual }) => {
  return (
    <div className="px-4 py-4 bg-white border rounded-md sm:px-6 space-y-2 relative shadow-sm">
      <Lbl label={title} />

      {typeof lhs === "string" ? (
        <div
          className={classNames(
            isEqual ? "grid grid-cols-2" : "flex items-center divide-x",
            ""
          )}
        >
          <p className="text-3xl font-semibold border-r ">{lhs}</p>
          <p className="pl-4 text-3xl font-semibold">{rhs}</p>
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
        <p className="bottom-4 text-xs font-light tracking-tighter text-slate-700">
          {copy}
        </p>
      )}
    </div>
  );
};
