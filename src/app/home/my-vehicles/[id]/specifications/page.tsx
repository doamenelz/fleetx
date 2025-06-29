"use client";

import {
  Accordion,
  BreadCrumb,
  GRID_TYPE,
  GridLayout,
  ListTable,
  PageContainer,
  SCREEN_WIDTH,
} from "@/components";
import { Vehicle } from "@/models";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import sampleVehicles from "../../../../../models/sample/vehicles.json";
import { VehicleDetailsContext } from "@/app/inventory/contexts/VehicleDetailsContext";
export default function Page() {
  const vehicleContext = useContext(VehicleDetailsContext);
  const loc = usePathname();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  const breadcrumbs: BreadCrumb[] = [
    {
      name: "Specifications",
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
      <GridLayout
        type={GRID_TYPE.twoFlex}
        verticalPadding
        colOne={
          <>
            <Accordion
              title="General"
              copy=""
              id=""
              defaultOpen={true}
              style="section"
              body={
                <ListTable
                  data={sampleVehicles[0]?.features!.map((feature, index) => ({
                    key: feature.key,
                    value: Array.isArray(feature.value) ? (
                      <div className="space-y-3">
                        {feature.value.map((item: string) => (
                          <p className="mt-1 text-xs leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
                            {item}
                          </p>
                        ))}
                      </div>
                    ) : (
                      feature.value
                    ),
                    id: index.toString(),
                  }))}
                />
              }
            />
            <Accordion
              title="Wheels and Tires"
              copy=""
              id=""
              style="section"
              body={<ListTable data={selectedVehicle?.wheelsAndTires ?? []} />}
            />
            <Accordion
              title="Engine"
              copy=""
              id=""
              style="section"
              body={<ListTable data={selectedVehicle?.engine ?? []} />}
            />
            <Accordion
              title="Features"
              copy=""
              id=""
              style="section"
              body={<ListTable data={selectedVehicle?.wheelsAndTires ?? []} />}
            />
          </>
        }
        colTwo={
          <>
            <Accordion
              title="Weight and Dimensions"
              defaultOpen={true}
              copy=""
              id=""
              style="section"
              body={
                <ListTable data={selectedVehicle?.weightAndDimensions ?? []} />
              }
            />
            <Accordion
              title="Fuel & Energy"
              copy=""
              id=""
              style="section"
              body={<ListTable data={selectedVehicle?.fuelAndEnergy ?? []} />}
            />
            <Accordion
              title="Other Information"
              copy=""
              id=""
              style="section"
              body={
                <ListTable data={selectedVehicle?.weightAndDimensions ?? []} />
              }
            />
          </>
        }
      ></GridLayout>
    </PageContainer>
  );
}
