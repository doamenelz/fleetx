"use client";
import { PageContainer, SCREEN_WIDTH, SectionHeader } from "@/components";
import { ConfirmationScorecardSettingsTable } from "./ConfirmationScoreCardSettingTable";
import { useState, useRef, useEffect } from "react";

export default function Page() {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  return (
    <PageContainer
      documentTitle="Profile - Appraisal Scorecard"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div className=" py-4 space-y-2">
        <SectionHeader
          title="Scorecard"
          copy="Employee Confirmation Scorecard Settings"
        />
        <ConfirmationScorecardSettingsTable data={[]} />
      </div>
    </PageContainer>
  );
}
