import { BodyCopy, Lbl, SlideOutWrapper, StatusBadge } from "@/components";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { VehicleService } from "@/models/Vehicle/VehicleService";
import { Bolt, MailboxIcon } from "lucide-react";
import { FC, useState } from "react";
import ReactDOM from "react-dom";
import { ServiceDetails } from "./ServiceDetails";
import { sampleServiceReminders } from "@/models/ServiceAndRecalls/Service";

export const ServiceInboxCell: FC<{ service: VehicleService }> = ({
  service,
}) => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="flex p-4 gap-4 ">
        <div className="flex items-center justify-center size-16 rounded-md bg-gradient-to-tl from-gray-25 via-gray-50 to-gray-100">
          <Bolt className="size-6 text-gray-500" />
        </div>
        <div className="space-y-1">
          <button
            className=""
            onClick={() => setShowModal(true)}
          >
            <BodyCopy
              copy={service.name}
              copyStyle="text-xs hover:text-primary-600 font-medium text-primary-900"
            />
          </button>

          <Lbl
            label={`Service #: ${service.id}`}
            labelStyle="text-xs text-gray-700 block "
          />
          <Lbl
            label={`Service Date: ${formatDate(
              new Date(service.scheduledDate),
              DATE_OPTIONS.short
            )}`}
            labelStyle="text-xs text-gray-500 block"
          />

          <StatusBadge
            label={service.status}
            style="text"
            showDot
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
          <ServiceDetails serviceId={sampleServiceReminders[0].id} />
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </>
  );
};
