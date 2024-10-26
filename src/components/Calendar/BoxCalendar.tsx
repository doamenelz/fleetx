import { FC } from "react";

import { BoxCalendarControl } from "./BoxCalendarControl";
import { GRID_TYPE, GridLayout } from "../Layout";

export const BoxCalendar: FC<{
  calendarContent?: JSX.Element;
}> = ({ calendarContent }) => {
  /**
   *
   * TODO: Today not auto-selecting Date
   * TODO: Date picker  */
  return (
    <div className="">
      <GridLayout type={GRID_TYPE.twoCol}>
        <div>
          <BoxCalendarControl />
        </div>

        {calendarContent}
      </GridLayout>
    </div>
  );
};
