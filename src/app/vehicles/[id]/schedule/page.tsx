"use client";

import { PageContainer, SCREEN_WIDTH } from "@/components";
import { Calendar } from "@/components/Calendar/CalendarFull";
import { ScheduleView } from "@/app/vehicles/components/SchedulePlan";

export default function Page() {
  return (
    <PageContainer
      documentTitle="Schedule"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={false}
    >
      <ScheduleView />
    </PageContainer>
  );
}
