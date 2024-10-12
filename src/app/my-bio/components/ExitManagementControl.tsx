import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";

export const ExitManagementLeadCTA: FC<{
  title: string;
  copy: string;
  completedText: string;
  pendingText: string;
  isCompleted: boolean;
  onClick: Function;
  cta?: React.ReactNode;
}> = (props) => {
  return (
    <div
      className={classNames(
        props.isCompleted ? "border-indigo-700" : "border-indigo-200",
        "py-4 pl-4 space-y-2 border-l-4"
      )}
    >
      <p className="text-sm font-medium text-slate-900">{props.title}</p>
      <p className="text-xs font-light text-slate-600">{props.copy}</p>

      {/* <button
        onClick={() => onclick}
        disabled={props.isCompleted}
        className={`${
          props.isCompleted ? "text-success-700" : "text-primary-900"
        } flex items-center gap-1 text-xs font-normal`}
      >
        {props.isCompleted ? props.completedText : props.pendingText}
        <span>
          {props.isCompleted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          )}
        </span>
      </button> */}

      {props.cta}
    </div>
  );
};
