import { FC } from "react";
import { TipDirection } from "./Tooltip.types";
export const ToolTip: FC<{
  label: string | JSX.Element;
  direction: TipDirection;
}> = ({ label, direction }) => {
  return (
    <span className="absolute hidden group-hover:block rounded-md text-gray-600 w-full border border-gray-200 bg-gray-900 shadow-lg shadow-gray-200 -top-8 left-3 z-50 opacity-0 transition-opacity group-hover:opacity-100">
      <div className="relative mx-2">
        <div className=" text-gray-100 text-xs rounded py-1 px-4 right-0 bottom-full">
          {direction === TipDirection.center && (
            <svg
              className="absolute text-gray-900 h-2 w-full left-0 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
              //   xml:space="preserve"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          )}
          {direction === TipDirection.right && (
            <svg
              className="absolute text-black h-2 right-0 mr-3 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          )}
          {direction === TipDirection.left && (
            <svg
              className="absolute text-black h-2 left-0 ml-3 top-full w-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          )}

          {label}
        </div>
      </div>
    </span>
  );
};
