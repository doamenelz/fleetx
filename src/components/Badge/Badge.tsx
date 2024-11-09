import { FC } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
export enum STATUS_COLORS {
  success = "success",
  pending = "warning",
  declined = "error",
  regular = "regular",
}

export const StatusBadge: FC<{
  label: string;
  /** Always transpose the status from the API contract into one of these based on the context/stage */
  statusType: STATUS_COLORS;
  style?: "text" | "default";
}> = (props) => {
  return (
    <>
      {props.statusType === STATUS_COLORS.success && (
        <span
          className={classNames(
            "inline-flex capitalize items-center text-xs  text-green-700 ",
            props.style === "default" || props.style === undefined
              ? "px-2 py-1 font-medium rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20"
              : ""
          )}
        >
          {props.label}
        </span>
      )}

      {props.statusType === STATUS_COLORS.declined && (
        <span className="inline-flex capitalize items-center px-2 py-1 text-xs  text-red-700 rounded-md bg-red-50 ring-1 ring-inset ring-red-600/10">
          {props.label}
        </span>
      )}

      {props.statusType === STATUS_COLORS.pending && (
        <span className="inline-flex capitalize items-center px-2 py-1 text-xs  text-yellow-800 rounded-md bg-yellow-50 ring-1 ring-inset ring-yellow-600/20">
          {props.label}
        </span>
      )}
      {props.statusType === STATUS_COLORS.regular && (
        <span className="inline-flex capitalize items-center px-2 py-1 text-xs  text-slate-800 rounded-md bg-indigo-100/20 ring-1 ring-inset ring-indigo-600/20">
          {props.label}
        </span>
      )}
    </>
  );
};
