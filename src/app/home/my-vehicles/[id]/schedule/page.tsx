"use client";

import { BreadCrumb, PageContainer, SCREEN_WIDTH } from "@/components";
import { ScheduleView } from "@/app/inventory/components/SchedulePlan";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { VehicleDetailsContext } from "@/app/inventory/contexts/VehicleDetailsContext";

export default function Page() {
  const vehicleContext = useContext(VehicleDetailsContext);
  const loc = usePathname();
  const breadcrumbs: BreadCrumb[] = [
    {
      name: "Schedule",
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
      documentTitle="Schedule"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={breadcrumbs.sort((a, b) => Number(a.id) - Number(b.id))}
    >
      <ScheduleView vehicleId={vehicleContext.vehicle?.id ?? ""} />
    </PageContainer>
  );
}
