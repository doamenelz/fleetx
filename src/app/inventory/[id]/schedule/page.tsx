"use client";

import { PageContainer, SCREEN_WIDTH } from "@/components";
import { Calendar } from "@/components/Calendar/CalendarFull";
import { ScheduleView } from "@/app/inventory/components/SchedulePlan";
import { getVehicleBreadCrumbs } from "../breadCrumbModel";
import { usePathname } from "next/navigation";

export default function Page() {
  const loc = usePathname();
  return (
    <PageContainer
      documentTitle="Schedule"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={getVehicleBreadCrumbs(loc, "5")}
    >
      <ScheduleView />
    </PageContainer>
  );
}
