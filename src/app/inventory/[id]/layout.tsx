"use client";
import { usePathname } from "next/navigation";
import {
  BackHeader,
  PageContainer,
  SCREEN_WIDTH,
  Spinner,
  Tab,
  Tabs,
} from "@/components";
import { sampleVehicles, Vehicle } from "@/models/Vehicle/Vehicle";
import { useContext, useEffect, useState } from "react";
import { simulateLoader } from "@/lib/utilities/helperFunctions";
import { useRouter } from "next/router";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";
import { getVehicleBreadCrumbs } from "./breadCrumbModel";

export default function VehicleDetails({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  //   const loc = location.pathname.split("/");
  const loc = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();
  useEffect(() => {
    const vehicleDetails = sampleVehicles.find(
      (vehicle) => vehicle.id === String(loc.split("/")[2])
    );
    setSelectedVehicle(vehicleDetails);
    simulateLoader(setIsLoading, 2000);
  }, []);

  const [selectedTab, setSelectedTab] = useState<string>(loc);
  useEffect(() => {
    setSelectedTab(loc);
  }, [loc]);

  const tabs = [
    {
      name: "Summary",
      href: `/inventory/${loc.split("/")[2]}`,
      id: "01",
    },
    {
      name: "Specifications",
      href: `/inventory/${loc.split("/")[2]}/specifications`,
      id: "2",
    },
    {
      name: "Service & Repairs",
      href: `/inventory/${loc.split("/")[2]}/service`,
      id: "3",
    },
    {
      name: "Assignments",
      href: `/inventory/${loc.split("/")[2]}/assignments`,
      id: "4",
    },
    {
      name: "Finance",
      href: `/inventory/${loc.split("/")[2]}/finance`,
      id: "6",
    },
    {
      name: "Schedule & Reminders",
      href: `/inventory/${loc.split("/")[2]}/schedule`,
      id: "5",
    },
    {
      name: "Audit History",
      href: `/inventory/${loc.split("/")[2]}/audit`,
      id: "7",
    },
  ];

  const tabHandler = (tabId: string) => {
    setSelectedTab(tabId);
  };

  return (
    <PageContainer
      documentTitle={`Inventory - `}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={getVehicleBreadCrumbs(loc, "1")}
    >
      {isLoading ? (
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting Vehicle Details.." }} />
        </div>
      ) : (
        <>
          <div className="sticky top-12 w-full z-10 bg-white">
            <div className="py-4">
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
              </p>
            </div>
            <Tabs
              tabs={tabs}
              tabHandler={tabHandler}
              selectedTab={selectedTab}
            >
              <></>
            </Tabs>
          </div>
          {children}
        </>
      )}
    </PageContainer>
  );
}
