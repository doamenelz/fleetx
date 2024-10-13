"use client";

import {
  BackHeader,
  PageContainer,
  PageLoader,
  SCREEN_WIDTH,
  Spinner,
  STATUS_COLORS,
  StatusBadge,
  Tab,
  Tabs,
} from "@/components";
import { sampleVehicles, Vehicle } from "@/models/Vehicle/Vehicle";
import { useEffect, useState } from "react";
import { VehicleTableList } from "../components/VehicleTableList";
import { VehicleSummaryView } from "../components/VehicleSummaryView";
import { simulateLoader } from "@/lib/utilities/helperFunctions";

export default function Page({ params }: { params: { id: string } }) {
  // const _leaveDetails = sampleBalances.find((p) => p.type === params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();
  useEffect(() => {
    const vehicleDetails = sampleVehicles.find(
      (vehicle) => vehicle.id === params.id
    );
    setSelectedVehicle(vehicleDetails);
    simulateLoader(setIsLoading, 2000);
  }, []);

  const [selectedTab, setSelectedTab] = useState<string>("summary");
  const tabs: Tab[] = [
    { name: "Summary", href: "#summary", id: "summary" },
    { name: "Specifications", href: "#overview", id: "2" },
    { name: "Service & Repairs", href: "", id: "3" },
    { name: "Assignments", href: "", id: "4" },
    { name: "Fuel & Energy", href: "", id: "5" },
    { name: "Expenses", href: "", id: "5" },
    { name: "Usage History", href: "", id: "5" },
  ];
  return (
    <PageContainer
      documentTitle={`Vehicles - ${params.id}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
    >
      {isLoading ? ( //max-h-[calc(100vh_-_260px)]
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting Vehicle Details.." }} />
        </div>
      ) : (
        <>
          <div className="sticky top-[87px] w-full z-10 bg-white">
            <BackHeader previousPathName="Vehicles" />
            <div className="">
              <p className="text-xs text-slate-500">
                #{selectedVehicle!.generalInfo.license}
              </p>

              <p className="items-center flex gap-1 font-semibold text-2xl">
                {selectedVehicle!.generalInfo.name !== "" ? (
                  selectedVehicle!.generalInfo.name
                ) : (
                  <>
                    {selectedVehicle!.generalInfo.manufacturer}
                    <span>{selectedVehicle!.generalInfo.model}</span>
                    <span>{selectedVehicle!.generalInfo.trim},</span>
                    <span>{selectedVehicle!.generalInfo.year}</span>
                  </>
                )}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span>{selectedVehicle!.generalInfo.odometer}</span> •
                <span>{selectedVehicle!.generalInfo.location}</span>
                {/* <span>
              <StatusBadge
                statusType={STATUS_COLORS.success}
                label={vehicleDetails.status}
              />
            </span> */}
              </p>

              {/* <div className="flex gap-1 text-sm text-slate-600">
            <span>{vehicleDetails.specifications?.make}</span>
            <span>{vehicleDetails.specifications?.year}</span>
          </div> */}
            </div>
            <Tabs
              tabs={tabs}
              tabHandler={() => {}}
              selectedTab={selectedTab}
            >
              <></>
            </Tabs>
          </div>
          <div className="">
            {selectedTab === "summary" && (
              <VehicleSummaryView vehicle={selectedVehicle!} />
            )}
          </div>
        </>
      )}
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
