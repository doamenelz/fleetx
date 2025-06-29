"use client";

import {
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
import {
  sampleVehicleAssignmentArray,
  sampleVehicles,
  Vehicle,
  VehicleAssignment,
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
import { VehicleAssignmentTable } from "../../components/VehicleAssignmentTable";
import { getVehicleBreadCrumbs } from "../breadCrumbModel";

export default function Page() {
  const loc = usePathname();
  const [vehicleAssignments, setVehicleAssignments] = useState<
    VehicleAssignment[]
  >([]);
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
      breadCrumbs={getVehicleBreadCrumbs(loc, "4")}
    >
      <>
        <div className="sticky top-0">
          <div className="flex pt-2 justify-between items-center">
            <SearchField
              placeholder="Search"
              setQuery={() => {}}
            />

            <div className="flex gap-2">
              <Lbl
                label={`5 of ${sampleVehicleAssignmentArray.length} results`}
              />
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
          <VehicleAssignmentTable data={sampleVehicleAssignmentArray} />
        </div>
      </>
    </PageContainer>
  );
}

//TODO: Make this a thread, add check into store as an option
