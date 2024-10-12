"use client";
import {
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  StatusBadge,
  STATUS_COLORS,
  UnderConstruction,
} from "@/components";
// import UnderConstruction from "@/components/PageContainer/UnderConstruction";
export default function Page() {
  return (
    <PageContainer
      documentTitle="Profile - Job Details"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
    >
      <UnderConstruction />
    </PageContainer>
  );
}
