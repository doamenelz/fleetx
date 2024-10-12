"use client";
import {
  PageContainer,
  SCREEN_WIDTH,
  Button,
  ICON_POSITION,
  SectionHeader,
} from "@/components";
import { JobHistoryTable, KinAndBeneficiariesTable } from "@/modules/MyBio";
import data from "../../../modules/MyBio/models/jobHistoryData.json";
import { AtSymbolIcon, PlusIcon } from "@heroicons/react/20/solid";
import { JobSummaryCard } from "@/app/my-bio/components/JobSummaryCard";

export default function Page() {
  return (
    <PageContainer
      documentTitle="Profile - Job Details"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div className="space-y-4 py-4">
        <SectionHeader
          title="Job Information"
          copy="Manage your Next of Kin, Beneficiaries and Dependents"
        />
        <JobSummaryCard />
        <div className="py-8 space-y-4">
          <SectionHeader title="Job History" />
          <JobHistoryTable data={data} />
        </div>
      </div>
    </PageContainer>
  );
}
