import {
  Avatar,
  AVATAR_SIZES,
  Button,
  BUTTON_SKIN,
  CARD_SPAN,
  CardWithSectionHeader,
  GRID_TYPE,
  GridLayout,
  ICON_POSITION,
  Lbl,
  ListTable,
  ListTableData,
  STATUS_COLORS,
  StatusBadge,
} from "@/components";
import { sampleVehicleIssues, VehicleIssues } from "@/models";
import { Vehicle } from "@/models/Vehicle/Vehicle";
import Link from "next/link";

import { FC, useEffect, useState } from "react";
import { CostSummaryCard } from "./VehicleCostSummary";
import { Archive, Delete, Edit, FileWarning, Trash } from "lucide-react";
import { VehicleFuelSummaryCard } from "./VehicleFuelSummaryCard";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";

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
            <CostSummaryCard
              vehicle={generalInfo!}
              span={CARD_SPAN.full}
              title="Costs Overview"
            />
            <VehicleFuelSummaryCard vehicle={generalInfo!} />
          </div>
        }
        rhs={
          <div className="space-y-6">
            <img
              className="rounded-md"
              alt=""
              src="https://www.aronline.co.uk/wp-content/uploads/2008/04/Chrysler-300C.jpeg"
            />
            <div className="flex gap-2">
              <Button
                label="Edit Vehicle"
                fillWidth
                skin={BUTTON_SKIN.secondaryColor}
                icon={{
                  position: ICON_POSITION.leading,
                  asset: <Edit className="h-3 w-3" />,
                }}
              />
              <Button
                label="Log Issue"
                fillWidth
                skin={BUTTON_SKIN.secondaryColor}
                icon={{
                  position: ICON_POSITION.leading,
                  asset: <FileWarning className="h-3 w-3" />,
                }}
              />
              <Button
                label="Archive Vehicle"
                destructive
                fillWidth
                icon={{
                  position: ICON_POSITION.leading,
                  asset: <Archive className="h-3 w-3" />,
                }}
              />
            </div>
            <UpcomingActivities vehicle={generalInfo!} />
            <FaultSummary vehicle={generalInfo!} />
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
    { id: "2", key: "SN / VIN", value: vehicle.vin },
    { id: "3", key: "License #", value: vehicle.licenseNumber },

    { id: "4", key: "Manufacturer", value: vehicle.manufacturer },
    { id: "5", key: "Model", value: vehicle.model },
    { id: "6", key: "Trim", value: vehicle.trim },
    { id: "7", key: "Year", value: vehicle.year },
    { id: "8", key: "Type", value: vehicle.type },
    {
      id: "18",
      key: "Name",
      value: vehicle.name,
    },
    { id: "9", key: "Color", value: vehicle.color },
    {
      id: "10",
      key: "Mileage",
      value:
        vehicle.odometer !== undefined ? vehicle.odometer : vehicle.baseMileage,
    },
    { id: "11", key: "Fuel (Energy) Type", value: vehicle.energyType },

    { id: "12", key: "Location", value: vehicle.location },
    {
      id: "13",
      key: "Ownership",
      value: vehicle.contractOwnership,
    },
    {
      id: "15",
      key: "Active Since",
      value: formatDate(new Date(vehicle.createdDate), DATE_OPTIONS.dMHrs),
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
      title="Details"
      copy="General specifications of the Vehicle"
    >
      <ListTable data={data} />
    </CardWithSectionHeader>
  );
};

