"use client";
import { PageContainer, SCREEN_WIDTH } from "@/components";

export default function Page() {
  return (
    <PageContainer
      documentTitle="My Profile"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
    >
      Time Off
    </PageContainer>
  );
}
