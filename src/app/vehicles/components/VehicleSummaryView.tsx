import {
  Avatar,
  AVATAR_SIZES,
  Button,
  BUTTON_SKIN,
  CardWithSectionHeader,
  CardWithTitle,
  CustomCardWithTitle,
  GRID_TYPE,
  GridLayout,
  Lbl,
  ListTable,
  ListTableData,
  STATUS_COLORS,
  StatusBadge,
} from "@/components";
import { sampleVehicles, Vehicle } from "@/models/Vehicle/Vehicle";

import { FC, useEffect, useState } from "react";

export const VehicleSummaryView: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  useEffect(() => {
    setSummaryData(vehicle?.specifications);
  }, []);
  const [summaryData, setSummaryData] = useState<any | null>();
  const [generalInfo, setGeneralInfo] = useState<Vehicle>(vehicle);

  const createListData = () => {
    if (!summaryData) return [];
    return Object.entries(summaryData).map(([key, value], index) => ({
      key: key,
      value: String(value),
      id: index.toString(),
    }));
  };
  return (
    <div className="space-y-6 my-6">
      <GridLayout
        type={GRID_TYPE.twoOne}
        lhs={
          <div className="space-y-6">
            <OverviewCard vehicle={generalInfo!} />
            <FaultSummary vehicle={generalInfo!} />
            <WorkOrders vehicle={generalInfo!} />

            <Costs vehicle={generalInfo!} />
          </div>
        }
        rhs={
          <div className="space-y-6">
            <img
              className="rounded-md"
              alt=""
              src="https://www.aronline.co.uk/wp-content/uploads/2008/04/Chrysler-300C.jpeg"
            />
            <UpcomingActivities vehicle={generalInfo!} />
            {/* <div className="rounded-md border pb-12">
              <div className="bg-gradient-to-r from-yellow-600 to-red-600 h-20 rounded-tl-md rounded-tr-md"></div>
              <div className="text-center block mx-auto px-4 align-baseline w-full -m-10 space-y-6">
               
              </div>
            </div>
            <p>Custodian</p>
            <p>Reassign</p>
            <p>Disable</p>
            <p>Update</p>
            <p>New Issue </p>
            <p>New Inspection</p>
            <p>New Expense</p>
            <p>New Fault</p> */}
          </div>
        }
      ></GridLayout>
    </div>
  );
};

const OverviewCard: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const data: ListTableData[] = [
    {
      id: "1",
      key: "Status",
      value: (
        <StatusBadge
          label={vehicle.status}
          statusType={STATUS_COLORS.success}
        />
      ),
    },
    { id: "2", key: "SN / VIN", value: vehicle.generalInfo.sn },
    { id: "3", key: "License #", value: vehicle.generalInfo.license },

    { id: "4", key: "Manufacturer", value: vehicle.generalInfo.manufacturer },
    { id: "5", key: "Model", value: vehicle.generalInfo.model },
    { id: "6", key: "Trim", value: vehicle.generalInfo.trim },
    { id: "7", key: "Year", value: vehicle.generalInfo.year },
    { id: "8", key: "Type", value: vehicle.generalInfo.type },
    { id: "9", key: "Color", value: vehicle.generalInfo.color },
    { id: "10", key: "Mileage", value: vehicle.generalInfo.odometer },
    { id: "11", key: "Fuel (Energy) Type", value: vehicle.generalInfo.fuel },

    { id: "12", key: "Location", value: vehicle.generalInfo.location },
    {
      id: "13",
      key: "Ownership",
      value: vehicle.generalInfo.contractOwnership,
    },
    {
      id: "14",
      key: "Operator",
      value: (
        <>
          {vehicle.operator !== undefined ? (
            <div className="flex gap-2 items-center">
              <Avatar
                firstName={vehicle.operator.firstName}
                lastName={vehicle.operator.lastName}
                imageUrl={vehicle.operator.avatar}
                size={AVATAR_SIZES.sm}
              />
              <div>
                <Lbl
                  label=""
                  labelComponent={
                    <p className="font-semibold text-primary-900">
                      {vehicle.operator.name}
                    </p>
                  }
                />
                {/* {vehicle.operator.email && (
                  <Lbl label={vehicle.operator.email} />
                )}
                {vehicle.operator.phone && (
                  <Lbl label={vehicle.operator.phone.toString()} />
                )} */}
              </div>
            </div>
          ) : (
            "Unassigned"
          )}
        </>
      ),
    },
  ];

  return (
    <CardWithSectionHeader
      title="Vehicle Overview"
      //   copy="Specifications of the Vehicle"
    >
      <ListTable data={data} />
    </CardWithSectionHeader>
  );
};

const FaultSummary: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <CardWithSectionHeader
      title="Open Issues"
      //   copy="Specifications of the Vehicle"
    >
      <p></p>
    </CardWithSectionHeader>
  );
};

const WorkOrders: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <CardWithSectionHeader
      title="Work Orders"
      //   copy="Specifications of the Vehicle"
    >
      <p></p>
    </CardWithSectionHeader>
  );
};

const UpcomingActivities: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const data: ListTableData[] = [
    {
      id: "1",
      key: "Service",
      value: "8,000km Oil Change | 23 Aug, 2024",
    },
    {
      id: "1",
      key: "Tire Inspection",
      value: "23 Aug, 2024",
    },
    {
      id: "1",
      key: "Annual IMTO Inspection",
      value: "25 Aug, 2024",
    },
    {
      id: "1",
      key: "Insurance Payment",
      value: "$420 | 25 Aug, 2024",
    },
    {
      id: "1",
      key: "Lease Payment",
      value: "$315 Bi-Weekly | 25 Aug, 2024",
    },
  ];
  return (
    <CardWithSectionHeader
      title="Scheduled Items"
      hasBoundary={false}
      //   copy="Specifications of the Vehicle"
    >
      <ListTable data={data} />
    </CardWithSectionHeader>
  );
};
const Costs: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <CardWithSectionHeader
      title="Costs & Expenses"
      //   copy="Specifications of the Vehicle"
    >
      <p></p>
    </CardWithSectionHeader>
  );
};
