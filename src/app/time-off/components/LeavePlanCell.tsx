import { FC } from "react";
import { TimeOffDetails } from "../models/TimeOff";
import { Icon, ICON_SIZES } from "@/components/Icons";
import { IconList } from "@/assets/IconList";
import { StatusBadge, STATUS_COLORS } from "@/components";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
export const LeavePlanCell: FC<{
  timeOff: TimeOffDetails;
  onClick: Function;
}> = ({ timeOff, onClick }) => {
  let _status: STATUS_COLORS = STATUS_COLORS.success;
  switch (timeOff.approvalStatus) {
    case "Approved":
      _status = STATUS_COLORS.success;
      break;
    case "Pending":
      _status = STATUS_COLORS.pending;
      break;
    case "Declined":
      _status = STATUS_COLORS.declined;
      break;

    default:
      break;
  }
  return (
    <button
      onClick={() => onClick()}
      // to="#."
      // onClick={() => setShowModal(true)}
      className="text-left text-sm px-2 w-full py-4 font-semibold text-primary-700 hover:text-primary-900 hover:bg-slate-50"
    >
      <p className="flex gap-2 md:justify-between items-center">
        {timeOff.name}
        <StatusBadge statusType={_status} label={timeOff.approvalStatus} />
      </p>

      <p className="md:mt-1 mt-3 text-xs text-gray-600 font-normal">
        {formatDate(new Date(timeOff.startDate), DATE_OPTIONS.full)} -{" "}
        {formatDate(new Date(timeOff.endDate), DATE_OPTIONS.full)} |{" "}
        {timeOff.numberOfDays} day(s)
      </p>
    </button>
  );
};
