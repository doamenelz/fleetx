import { BodyCopy, Lbl, SlideOutWrapper, StatusBadge } from "@/components";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { createSampleTrip, Trip } from "@/models";
import { Armchair, Map } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { TripDetails } from "./TripDetails";

export const TripInboxCell: FC<{ trip: Trip }> = ({ trip }) => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex p-4 gap-4 ">
        <div className="flex items-center justify-center size-16 rounded-md bg-gradient-to-tl from-gray-25 via-gray-50 to-gray-100">
          <Map className="size-6 text-gray-500" />
        </div>
        <div className="space-y-1">
          <button
            className=""
            onClick={() => setShowModal(true)}
          >
            <BodyCopy
              copy={trip.name}
              copyStyle="text-xs hover:text-primary-600 font-medium text-primary-900"
            />
          </button>

          <Lbl
            label={`${formatDate(
              new Date(trip.pickupDay),
              DATE_OPTIONS.short
            )} - ${trip.pickupTime} | ${trip.pickupLocation.line1} -> ${
              trip.dropOffLocation.line1
            }`}
            labelStyle="text-xs text-gray-700 block "
          />

          <Lbl
            labelComponent={
              <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center">
                  <Armchair className="size-3" />
                  <p>{trip.requestedSeats}</p>
                </div>
                <p className="capitalize border-l pl-2">{trip.tripClass}</p>
              </div>
            }
            labelStyle="text-xs text-gray-700 block "
          />

          <StatusBadge
            label={trip.status}
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
          <TripDetails trip={trip} />
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </>
  );
};
``;
