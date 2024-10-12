"use client";
import { BackHeader, PageContainer, SCREEN_WIDTH } from "@/components";
import { HRDocuments } from "@/modules/HRServices";
import data from "../../../modules/HRServices/components/hrDocsData.json";

export default function Page() {
  return (
    <PageContainer
      documentTitle="HR Services - Documents"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
    >
      <HRDocuments data={data} />
    </PageContainer>
  );
}
