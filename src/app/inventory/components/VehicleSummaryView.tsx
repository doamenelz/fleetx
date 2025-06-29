import {
  Avatar,
  AVATAR_SIZES,
  AVATAR_TOOLTIP_TYPES,
  AvatarToolTip,
  Button,
  BUTTON_SKIN,
  CARD_SPAN,
  CardWithSectionHeader,
  CopyLoader,
  GRID_TYPE,
  GridLayout,
  ICON_POSITION,
  Lbl,
  ListTable,
  ListTableData,
  StatusBadge,
} from "@/components";
import {
  generatePerson,
  generateUser,
  Renewal,
  sampleVehicleIssues,
  VehicleFault,
  VehicleIssues,
} from "@/models";
import { generateVehicleDetails, Vehicle } from "@/models/Vehicle/Vehicle";
import Link from "next/link";

import { FC, useContext, useEffect, useState } from "react";
import { CostSummaryCard } from "./VehicleCostSummary";
import { Archive, Delete, Edit, FileWarning, Trash } from "lucide-react";
import { VehicleFuelSummaryCard } from "./VehicleFuelSummaryCard";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";
import { parseFrequencyLabel } from "@/lib/utilities/helperFunctions";
import { getCompanyProfile } from "@/models/Shared/Configs";
import { CompanyConfiguration } from "@/models/Shared/CompanyConfig";
import clsx from "clsx";
//TODO: Show Error
//TODO: Sort Faults
export const VehicleSummaryView: FC<{
  vehicle: Vehicle;
}> = ({ vehicle }) => {
  const rootContext = useContext(RootContext);
  useEffect(() => {
    setSummaryData(vehicle?.specifications);
    console.log(generateVehicleDetails("active", "VEH1000005"));
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
              copy="Last 12 Months"
              vehicle={generalInfo!}
              span={CARD_SPAN.full}
              title="Costs Overview"
            />
            <VehicleFuelSummaryCard vehicle={generalInfo!} />
          </div>
        }
        rhs={
          <div className="space-y-4">
            <img
              className="rounded-md"
              alt=""
              src={vehicle.mainImage}
            />

            <ProgramsAndRenewals
              vehicle={generalInfo!}
              baseURL={rootContext.envVar.baseURL}
            />
            <FaultSummary
              vehicle={generalInfo!}
              baseURL={rootContext.envVar.baseURL}
            />
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
      value: <StatusBadge label={vehicle.status} />,
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

const FaultSummary: FC<{ vehicle: Vehicle; baseURL: string }> = ({
  vehicle,
  baseURL,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState<APICompletion | undefined>();

  const getFaults = async () => {
    const api = await apiHandler({
      url: `${baseURL}/faults?vehicleId=${vehicle.id}&status=new`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    setApiResponse(api);
    setIsLoading(false);
  };

  useEffect(() => {
    getFaults();
  }, []);
  return (
    <CardWithSectionHeader
      title="Open Issues"
      hasBoundary={false}
      button={
        <>
          {apiResponse?.data.count > 5 && (
            <Button
              componentType="link"
              link=""
              skin={BUTTON_SKIN.link}
              label="All Issues"
            />
          )}
        </>
      }
    >
      {isLoading && (
        <>
          <div className="mx-auto w-full py-2">
            <CopyLoader />
          </div>
        </>
      )}

      {isLoading && !apiResponse?.success && <></>}
      {!isLoading && apiResponse?.success && (
        <div>
          <dl className="[&>*:nth-child(even)]:bg-indigo-50/20 divide-y divide-slate-100">
            {apiResponse.data.results.slice(0, 5).map((issue: VehicleFault) => (
              <div
                key={issue.id}
                id={issue.id}
                className="py-4 space-y-2 px-2"
              >
                <Link
                  href={""}
                  className="text-brand-blueRoyal text-xs font-semibold items-center flex group"
                >
                  [#{issue.id}] -
                  <span className="text-sm pl-1 flex justify-between text-slate-700 group-hover:text-brand-blueRoyal">
                    {issue.name}
                  </span>
                </Link>

                <p className="text-xs text-slate-900">
                  Inspection Notes: {issue.description}
                </p>

                <div className="flex gap-2">
                  {vehicle != undefined && (
                    <div className="flex gap-1 items-center">
                      <Lbl label="Reporter:" />
                      <Lbl
                        label=""
                        labelComponent={
                          <AvatarToolTip
                            type={AVATAR_TOOLTIP_TYPES.text}
                            person={issue.createdBy}
                          />
                        }
                      />
                      •
                      <Lbl
                        label=""
                        labelComponent={
                          <p className="text-slate-600">
                            {formatDate(
                              new Date(issue.createdAt),
                              DATE_OPTIONS.dMHrs
                            )}
                          </p>
                        }
                      />
                    </div>
                  )}
                </div>
                <StatusBadge
                  style="text"
                  showDot
                  label={issue.severity}
                />
              </div>
            ))}
          </dl>
        </div>
      )}
    </CardWithSectionHeader>
  );
};

const ProgramsAndRenewals: FC<{ vehicle: Vehicle; baseURL: string }> = ({
  vehicle,
  baseURL,
}) => {
  const [isLoading, setIsloading] = useState(true);
  const [renewalList, setRenewalList] = useState<ListTableData[]>([]);
  const [programList, setProgramList] = useState<ListTableData[]>([]);

  const companyProfile = getCompanyProfile(baseURL) as CompanyConfiguration;
  const [renewalResponse, setRenewalResponse] = useState<
    APICompletion | undefined
  >();

  const [programResponse, setProgramResponse] = useState<
    APICompletion | undefined
  >();

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
  ];
  const getRenewals = async () => {
    const api = await apiHandler({
      url: `${baseURL}/renewals?vehicleId=${vehicle.id}&status=new`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    setRenewalResponse(api);

    if (api?.success) {
      const list: JSX.Element[] = [];
      api.data.results.map((renewal: Renewal) => {
        const cell = (
          <ListTableCell
            key={renewal.id}
            functionClick={() => {}}
            title={renewal.name}
            copy={`${companyProfile.currency.code ?? ""}${
              renewal.cost.reportedAmount
            } ${parseFrequencyLabel(renewal.frequency)}`}
            due={
              <span
                className={clsx(
                  " text-xs normal-case",
                  new Date(renewal.dueDate) < new Date()
                    ? "text-error-600"
                    : "text-slate-500"
                )}
              >{`Next: ${formatDate(
                new Date(renewal.dueDate),
                DATE_OPTIONS.dMY
              )}`}</span>
            }
          />
        );

        list.push(cell);
      });
      const tableData = [
        {
          id: "4",
          key: "Renewals",
          value: <div className=" space-y-2">{list}</div>,
        },
      ];

      setRenewalList(tableData);
    }
  };

  const getPrograms = async () => {
    const api = await apiHandler({
      url: `${baseURL}/programTransactions?vehicleId=${vehicle.id}`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    setProgramResponse(api);
    console.log("..", api.data.results);

    if (api?.success) {
      const list: JSX.Element[] = [];
      api.data.results.map((programTransaction: any) => {
        const cell = (
          <ListTableCell
            key={programTransaction.id}
            functionClick={() => {}}
            title={programTransaction.program.name}
            copy={`${programTransaction.program.type}`}
            due={`${
              programTransaction.program.frequency.byDate
                ? parseFrequencyLabel(
                    programTransaction.program.frequency.byDate
                  )
                : programTransaction.program.frequency.byMileage
                ? `${parseFrequencyLabel(
                    programTransaction.program.frequency.byMileage
                  )} ${programTransaction.program.frequency.byMileage}${
                    companyProfile.mileage.code
                  }`
                : `Once`
            }`}
          />
        );

        list.push(cell);
      });
      const tableData = [
        {
          id: "4",
          key: "Programs",
          value: <div className=" space-y-2">{list}</div>,
        },
      ];

      setProgramList(tableData);
    }
  };

  useEffect(() => {
    getRenewals();
    getPrograms();
  }, []);
  return (
    <CardWithSectionHeader
      title="Programs and Renewals"
      hasBoundary={false}
      copy="Programs and Renewals attached to this vehicle"
    >
      {programResponse?.success && <ListTable data={programList} />}
      {renewalResponse?.success && <ListTable data={renewalList} />}
    </CardWithSectionHeader>
  );
};

const ListTableCell: FC<{
  url?: string;
  title: string;
  copy?: string;
  due: string | JSX.Element;
  functionClick?: () => void;
}> = ({ title, copy, url, due, functionClick }) => {
  return (
    <div className="space-y-0">
      {url && (
        <Link
          href={url}
          className="text-brand-blueRoyal hover:underline"
        >
          {title}
        </Link>
      )}
      {functionClick && (
        <button className="text-brand-blueRoyal hover:underline">
          {title}
        </button>
      )}

      <div className="flex space-x-1 items-center">
        <p className="text-slate-500 text-xs capitalize pr-1">{copy}</p> |
        <p className="text-slate-500 text-xs capitalize">{due}</p>
      </div>
    </div>
  );
};
