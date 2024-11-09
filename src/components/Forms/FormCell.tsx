import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";

export const FormCell: FC<{ children: JSX.Element; span?: "full" }> = ({
  children,
  span,
}) => {
  return (
    <dd
      className={classNames(
        "mt-1 text-xs text-gray-700 sm:mt-0",
        span === "full" ? "col-span-2" : ""
      )}
    >
      {children}
    </dd>
  );
};
