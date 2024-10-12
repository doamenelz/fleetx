"use client";

import {
  BackHeader,
  GRID_TYPE,
  GridLayout,
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  TextLabel,
  StatusBadge,
  STATUS_COLORS,
  AvatarCell,
  AVATAR_SIZES,
  Timeline,
  timelineActivities,
  Accordion,
} from "@/components";
import { sampleBalances } from "../../models/Balances";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
import { appraisalActivities } from "@/modules/MyBio/models/AppraisalTimeline";

export default function Page({ params }: { params: { id: string } }) {
  const _leaveDetails = sampleBalances.find((p) => p.type === params.id);

  return (
    <PageContainer
      documentTitle="My Profile"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <BackHeader previousPathName="" />
      <SectionHeader title="Request Time Off" copy={_leaveDetails?.name} />
      <GridLayout
        type={GRID_TYPE.twoOne}
        lhs={
          <div className="space-y-6 p-4 rounded-md border border-slate-200 my-4 bg-zinc-50">
            <GridLayout type={GRID_TYPE.twoCol}>
              <TextLabel label="Leave Type" copy={_leaveDetails?.name} />
              <TextLabel label="Available" copy={_leaveDetails?.available} />
              <TextLabel label="Limit" copy={_leaveDetails?.limit} />
              <TextLabel label="Earned" copy={"12 Days"} />
              <TextLabel label="Earnable Allowance" copy={"NGN 200,142.22"} />
              <TextLabel
                label="Outstanding Allowance"
                copy={"NGN 250,000.45"}
              />
            </GridLayout>
          </div>
        }
        rhs={
          <div className="my-4">
            <Accordion
              id="approvals"
              defaultOpen={true}
              style="section"
              title="Approvals"
              body={
                <div className="space-y-6 p-4 rounded-md border border-indigo-50 my-2">
                  <Timeline data={appraisalActivities} />
                </div>
              }
            />
          </div>
        }
      ></GridLayout>
    </PageContainer>
  );
}
