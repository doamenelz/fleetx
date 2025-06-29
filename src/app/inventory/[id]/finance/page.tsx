"use client";

import {
  Accordion,
  Button,
  BUTTON_SKIN,
  CARD_SPAN,
  CardWithSectionHeader,
  CustomCardWithTitle,
  GRID_TYPE,
  GridLayout,
  Lbl,
  ListTable,
  ListTableData,
  PageContainer,
  SCREEN_WIDTH,
  SearchField,
  SectionHeader,
  SlideOutWrapper,
  TextLabel,
  TipDirection,
  ToolTip,
} from "@/components";
import ReactDOM from "react-dom";
import { classNames } from "@/lib/utilities/helperFunctions";
import {
  sampleFinance,
  sampleVehicleAssignmentArray,
  sampleVehicleExpenses,
  sampleVehicles,
  Vehicle,
  VehicleFinanceDetails,
} from "@/models";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { VehicleServiceTableList } from "../../components/VehicleServiceTable";
import { sampleServiceReminders } from "@/models/ServiceAndRecalls/Service";
import {
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  PlusIcon,
} from "lucide-react";
import { CostSummaryCard } from "../../components/VehicleCostSummary";
import { VehicleExpenseList } from "../../components/VehicleExpenseList";
import { getVehicleBreadCrumbs } from "../breadCrumbModel";

export default function Page() {
  const loc = usePathname();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  useEffect(() => {
    const vehicleDetails = sampleVehicles.find(
      (vehicle) => vehicle.id === String(loc.split("/")[2])
    );
    setSelectedVehicle(vehicleDetails);
  }, []);
  return (
    <PageContainer
      documentTitle={`Vehicles`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={getVehicleBreadCrumbs(loc, "6")}
    >
      <div className="space-y-4 pb-4">
        <GridLayout
          type={GRID_TYPE.twoOne}
          lhs={
            <div className="pt-2">
              <CostSummaryCard
                vehicle={selectedVehicle!}
                span={CARD_SPAN.full}
                title="Cost Overview"
                copy="Year to Date"
              />
            </div>
          }
          rhs={
            <>
              <ContractOverview data={sampleFinance} />
            </>
          }
        ></GridLayout>
        <div>
          <SectionHeader title="Expenses" />
          <div className="flex pt-2 justify-between items-center">
            <SearchField
              placeholder="Search"
              setQuery={() => {}}
            />

            <div className="flex gap-2">
              <Lbl label={`5 of ${sampleVehicleExpenses.length} results`} />
              <div className="">
                <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="items-center flex gap-2">
                {/* <IconDropdown
                  items={vehicleControlItems}
                  button={
                    <div className="p-2 rounded-sm border hover:bg-slate-50 hover:text-brand-blueRoyal">
                      <Ellipsis className="w-4 h-4" />
                    </div>
                  }
                /> */}
              </div>
            </div>
          </div>
          <VehicleExpenseList data={sampleVehicleExpenses} />
        </div>
      </div>
    </PageContainer>
  );
}

const ContractOverview: FC<{ data: VehicleFinanceDetails }> = ({ data }) => {
  const parseDetails = (financeType: string) => {
    var _data: ListTableData[] = [
      {
        id: "",
        key: "Odometer Reading",
        value: (
          <div>
            <p>{data.lastOdometer}</p>
            <p className="text-slate-500 text-[10px]/[10px] normal-case">
              Last Updated: {data.lastUpdated}
            </p>
          </div>
        ),
      },
      {
        id: "ownedType",
        key: "Purchased",
        value: data.ownerType,
      },
      {
        id: "insurance",
        key: "Insurance",
        value: data.insurance,
      },
    ];

    switch (financeType) {
      case "lease":
        var details = [
          {
            id: "Purchase Status",
            key: "Contract Type",
            value: financeType,
          },
          {
            id: "paymentSchedule",
            key: "Payment Schedule",
            value: data.monthlyPayment,
          },
          {
            id: "startDate",
            key: "Lease Start",
            value: data.startDate,
          },
          {
            id: "endDate",
            key: "Lease End",
            value: data.endDate,
          },
          {
            id: "mileagePerYear",
            key: "Mileage Per Year",
            value: (
              <div>
                <p>{data.mileagePerYear}</p>
                <p className="text-slate-500 text-[10px]/[10px] normal-case">
                  Year to Date: {data.thisYearMileage}
                </p>
              </div>
            ),
          },
        ];

        details.map((detail) => _data.push(detail));
        break;
      case "cash":
        var cashDetails = [
          {
            id: "Purchase Status",
            key: "Purchase Type",
            value: financeType,
          },
          {
            id: "purchaseCost",
            key: "Purchase Cost",
            value: data.purchaseCost,
          },
          {
            id: "startDate",
            key: "Purchase Date",
            value: data.startDate,
          },
          {
            id: "lifecycleMileage",
            key: "Service Life (km)",
            value: (
              <div>
                <p>{data.depreciationMileage}</p>
                <p className="text-red-500 text-[10px]/[10px] normal-case">
                  - 5,000km | 5% Overused
                </p>
              </div>
            ),
          },
          {
            id: "lifecycleDuration",
            key: "Service Life (Years)",
            value: (
              <div>
                <p>{data.depreciationDuration}</p>
                <p className="text-slate-500 text-[10px]/[10px] normal-case">
                  2.5 years left | 65% Used
                </p>
              </div>
            ),
          },
        ];

        cashDetails.map((detail) => _data.push(detail));
        break;
      case "loan":
        var loanDetails = [
          {
            id: "Purchase Status",
            key: "Contract Type",
            value: financeType,
          },
          {
            id: "loanAmount",
            key: "Loan Amount",
            value: data.loanPrincipal,
          },
          {
            id: "downPayment",
            key: "Down Payment",
            value: data.downPayment,
          },
          {
            id: "startDate",
            key: "Loan Start",
            value: data.startDate,
          },
          {
            id: "endDate",
            key: "Loan End",
            value: data.endDate,
          },
          {
            id: "paymentSchedule",
            key: "Payment Schedule",
            value: data.monthlyPayment,
          },
        ];

        loanDetails.map((detail) => _data.push(detail));
        break;

      default:
        break;
    }

    return _data;
  };
  return (
    <CardWithSectionHeader
      title="Contract Overview"
      copy="Lease, Cash, or Loan details of the Vehicle"
      hasBoundary={false}
    >
      {/* <StatusGrid
        data={[
          { label: "Scheduled", value: "4" },
          { label: "Overdue", value: "1" },
          { label: "Completed", value: "6" },
        ]}
      /> */}

      <ListTable data={parseDetails("loan")} />
    </CardWithSectionHeader>
  );
};
