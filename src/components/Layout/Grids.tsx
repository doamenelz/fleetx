import { FC } from "react";
import { GridProps, GRID_TYPE } from "./Grids.types";

export const GridLayout: FC<GridProps> = ({
  children,
  lhs,
  rhs,
  type,
  verticalPadding,
}) => {
  let classStyle = `${verticalPadding && "py-2"}`;
  switch (type) {
    case GRID_TYPE.twoCol:
      classStyle = "grid w-full grid-cols-1 gap-6 md:grid-cols-2";
      break;
    case GRID_TYPE.twoOne:
      classStyle = "grid w-full grid-cols-1 gap-8 gap-y-6 lg:grid-cols-3";
      break;
    case GRID_TYPE.oneTwo:
      classStyle = "grid w-full grid-cols-1 sm:gap-4 gap-y-6 lg:grid-cols-3";
      break;
    case GRID_TYPE.oneThree:
      classStyle = "grid w-full grid-cols-1 gap-y-6 sm:grid-cols-3";
      break;
    case GRID_TYPE.threeCol:
      classStyle =
        "grid md:gap-6 space-y-6 md:space-y-0 mx-auto md:grid-cols-2 lg:grid-cols-3";
      break;
    case GRID_TYPE.fourCol:
      classStyle = "grid gap-4 mx-auto md:grid-cols-2 lg:grid-cols-4";
      break;

    default:
      break;
  }
  return (
    <>
      {(type === GRID_TYPE.twoCol ||
        type === GRID_TYPE.threeCol ||
        type === GRID_TYPE.fourCol) && (
        <div className={`${verticalPadding && "my-2"} ${classStyle}`}>
          {children}
        </div>
      )}

      {type === GRID_TYPE.twoOne && (
        <div className={`${verticalPadding && "my-4"} ${classStyle}`}>
          <div className="col-span-2">{lhs}</div>
          <div className="col-span-2 md:col-span-1">{rhs}</div>
        </div>
      )}
      {type === GRID_TYPE.oneTwo && (
        <div className={`${verticalPadding && "my-4"} ${classStyle}`}>
          <div className="col-span-4 lg:col-span-1">{lhs}</div>
          <div className="col-span-4 lg:col-span-2">{rhs}</div>
        </div>
      )}
      {type === GRID_TYPE.oneThree && (
        <div className={`${verticalPadding && "my-4"} ${classStyle}`}>
          <div className="col-span-4 lg:col-span-1">{lhs}</div>
          <div className="col-span-4 lg:col-span-2">{rhs}</div>
        </div>
      )}
    </>
  );
};
