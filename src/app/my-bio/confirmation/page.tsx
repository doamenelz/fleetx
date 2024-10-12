"use client";
import {
  HeaderBackdrop,
  PageContainer,
  SCREEN_WIDTH,
  Avatar,
  AVATAR_SIZES,
} from "@/components";
import { AppraisalFormCard } from "@/modules/MyBio";

import { AtSymbolIcon, PlusIcon } from "@heroicons/react/20/solid";
import { sampleDocumentList } from "@/modules/MyBio/models/EmployeeDocument";
import { useState, useRef, useEffect, FC } from "react";
import { createPortal } from "react-dom";
import { sampleEmployee } from "@/models";
import { classNames } from "@/lib/utilities/helperFunctions";
import { appraisalActivities } from "@/modules/MyBio/models/AppraisalTimeline";

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
      <div className="space-y-2">
        <div>
          <HeaderBackdrop />
          <div>
            <Avatar
              firstName={sampleEmployee.bioData.firstName}
              lastName={sampleEmployee.bioData.lastName}
              size={AVATAR_SIZES.xxl}
              imageUrl={sampleEmployee.bioData.avatar}
            />
            <div className="mt-4 space-y-2 text-gray-700">
              <p className="text-2xl leading-7 font-semibold text-gray-900 items-center flex gap-2">
                {sampleEmployee.bioData.firstName}{" "}
                {sampleEmployee.bioData.lastName}
                <span
                  className={classNames(
                    sampleEmployee.hireInformation?.isConfirmed
                      ? "bg-success-50 text-success-600 ring-success-600/20"
                      : "bg-error-50 text-error-600 ring-error-600/20",
                    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset "
                  )}
                >
                  {sampleEmployee.hireInformation?.isConfirmed
                    ? "Confirmed"
                    : "Not Confirmed"}
                </span>
              </p>
              <p className="text-sm leading-6 text-gray-700">
                {sampleEmployee.jobInformation?.jobTitle}
              </p>

              {/* <p className="text-sm p-4 my-2 bg-primary-50 rounded-md max-w-2xl">
                Your employment is CONFIRMED, however, no confirmation appraisal
                records on the system. Contact HR for further information
              </p> */}

              <AppraisalFormCard />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
