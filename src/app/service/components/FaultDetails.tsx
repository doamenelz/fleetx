"use client";
import ReactDOM from "react-dom";
import {
  Accordion,
  Button,
  ImageCard,
  ListTable,
  ListTableData,
  SectionHeader,
  SlideOutWrapper,
  StatusBadge,
} from "@/components";
import { generateVehicleDetails, VehicleFault } from "@/models";
import { FC, useContext, useState } from "react";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { AddNewFault } from "./AddNewFault";
import { HomeContext } from "@/context/HomeContext";

export const FaultDetails: FC<{ fault: VehicleFault }> = ({ fault }) => {
  const homeContext = useContext(HomeContext);
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };

  const parseDetailsView = () => {
    var _data: ListTableData[] = [];
    const base = [
      {
        id: "",
        key: "Fault Name",
        value: fault?.name,
      },
      {
        id: "",
        key: "Description",
        value: fault?.description,
      },
      {
        id: "",
        key: "Fault Type",
        value: `${fault?.faultType} | ${fault?.faultCode}`,
      },
      {
        id: "",
        key: "Status",
        value: (
          <StatusBadge
            label={fault?.status ?? ""}
            style="text"
            showDot
          />
        ),
      },
      {
        id: "",
        key: "Vehicle #",
        value: fault?.vehicleId,
      },
      {
        id: "",
        key: "Created Date",
        value: formatDate(new Date(fault?.createdAt), DATE_OPTIONS.dMHrs),
      },
      {
        id: "",
        key: "Mileage",
        value: `${fault?.odometer.value} ${fault?.odometer.unit}`,
      },
      {
        id: "",
        key: "Severity",
        value: (
          <StatusBadge
            label={fault?.severity ?? ""}
            style="text"
            showDot
          />
        ),
      },
      {
        id: "",
        key: "Additional Notes",
        value: fault?.additionalNotes,
      },
      {
        id: "",
        key: "Work Order #",
        value: fault?.workOrderId,
      },
    ];
    base.map((item) => _data.push(item));
    // serviceDetails?.serviceDetails?.map((item) => _data.push(item));

    return _data;
  };

  return (
    <div className="px-4 py-2">
      <SectionHeader
        title={`Fault # - ${fault?.id}`}
        button={
          <Button
            label="Edit"
            onClick={() => setShowModal(true)}
          />
        }
      />
      <Accordion
        title={"Fault Details"}
        copy={`Last Updated: ${formatDate(
          new Date(fault?.lastUpdatedAt),
          DATE_OPTIONS.dMHrs
        )}`}
        id=""
        style="section"
        defaultOpen={true}
        body={<ListTable data={parseDetailsView()} />}
      />
      <Accordion
        title={"Other Information"}
        id=""
        style="section"
        body={
          <div className="grid grid-cols-4 gap-4 py-6">
            {fault?.images?.map((image, index) => (
              <ImageCard
                imageUrl={image}
                key={index}
                style="object-cover rounded-md mb-2 size-24"
                iconSize=""
                canClick={true}
              />
            ))}
          </div>
        }
      />
      {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="max-w-7xl"
          enableModalDismiss
        >
          <div className="px-4 py-2">
            <AddNewFault
              dismiss={showModalHandler}
              vehicles={homeContext.userVehicles ?? []}
              fault={fault}
            />
          </div>
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </div>
  );
};
