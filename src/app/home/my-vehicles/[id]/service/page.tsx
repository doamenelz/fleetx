"use client";

//TODO: Show Loading State
//TODO: Show Loading Errors
import {
  BreadCrumb,
  Button,
  BUTTON_SKIN,
  GRID_TYPE,
  GridLayout,
  ICON_POSITION,
  Lbl,
  PageContainer,
  PlainCard,
  SCREEN_WIDTH,
  SearchField,
} from "@/components";
import { Vehicle } from "@/models";
import { usePathname } from "next/navigation";
import { FC, useContext, useEffect, useState } from "react";
import sampleVehicles from "../../../../../models/sample/vehicles.json";
import {
  ServiceEntry,
  ServiceSummary,
} from "@/models/ServiceAndRecalls/Service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VehicleServiceTableList } from "@/app/inventory/components/VehicleServiceTable";
import { VehicleDetailsContext } from "@/app/inventory/contexts/VehicleDetailsContext";
import { ServiceSummaryCard } from "@/app/service/components";
import { APICompletion } from "@/lib/utilities/apiHelper";
import serviceHome from "../../../../../models/sample/serviceHome.json";
export default function Page() {
  const vehicleContext = useContext(VehicleDetailsContext);
  const loc = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();
  const [serviceCompletion, setServiceCompletion] = useState<APICompletion>();
  const [serviceReminders, setServiceReminders] = useState(serviceHome.items);

  const breadcrumbs: BreadCrumb[] = [
    {
      name: "Service",
      href: "",
      id: "03",
      type: "highlighted",
    },
    {
      name: "Home",
      href: "/home",
      id: "01",
      type: "main",
    },
    {
      name: "My Vehicles",
      href: "",
      type: "base",
      id: "02",
    },
  ];

  useEffect(() => {
    const vehicleDetails = sampleVehicles.find(
      (vehicle) => vehicle.id === String(loc.split("/")[3])
    );
    setServiceCompletion({
      success: true,
      data: serviceHome as {
        summary: ServiceSummary;
        items: ServiceEntry[];
      },
      status: 200,
      errorMessage: "",
    });

    setIsLoading(false);

    setSelectedVehicle(vehicleContext.vehicle);
  }, []);
  return (
    <PageContainer
      documentTitle={`My Vehicles - ${selectedVehicle?.name}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={breadcrumbs.sort((a, b) => Number(a.id) - Number(b.id))}
    >
      {isLoading && <></>}
      {!isLoading && serviceCompletion?.success && (
        <div className="pt-2">
          <GridLayout
            type={GRID_TYPE.twoOne}
            lhs={
              <PlainCard>
                <div className="sticky top-0">
                  <div className="flex pt-2 justify-between items-center">
                    <SearchField
                      placeholder="Search"
                      setQuery={() => {}}
                    />

                    <div className="flex gap-2 items-center">
                      <Lbl
                        label={
                          serviceCompletion.data.items.length > 10
                            ? `10 of ${serviceCompletion.data.items.length} results`
                            : `${serviceCompletion.data.items.length} result(s)`
                        }
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
                  <VehicleServiceTableList
                    data={serviceCompletion.data.items}
                  />
                </div>
              </PlainCard>
            }
            rhs={
              <>
                <ServiceSummaryCard data={serviceCompletion.data.summary} />
              </>
            }
          ></GridLayout>
        </div>
      )}
    </PageContainer>
  );
}
