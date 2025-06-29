"use client";

import {
  Accordion,
  Button,
  BUTTON_SKIN,
  CardWithSectionHeader,
  CustomCardWithTitle,
  GRID_TYPE,
  GridLayout,
  ICON_POSITION,
  Lbl,
  ListTable,
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
import { sampleVehicles, Vehicle } from "@/models";
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
      breadCrumbs={getVehicleBreadCrumbs(loc, "3")}
    >
      <GridLayout
        type={GRID_TYPE.twoOne}
        lhs={
          <div className="sticky top-0">
            <div className="flex pt-2 justify-between items-center">
              <SearchField
                placeholder="Search"
                setQuery={() => {}}
              />

              <div className="flex gap-2">
                <Lbl label={`5 of ${sampleVehicles.length} results`} />
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
            <VehicleServiceTableList data={sampleServiceReminders} />
          </div>
        }
        rhs={
          <>
            <SummaryCard />
            <div className="flex gap-6">
              <Button
                onClick={() => {}}
                label="New Service"
                skin={BUTTON_SKIN.secondaryColor}
                fillWidth
                icon={{
                  position: ICON_POSITION.leading,
                  asset: <PlusIcon className="w-3 h-3" />,
                }}
              />
              <Button
                onClick={() => {}}
                label="New Repair"
                skin={BUTTON_SKIN.secondaryColor}
                fillWidth
                icon={{
                  position: ICON_POSITION.leading,
                  asset: <PlusIcon className="w-3 h-3" />,
                }}
              />
            </div>
          </>
        }
      ></GridLayout>
    </PageContainer>
  );
}

const StatusGrid: FC<{ data: { label: string; value: string }[] }> = ({
  data,
}) => {
  return (
    <dl className="mx-auto my-2 lg:flex grid grid-cols-1 gap-px divide-x sm:grid-cols-2 justify-evenly border">
      {data.map((stat, index) => (
        <div
          key={index}
          className="flex flex-wrap w-full items-baseline justify-between gap-x-4  bg-white px-4 py-4 sm:px-6 xl:px-8"
        >
          <dt className="text-xs font-medium leading-6 text-gray-500">
            {stat.label}
          </dt>

          <dd
            className={classNames(
              "w-full flex-none text-3xl font-medium leading-10 tracking-tight ",
              stat.label === "Overdue" && Number(stat.value) > 0
                ? " text-red-700"
                : "text-slate-700"
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

const SummaryCard: FC<{}> = () => {
  return (
    <CardWithSectionHeader
      title="Overview"
      copy="Year to date"
      hasBoundary={false}
    >
      <StatusGrid
        data={[
          { label: "Scheduled", value: "4" },
          { label: "Overdue", value: "1" },
          { label: "Completed", value: "6" },
        ]}
      />

      <div className="py-4 space-y-6">
        <div className="">
          <Lbl label="Total Cost(s)" />
          <p className="text-3xl font-mono font-medium">$3,110.00</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <TextLabel
            label="Service Cost(s)"
            copy={<p className="font-mono text-sm">{"$740.00"}</p>}
          />

          <TextLabel
            label="Repairs"
            copy={
              <div className="group relative">
                <ToolTip
                  label={
                    "Cost is the total of all Out-of-Service parts & fixes"
                  }
                  direction={TipDirection.none}
                ></ToolTip>
                <p className="decoration-dotted underline hover:decoration-primary-400 font-mono text-sm">
                  {"$2,710.00"}
                </p>
              </div>
            }
          />
        </div>
      </div>
    </CardWithSectionHeader>
  );
};
