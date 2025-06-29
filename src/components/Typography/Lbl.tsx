import clsx from "clsx";
import { TextProps } from "./Text.types";

export const Lbl = ({
  label,
  textAlign = "text-left",
  labelComponent,
  required = false,
  isLight = false,
  labelStyle = "text-xs block",
}: TextProps) => {
  return (
    <label
      htmlFor={label}
      className={clsx(
        labelStyle
          ? labelStyle
          : isLight
          ? "font-normal text-xs text-gray-900"
          : "font-medium text-gray-900 text-sm",
        textAlign
      )}
    >
      {label && label}
      {required && <span className="text-red-600">*</span>}
      {labelComponent && <span>{labelComponent}</span>}
    </label>
  );
};
