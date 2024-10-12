import { FC, useState } from "react";
import { TimeOffDetails } from "../models/TimeOff";
import { Icon, ICON_SIZES } from "@/components/Icons";
import { IconList } from "@/assets/IconList";
import {
  StatusBadge,
  STATUS_COLORS,
  ModalBackdrop,
  SlideOutWrapper,
  BodyCopy,
} from "@/components";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
import { TimeOffDetailsView } from "./TimeOffDetails";
export const ActiveUpcomingLeave: FC<{
  timeOff: TimeOffDetails;
}> = ({ timeOff }) => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        // to="#."
        // onClick={() => setShowModal(true)}
        className="flex gap-2 px-2 py-4  group w-full border border-l-4 border-l-indigo-700 border-slate-200  text-slate-500 hover:text-primary-900 hover:shadow-lg hover:shadow-gray-100 bg-white"
      >
        <Icon icon={IconList.calendarDays} size={ICON_SIZES.lg} />
        <div className="text-left text-sm font-semibold text-primary-700 group-hover:text-primary-900">
          <StatusBadge
            statusType={STATUS_COLORS.regular}
            label="Upcoming Time Off"
          />
          <div className="mt-2">
            <BodyCopy text={timeOff.name} style="text-primary-900" />
            <p className="mt-1 text-xs text-gray-600 font-normal">
              {formatDate(new Date(timeOff.startDate), DATE_OPTIONS.full)} -{" "}
              {formatDate(new Date(timeOff.endDate), DATE_OPTIONS.full)} |{" "}
              {timeOff.numberOfDays} day(s)
            </p>
          </div>
        </div>
      </button>
      <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size={"lg"}
        >
          <TimeOffDetailsView id="1" />
        </SlideOutWrapper>
      </ModalBackdrop>
    </>
  );
};
