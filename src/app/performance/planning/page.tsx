"use client";
import { PageContainer, SCREEN_WIDTH } from "@/components";

export default function Page() {
  return (
    <PageContainer
      documentTitle="Performance - Planning"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
    >
      Performance Planning
    </PageContainer>
  );
}
