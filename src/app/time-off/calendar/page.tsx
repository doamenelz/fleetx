"use client";
import { BackHeader, PageContainer, SCREEN_WIDTH } from "@/components";
import { Calendar } from "@/components/Calendar/CalendarFull";

export default function Page() {
  return (
    <PageContainer
      documentTitle="Calendar"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <>
        <BackHeader previousPathName="" />
        <Calendar />
      </>
    </PageContainer>
  );
}
