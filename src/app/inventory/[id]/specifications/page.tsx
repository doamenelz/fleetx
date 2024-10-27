"use client";

import {
  Accordion,
  CardWithSectionHeader,
  CustomCardWithTitle,
  GRID_TYPE,
  GridLayout,
  ListTable,
  PageContainer,
  SCREEN_WIDTH,
} from "@/components";
import { sampleVehicles, Vehicle } from "@/models";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
      breadCrumbs={getVehicleBreadCrumbs(loc, "2")}
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
