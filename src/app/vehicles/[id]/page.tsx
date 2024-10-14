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

//TODO: Update the Document Title
export default function Page({ params }: { params: { id: string } }) {
  // const _leaveDetails = sampleBalances.find((p) => p.type === params.id);

  useEffect(() => {
    const vehicleDetails = sampleVehicles.find(
      (vehicle) => vehicle.id === params.id
    );
    setSelectedVehicle(vehicleDetails);
    simulateLoader(setIsLoading, 2000);
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  return (
    <PageContainer
      documentTitle={`Vehicles - ${selectedVehicle?.generalInfo.name}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
    >
      {isLoading ? ( //max-h-[calc(100vh_-_260px)]
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting Summary.." }} />
        </div>
      ) : (
        <>
          <VehicleSummaryView vehicle={selectedVehicle!} />
        </>
      )}
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
