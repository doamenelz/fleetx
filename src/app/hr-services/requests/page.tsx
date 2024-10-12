"use client";
import { PageContainer, SCREEN_WIDTH } from "@/components";

export default function Page() {
  return (
    <PageContainer
      documentTitle="HR Services - Requests"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
    >
      Requests
    </PageContainer>
  );
}
