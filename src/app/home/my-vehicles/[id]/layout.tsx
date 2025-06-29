"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  BreadCrumb,
  ErrorType,
  PageHeader,
  Spinner,
  TabItem,
  Tabs,
  VehicleImageCard,
} from "@/components";
import { Vehicle } from "@/models/Vehicle/Vehicle";
import { useContext, useEffect, useState } from "react";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";
import { apiHandler } from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";
import { VehicleDetailsContext } from "@/app/inventory/contexts/VehicleDetailsContext";
import { ROLE_TYPE } from "@/models/Shared/RoleTypes";
import { NoAccess } from "@/components/Errors/NoAccess";

//TODO: + API Error State
/**
 * 
 * @param param0 ,
        "vehicle_service_repairs_view",
        "vehicle_finance_view",
        "vehicle_schedule_view"
 * @returns 
 */
export default function VehicleDetails({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const rootContext = useContext(RootContext);
  const loc = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();
  const router = useRouter();
  const getVehicleInformation = async () => {
    setIsLoading(true);
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/inventory?vehicleId=${
        loc.split("/")[3]
      }`,
      method: "GET",
    });

    if (api.success) {
      setSelectedVehicle(api.data.results[0] as Vehicle);
    } else {
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getVehicleInformation();
  }, []);

  const [selectedTab, setSelectedTab] = useState<string>(loc.split("/")[4]);

  const tabs = [
    {
      label: "Summary",
      href: `/home/my-vehicles/${loc.split("/")[3]}/summary`,
      id: "01",
    },
    {
      label: "Specifications",
      href: `/home/my-vehicles/${loc.split("/")[3]}/specifications`,
      id: "2",
    },
    {
      label: "Service",
      href: `/home/my-vehicles/${loc.split("/")[3]}/service`,
      id: "3",
    },
    {
      label: "Finance",
      href: `/home/my-vehicles/${loc.split("/")[3]}/finance`,
      id: "6",
    },
    {
      label: "Schedule",
      href: `/home/my-vehicles/${loc.split("/")[3]}/schedule`,
      id: "5",
    },
  ];

  const tabHandler = (tabId: string) => {
    router.push(tabs.find((tab) => tab.label === tabId)?.href!);
    setSelectedTab(tabId);
  };

  const [showHeader, setShowHeader] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([]);

  return (
    <ModuleContainerContext.Provider
      value={{
        mainPage: { id: "001", name: "Home", href: "/home", type: "main" },
        setShowHeader: setShowHeader,
        breadCrumbs: breadCrumbs,
        showHeader: showHeader,
        setBreadCrumbs: setBreadCrumbs,
      }}
    >
      <>
        {rootContext.store?.user?.roles?.some(
          ({ module }) => module === ROLE_TYPE.my_vehicles
        ) ? (
          <>
            <PageHeader />
            {isLoading && (
              <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
                <Spinner label="Getting Vehicle Details.." />
              </div>
            )}

            {/* User does not have access to view this vehicle */}
            {!isLoading &&
              selectedVehicle !== undefined &&
              selectedVehicle.assignedTo !== rootContext.store.user.id && (
                <NoAccess
                  error={ErrorType.no_vehicle_view_access}
                  description="This Vehicle does not exist, or you do not have authorization to view this Vehicle.."
                />
              )}
            {/* User has access to view this vehicle */}
            {!isLoading &&
              selectedVehicle !== undefined &&
              selectedVehicle.assignedTo === rootContext.store.user.id && (
                <VehicleDetailsContext.Provider
                  value={{
                    vehicle: selectedVehicle,
                    setVehicle: setSelectedVehicle,
                  }}
                >
                  <div className="sticky top-12 w-full z-10 bg-white px-6">
                    <div className="p-4 my-2 flex items-center gap-4 bg-gradient-to-r from-white via-slate-50 to-slate-200 ">
                      <VehicleImageCard
                        imageUrl={selectedVehicle.mainImage}
                        iconSize="size-10"
                        style="rounded-md size-16 object-cover"
                      />
                      <div>
                        <p className="text-xs text-slate-600">
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
                        <p className="text-xs text-slate-600 flex items-center gap-2">
                          <span>
                            {selectedVehicle.odometer ??
                              selectedVehicle.baseMileage}
                          </span>
                          <span>
                            |{" "}
                            {selectedVehicle.location ?? "No Location Assigned"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <Tabs
                      tabs={tabs}
                      tabHandler={tabHandler}
                      selectedTab={selectedTab}
                    />
                  </div>
                  {children}
                </VehicleDetailsContext.Provider>
              )}

            {/* No Vehicle found */}
            {!isLoading && selectedVehicle === undefined && (
              <NoAccess
                error={ErrorType.no_vehicle_view_access}
                description="This Vehicle does not exist, or you do not have authorization to view this Vehicle"
              />
            )}

            {/* API Error */}
          </>
        ) : (
          <NoAccess
            error={ErrorType.no_view_access}
            description="..."
          />
        )}
      </>
    </ModuleContainerContext.Provider>
  );
}
