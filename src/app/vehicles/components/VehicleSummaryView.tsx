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
            {/* <CardWithSectionHeader
              title="Overview"
              //   copy="Specifications of the Vehicle"
            >
              <ListTable data={createListData()} />
            </CardWithSectionHeader>
            General Information Upcoming Reminders / Service Recent Expenses
            Issues and Faults
            <CardWithSectionHeader
              title="Specifications"
              //   copy="Specifications of the Vehicle"
            >
              <ListTable data={createListData()} />
            </CardWithSectionHeader>
            <CardWithSectionHeader
              title="Specifications"
              //   copy="Specifications of the Vehicle"
            >
              <ListTable data={createListData()} />
            </CardWithSectionHeader>
            <CardWithSectionHeader
              title="Specifications"
              //   copy="Specifications of the Vehicle"
            >
              <ListTable data={createListData()} />
            </CardWithSectionHeader> */}
          </div>
        }
        rhs={
          <>
            <img
              alt=""
              src="https://www.aronline.co.uk/wp-content/uploads/2008/04/Chrysler-300C.jpeg"
            />
            <div className="rounded-md border pb-12">
              <div className="bg-gradient-to-r from-yellow-600 to-red-600 h-20 rounded-tl-md rounded-tr-md"></div>
              <div className="text-center block mx-auto px-4 align-baseline w-full -m-10 space-y-6">
                {/* <div className="flex justify-between items-end">
                  <Avatar
                    firstName={vehicle.operator.firstName}
                    lastName={vehicle.operator.lastName}
                    imageUrl={vehicle.operator.avatar}
                    size={AVATAR_SIZES.xxl}
                  />
                  <Button
                    label="View Profile"
                    skin={BUTTON_SKIN.secondaryColor}
                  />
                </div>

                <div className="text-left space-y-1">
                  <p className="text-slate-900 font-semibold">
                    {vehicle.operator.firstName}
                  </p>
                  <p className="text-slate-700 text-sm">
                    {vehicle.operator.firstName}
                  </p>
                  <p className="text-slate-700 text-xs">
                    #: {vehicle.operator.firstName}
                  </p>
                  <StatusBadge
                    label="Active"
                    statusType={STATUS_COLORS.success}
                  />
                </div> */}

                {/* <div className="border-t py-4 space-y-4">
                  <div className="py-2 space-y-2">
                    <Lbl label="Manager" />
                    <AvatarCell
                      firstName={employee.lineManager?.bioData.firstName ?? ""}
                      lastName={employee.lineManager?.bioData.lastName ?? ""}
                      fullName={employee.lineManager?.bioData.fullName ?? ""}
                      imageUrl={employee.lineManager?.bioData.avatar ?? ""}
                      row2={
                        employee.lineManager?.jobInformation?.jobTitle ?? ""
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Lbl label="Direct Reports" />
                    <AvatarStack
                      employees={sampleEmployeeList}
                      size={AVATAR_SIZES.sm}
                    />
                  </div>
                </div> */}
              </div>
            </div>
            <p>Custodian</p>
            <p>Reassign</p>
            <p>Disable</p>
            <p>Update</p>
            <p>New Issue </p>
            <p>New Inspection</p>
            <p>New Expense</p>
            <p>New Fault</p>
          </>
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
