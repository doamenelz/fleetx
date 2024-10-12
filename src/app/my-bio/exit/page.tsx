"use client";
import {
  PageContainer,
  SCREEN_WIDTH,
  STATUS_COLORS,
  SectionHeader,
  StatusBadge,
} from "@/components";
import { ExitManagementLeadCTA } from "@/modules/MyBio";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
export default function Page() {
  const [openControl, setOpenControl] = useState(false);

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  return (
    <PageContainer
      documentTitle="Profile - Documents"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div className=" py-4 space-y-2">
        <SectionHeader
          title="Exit & Resignation"
          copy="Initiate and Manage your Resignation process"
          button={
            <StatusBadge
              label="Dev in Progress"
              statusType={STATUS_COLORS.pending}
            />
          }
        />
        <div>
          <ExitManagementLeadCTA
            title="Start your Exit Process"
            copy="Submit your resignation letter and indicate your exit date"
            completedText="Completed"
            isCompleted={true}
            pendingText="Next"
            onClick={() => {}}
            cta={
              <Link href={"/my-bio/exit/start-exit"}>
                <p className="text-indigo-800 text-xs flex items-center my-2 gap-1 font-normal">
                  Next
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </p>
              </Link>
            }
          />
          <ExitManagementLeadCTA
            title="Complete your exit assessment"
            copy="You would be notified when to complete this step"
            completedText=""
            isCompleted={false}
            pendingText="Submit"
            onClick={() => {}}
          />
          <ExitManagementLeadCTA
            title="Clearance Status"
            copy="View your pending items and exit clearance statuses"
            completedText=""
            isCompleted={false}
            pendingText="Submit"
            onClick={() => {}}
          />
        </div>
      </div>
    </PageContainer>
  );
}
