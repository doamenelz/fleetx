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
import { apiHandler } from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";

export default function VehicleDetails({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  //   const loc = location.pathname.split("/");
  const rootContext = useContext(RootContext);
  const loc = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  const getVehicleInformation = async () => {
    console.log(`Calling Get Vendor ${loc.split("/")[2]}`);
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/inventory/${loc.split("/")[2]}`,
      method: "GET",
    });
    if (api.success) {
      console.log(api.data);
      let response = api.data.vehicle as Vehicle;
      console.log(response);
      setSelectedVehicle(response);
      setIsLoading(false);
    } else {
      //TODO: Show Error Component
      console.log(api.errorMessage);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getVehicleInformation();
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
          {selectedVehicle !== undefined ? (
            <>
              <div className="sticky top-12 w-full z-10 bg-white">
                <div className="py-4">
                  <p className="text-xs text-slate-500">
                    #{selectedVehicle.licenseNumber}
                  </p>

                  <p className="items-center flex gap-1 font-semibold text-2xl">
                    {selectedVehicle.name !== "" ? (
                      selectedVehicle.name
                    ) : (
                      <>
                        {selectedVehicle.manufacturer}
                        <span>{selectedVehicle.model}</span>
                        <span>{selectedVehicle.trim},</span>
                        <span>{selectedVehicle.year}</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{selectedVehicle.odometer}</span> •
                    <span>{selectedVehicle.location}</span>
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
          ) : (
            <>Show Error for no vehicle found</>
          )}
        </>
      )}
    </PageContainer>
  );
}
