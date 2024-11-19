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
import { useContext, useEffect, useState } from "react";
import { VehicleTableList } from "../components/VehicleTableList";
import { VehicleSummaryView } from "../components/VehicleSummaryView";
import { simulateLoader } from "@/lib/utilities/helperFunctions";
import { getVehicleBreadCrumbs } from "./breadCrumbModel";
import { usePathname } from "next/navigation";
import { VehicleDetailsContext } from "../contexts/VehicleDetailsContext";

//TODO: Update the Document Title
export default function Page({ params }: { params: { id: string } }) {
  const vehicleContext = useContext(VehicleDetailsContext);
  const loc = usePathname();

  return (
    <PageContainer
      documentTitle={`Vehicles - ${vehicleContext.vehicle?.name}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={getVehicleBreadCrumbs(loc, "1")}
    >
      <VehicleSummaryView vehicle={vehicleContext.vehicle!} />
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
