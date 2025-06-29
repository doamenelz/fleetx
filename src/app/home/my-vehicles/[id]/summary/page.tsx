"use client";

import {
  BackHeader,
  BreadCrumb,
  PageContainer,
  PageLoader,
  SCREEN_WIDTH,
} from "@/components";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { VehicleDetailsContext } from "@/app/inventory/contexts/VehicleDetailsContext";
import { VehicleSummaryView } from "@/app/inventory/components/VehicleSummaryView";

//TODO: Update the Document Title
export default function Page({ params }: { params: { id: string } }) {
  const vehicleContext = useContext(VehicleDetailsContext);

  const tabs: BreadCrumb[] = [
    {
      name: "Summary",
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

  return (
    <PageContainer
      documentTitle={`My Vehicles - ${vehicleContext.vehicle?.name}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={tabs.sort((a, b) => Number(a.id) - Number(b.id))}
    >
      <VehicleSummaryView vehicle={vehicleContext.vehicle!} />
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
