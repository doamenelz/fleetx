import { BodyCopy, Lbl, SlideOutWrapper, StatusBadge } from "@/components";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { CircleOff } from "lucide-react";
import { FC, useState } from "react";
import ReactDOM from "react-dom";
import { sampleServiceReminders } from "@/models/ServiceAndRecalls/Service";
import { VehicleFault } from "@/models";
import { FaultDetails } from "./FaultDetails";

export const FaultInboxCell: FC<{ fault: VehicleFault }> = ({ fault }) => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="flex p-4 gap-4 ">
        <div className="flex items-center justify-center size-16 rounded-md bg-gradient-to-tl from-gray-25 via-gray-50 to-gray-100">
          <CircleOff className="size-6 text-gray-500" />
        </div>
        <div className="space-y-1">
          <button
            className=""
            onClick={() => setShowModal(true)}
          >
            <BodyCopy
              copy={fault.name}
              copyStyle="text-xs hover:text-primary-600 font-medium text-primary-900"
            />
          </button>

          <Lbl
            label={`Fault #: ${fault.id}`}
            labelStyle="text-xs text-gray-700 block "
          />
          <Lbl
            label={`Created Date: ${formatDate(
              new Date(fault.createdAt),
              DATE_OPTIONS.short
            )}`}
            labelStyle="text-xs text-gray-500 block"
          />

          <StatusBadge
            label={fault.status}
            // style="text"
          />
        </div>
      </div>
      {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="max-w-lg"
          enableModalDismiss
        >
          <FaultDetails fault={fault} />
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </>
  );
};
