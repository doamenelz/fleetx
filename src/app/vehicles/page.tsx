"use client";
import {
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
  Lbl,
  PageContainer,
  SCREEN_WIDTH,
  SearchField,
  SectionHeader,
  setScreenWidth,
  SummaryCardHeader,
  SummaryCardObject,
} from "@/components";
import { classNames } from "@/lib/utilities/helperFunctions";
import { VehicleTableList } from "./components/VehicleTableList";
import { sampleVehicles, Vehicle } from "@/models/Vehicle";
import { ChevronLeft, ChevronRight, Ellipsis, PlusIcon } from "lucide-react";
import { useState } from "react";

const summaryStats: SummaryCardObject[] = [
  {
    name: "# of Vehicles",
    value: "520",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Active",
    value: "487",
    change: "+2.66%",
    changeType: "positive",
  },
  {
    name: "Repairs / Servicing",
    value: "15",
    change: "-2%",
    changeType: "neutral",
  },
  {
    name: "Decommissioned",
    value: "18",
    change: "+1",
    changeType: "positive",
  },
];
export default function Page() {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  return (
    <PageContainer
      documentTitle="Vehicles"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showFooter={false}
      //   bgColor="bg-brand-whiteLuster"
    >
      <div
        className={classNames("space-y-4", setScreenWidth(SCREEN_WIDTH.full))}
      >
        <SummaryCardHeader stats={summaryStats} />
        <div>
          <SectionHeader
            title="All Vehicles"
            copy="Manage your Next of vehicle, Beneficiaries and Dependents"
            button={
              <div className="flex gap-4 align-middle">
                <SearchField
                  placeholder="Search"
                  setQuery={() => {}}
                />
                <Lbl label="5 of 15 results" />
                <div>
                  <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button>
                  <Ellipsis className="w-4 h-4" />
                </button>
                <Button
                  onClick={() => {}}
                  label="New Vehicle"
                  skin={BUTTON_SKIN.primary}
                  icon={{
                    position: ICON_POSITION.trailing,
                    asset: <PlusIcon className="w-3 h-3" />,
                  }}
                />
              </div>
            }
          />
          <VehicleTableList data={sampleVehicles} />
        </div>
      </div>
    </PageContainer>
  );
}
