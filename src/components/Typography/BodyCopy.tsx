import clsx from "clsx";
import { TextProps } from "./Text.types";

export const BodyCopy = ({ copy, isLight, copyStyle }: TextProps) => {
  return (
    <>
      <p
        className={clsx(
          copyStyle
            ? copyStyle
            : isLight
            ? "font-normal text-xs text-gray-900 leading-5"
            : "font-medium text-gray-900 text-sm leading-5"
        )}
      >
        {copy}
      </p>
    </>
  );
};
