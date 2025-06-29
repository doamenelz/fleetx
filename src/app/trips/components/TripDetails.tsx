"use client";
import ReactDOM from "react-dom";
import {
  Accordion,
  Avatar,
  AVATAR_SIZES,
  Button,
  Lbl,
  ListTable,
  ListTableData,
  SectionHeader,
  SlideOutWrapper,
  StatusBadge,
} from "@/components";
import { Trip } from "@/models";

import { FC, useState } from "react";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { AddNewTrip } from "./AddNewTrip";
//TODO: Add Vehicle Cell and Extend to View Vehicle information
export const TripDetails: FC<{ trip: Trip }> = ({ trip }) => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };

  const parseDetailsView = () => {
    var _data: ListTableData[] = [];
    const base = [
      {
        id: "01",
        key: "Name",
        value: trip?.name,
      },
      {
        id: "02",
        key: "Description",
        value: trip?.description,
      },
      {
        id: "03",
        key: "Class",
        value: <p className="capitalize">{trip?.tripClass}</p>,
      },
      {
        id: "04",
        key: "Status",
        value: (
          <StatusBadge
            label={trip?.status ?? ""}
            style="text"
            showDot
          />
        ),
      },
      {
        id: "05",
        key: "Pickup Location | Time",
        value: `${trip?.pickupLocation.line1} | ${formatDate(
          new Date(trip?.pickupTime!),
          DATE_OPTIONS.short
        )}`,
      },
      {
        id: "11",
        key: "Drop off Location",
        value: trip?.dropOffLocation.line1,
      },
      {
        id: "06",
        key: "Requested Seats",
        value: `${trip?.requestedSeats}`,
      },
      {
        id: "09",
        key: "Additional Notes",
        value: trip?.additionalNotes,
      },
    ];
    base.map((item) => _data.push(item));
    // serviceDetails?.serviceDetails?.map((item) => _data.push(item));

    return _data;
  };

  return (
    <div className="px-4 py-2">
      <SectionHeader
        title={`Trip # - ${trip?.id}`}
        button={
          <Button
            label="Edit"
            onClick={() => setShowModal(true)}
          />
        }
      />
      <Accordion
        title={"Trip Details"}
        copy={`Last Updated: ${formatDate(
          new Date(trip?.lastUpdatedAt!),
          DATE_OPTIONS.short
        )}`}
        id=""
        style="section"
        defaultOpen={true}
        body={<ListTable data={parseDetailsView()} />}
      />

      {trip?.otherDetails && (
        <Accordion
          title={"Other Information"}
          id=""
          style="section"
          body={
            <div className="">
              <ListTable
                data={[
                  {
                    id: "013",
                    key: "Driver",
                    value: (
                      <div className="flex gap-2 items-center">
                        <Avatar
                          size={AVATAR_SIZES.sm}
                          firstName={trip?.otherDetails?.driver.firstName}
                          lastName={trip?.otherDetails?.driver.lastName}
                          imageUrl={trip?.otherDetails?.driver.avatar}
                        />
                        <div className="space-y-0">
                          <Lbl
                            label={trip.otherDetails.driver.name}
                            labelStyle="text-xs font-semibold"
                          />
                          <Lbl
                            label={`ID: ${trip.otherDetails.driver.id} | Phone: ${trip.otherDetails.driver.phone}`}
                          />
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "014",
                    key: "Vehicle",
                    value: <div></div>,
                  },
                ]}
              />
            </div>
          }
        />
      )}

      {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="max-w-7xl"
          enableModalDismiss
        >
          <div className="px-4 py-2">
            <AddNewTrip
              dismiss={showModalHandler}
              trip={trip}
            />
          </div>
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </div>
  );
};
