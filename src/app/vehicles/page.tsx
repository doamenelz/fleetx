"use client";
import {
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
  IconDropdown,
  Lbl,
  MenuDropdownItemProp,
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
import { sampleVehicles, Vehicle } from "@/models/Vehicle/Vehicle";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Ellipsis,
  PlusIcon,
  Upload,
} from "lucide-react";
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
  const vehicleControlItems: MenuDropdownItemProp[] = [
    {
      id: "1",
      label: "Import from CSV",
      function: () => {},
      icon: <Upload className="w-3 h-3" />,
    },
    {
      id: "2",
      label: "Download to CSV",
      function: () => {},
      icon: <Download className="w-3 h-3" />,
    },
  ];
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
              <div className="flex gap-2 items-center">
                <SearchField
                  placeholder="Search"
                  setQuery={() => {}}
                />
                <Lbl label={`5 of ${sampleVehicles.length} results`} />
                <div className="border-r pr-2">
                  <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="items-center flex gap-2">
                  <IconDropdown
                    items={vehicleControlItems}
                    button={
                      <div className="p-2 rounded-sm border hover:bg-slate-50 hover:text-brand-blueRoyal">
                        <Ellipsis className="w-4 h-4" />
                      </div>
                    }
                  />
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
              </div>
            }
          />
          <VehicleTableList data={sampleVehicles} />
        </div>
      </div>
    </PageContainer>
  );
}