const FaultSummary: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const issues: VehicleIssues[] = sampleVehicleIssues;
  return (
    <CardWithSectionHeader
      title="Open Issues"
      hasBoundary={false}
      button={
        <Button
          componentType="link"
          link=""
          skin={BUTTON_SKIN.link}
          label="All Issues"
        />
      }
      //   copy="Specifications of the Vehicle"
    >
      <div>
        <dl className="[&>*:nth-child(even)]:bg-indigo-50/20 divide-y divide-slate-100">
          {issues.map((issue) => (
            <div id={issue.id} className="py-4 space-y-2 px-2">
              <div className="flex justify-between">
                <Link
                  href={""}
                  className="text-brand-blueRoyal text-xs font-semibold items-center flex group"
                >
                  [#{issue.id}] -
                  <span className="text-sm pl-1 flex justify-between text-slate-700 group-hover:text-brand-blueRoyal">
                    {issue.summary}
                  </span>
                </Link>
                <StatusBadge
                  label={issue.priority}
                  statusType={
                    issue.status === "High"
                      ? STATUS_COLORS.declined
                      : STATUS_COLORS.pending
                  }
                />
              </div>

              <p className="text-xs text-slate-900">
                Inspection Notes: {issue.additionalNotes}
              </p>

              <div className="flex gap-2">
                {vehicle != undefined && (
                  <div className="flex gap-1 items-center">
                    <Lbl label="Reporter:" />
                    <Lbl
                      label=""
                      labelComponent={
                        <p className=" text-brand-blueRoyal">
                          {issue.reportedBy.name}
                        </p>
                      }
                    />
                    •
                    <Lbl
                      label=""
                      labelComponent={
                        <p className="text-slate-600">{issue.reportedDate}</p>
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </dl>
      </div>
    </CardWithSectionHeader>
  );
};

const UpcomingActivities: FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  const data: ListTableData[] = [
    {
      id: "1",
      key: "Service & Repairs",
      value: (
        <div className=" space-y-2">
          <ListTableCell
            url={`${vehicle.id}/specifications`}
            title="Tire Rotation"
            copy="Bi-Annual"
            due="23 Aug, 2024"
          />
          <ListTableCell
            url={`${vehicle.id}/specifications`}
            title="8000km Oil Change"
            copy="Every 8000km"
            due="23 Aug, 2024"
          />
          <ListTableCell
            url={`${vehicle.id}/specifications`}
            title="Transmission Oil Change"
            copy="As needed"
            due="23 Aug, 2024"
          />
        </div>
      ),
    },
    {
      id: "2",
      key: "Inspection",
      value: (
        <div className=" space-y-2">
          <ListTableCell
            url={`${vehicle.id}/specifications`}
            title="Emission Test"
            copy="Quarterly"
            due="23 Aug, 2024"
          />
          <ListTableCell
            url={`${vehicle.id}/specifications`}
            title="IMTO 6-Point Check"
            copy="Annual"
            due="23 Aug, 2024"
          />
        </div>
      ),
    },
    {
      id: "4",
      key: "Renewals",
      value: (
        <div className=" space-y-2">
          <ListTableCell
            url={`${vehicle.id}/specifications`}
            title="Vehicle Insurance"
            copy="$233.45 p/m"
            due="23 Aug, 2024"
          />
          <ListTableCell
            url={`${vehicle.id}/specifications`}
            title="Lease Payment"
            copy="$199.99 b/w"
            due="23 Aug, 2024"
          />

          <div className="space-y-0">
            <button className="text-brand-blueRoyal hover:underline">
              Vehicle License
            </button>
            <p className="text-slate-500 text-[10px]/[10px] normal-case">
              $233.45 p/m | <span>23 Aug, 2024</span>
            </p>
          </div>
          <div className="space-y-0">
            <button className="text-brand-blueRoyal hover:underline">
              401 Transponder Renewal
            </button>
            <p className="text-slate-500 text-[10px]/[10px] normal-case">
              $21 p/m | <span>23 Aug, 2024</span>
            </p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <CardWithSectionHeader
      title="Scheduled Items"
      hasBoundary={false}
      copy="Overdue and Upcoming Items"
    >
      <ListTable data={data} />
    </CardWithSectionHeader>
  );
};

const ListTableCell: FC<{
  url?: string;
  title: string;
  copy?: string;
  due: string;
}> = ({ title, copy, url, due }) => {
  return (
    <div className="space-y-0">
      {url && (
        <Link href={url} className="text-brand-blueRoyal hover:underline">
          {title}
        </Link>
      )}
      {!url && <p className="">{title}</p>}

      <p className="text-slate-500 text-[10px]/[10px] normal-case">
        {copy} | <span>{due}</span>
      </p>
    </div>
  );
};
