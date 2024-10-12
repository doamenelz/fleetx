"use client";
import { PageContainer, SCREEN_WIDTH, SectionHeader } from "@/components";
import { ConfirmationPendingActionsTable } from "./ConfirmationPendingActionsTable";
import { AtSymbolIcon, PlusIcon } from "@heroicons/react/20/solid";
import { sampleDocumentList } from "@/modules/MyBio/models/EmployeeDocument";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { confirmationPendingActions } from "@/modules/MyBio/models/ConfirmationPendingAction";

export default function Page() {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  return (
    <PageContainer
      documentTitle="Profile - Appraisal"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div className=" py-4 space-y-2">
        <SectionHeader
          title="Pending Actions"
          copy="Submitted Confirmation Appraisals"
        />
        <ConfirmationPendingActionsTable data={confirmationPendingActions} />
      </div>
    </PageContainer>
  );
}
