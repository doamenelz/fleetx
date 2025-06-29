import clsx from "clsx";
import { BadgeProps } from "./Badge.types";

const parseStatusTheme = (status: string) => {
  switch (status) {
    case "pending":
      return {
        bgColor: "bg-yellow-100",
        labelColor: "text-yellow-700",
        ringColor: "ring-yellow-600/20",
        label: "Pending",
        dotColor: "bg-yellow-600",
      };
    case "high":
      return {
        bgColor: "bg-error-100",
        labelColor: "text-error-700",
        ringColor: "ring-error-600/20",
        label: "High",
        dotColor: "bg-error-600",
      };
    case "completed":
      return {
        bgColor: "bg-green-100",
        labelColor: "text-green-700",
        ringColor: "ring-green-600/20",
        label: "Completed",
        dotColor: "bg-green-600",
      };
    case "approved":
      return {
        bgColor: "bg-green-100",
        labelColor: "text-green-700",
        ringColor: "ring-green-600/20",
        label: "Completed",
        dotColor: "bg-green-600",
      };
    case "scheduled":
      return {
        bgColor: "bg-blue-100",
        labelColor: "text-blue-700",
        ringColor: "ring-blue-600/20",
        label: "Completed",
        dotColor: "bg-blue-600",
      };
    case "new":
      return {
        bgColor: "bg-blue-100",
        labelColor: "text-blue-700",
        ringColor: "ring-blue-600/20",
        label: "Completed",
        dotColor: "bg-blue-600",
      };
    case "cancelled":
      return {
        bgColor: "bg-gray-100",
        labelColor: "text-gray-700",
        ringColor: "ring-gray-400",
        label: "Completed",
        dotColor: "bg-gray-600",
      };
    case "declined":
      return {
        bgColor: "bg-error-100",
        labelColor: "text-error-700",
        ringColor: "ring-error-600/20",
        label: "Declined",
        dotColor: "bg-error-600",
      };
    default:
      return {
        bgColor: "bg-green-100",
        labelColor: "text-green-700",
        ringColor: "ring-green-600/20",
        label: "Completed",
        dotColor: "bg-green-600",
      };
  }
};
export const StatusBadge = ({
  label,
  bgColor,
  labelColor,
  style = "default",
  showDot,
  dotColor,
  ringColor,
}: BadgeProps) => {
  const _parseStatusTheme = parseStatusTheme(label);
  return (
    <span
      className={clsx(
        "inline-flex capitalize items-center font-medium text-xs px-2 py-1 ",
        labelColor !== undefined ? labelColor : _parseStatusTheme.labelColor,
        style === "default" &&
          `ring-1 ring-inset rounded-md ${
            bgColor ? bgColor : _parseStatusTheme.bgColor
          } ${ringColor! ? ringColor : _parseStatusTheme.ringColor}`,
        showDot && "gap-1"
      )}
    >
      {showDot && (
        <div
          className={clsx(
            "size-1.5 rounded-full",
            dotColor ? dotColor : _parseStatusTheme.dotColor
          )}
        ></div>
        // <svg
        //   viewBox="0 0 6 6"
        //   aria-hidden="true"
        //   className={clsx(
        //     "size-1.5 rounded-full ",
        //     dotColor ? dotColor : _parseStatusTheme.dotColor
        //   )}
        // >
        //   {/* <circle
        //     r={3}
        //     cx={3}
        //     cy={3}
        //   /> */}
        // </svg>
      )}
      {label}
    </span>
  );
};
