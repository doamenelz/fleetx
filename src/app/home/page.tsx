"use client";
import {
  Accordion,
  BodyCopy,
  Button,
  GRID_TYPE,
  GridLayout,
  Lbl,
  PageContainer,
  SCREEN_WIDTH,
  SummaryCardHeader,
} from "@/components";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { sampleEmployee, sampleEmployeeList } from "@/models";
import {
  DashboardHeader,
  EmployeeCard,
  AnnouncementCard,
  ATOList,
} from "./components";
import { FC } from "react";
import { sampleAnnouncements } from "./models";
import { sampleTimeOffDetailsArray } from "../time-off/models";
import { ActiveUpcomingLeave } from "../time-off/components";
import { QuickLink } from "@/components";

const allPosts = sampleAnnouncements(15);

export default function Page() {
  const signedInEmo = sampleEmployee;
  return (
    <PageContainer
      documentTitle="Home"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showFooter={true}
    >
      <div className="pb-8 bg-gray-25 overscroll-contain">
        <DashboardHeader />
        <div className="max-w-3xl px-4 mx-auto lg:max-w-7xl sm:px-6 lg:px-8 space-y-6">
          <div className="py-8 space-y-1 border-b">
            <h1 className="text-2xl font-medium text-gray-700">
              Welcome back, {sampleEmployee.bioData.firstName}
            </h1>
            <div className="flex items-center space-x-1 text-sm text-gray-900">
              <p className="text-sm text-gray-700">
                Today - {formatDate(new Date(), DATE_OPTIONS.full)}
              </p>
            </div>
          </div>

          <GridLayout
            type={GRID_TYPE.twoOne}
            lhs={
              <div className="space-y-8">
                <EmployeeCard employee={signedInEmo} />
                <AnnouncementCard posts={allPosts} />
              </div>
            }
            rhs={
              <div className="space-y-6">
                <ActiveUpcomingLeave timeOff={sampleTimeOffDetailsArray[0]} />

                <ATOList />
                <HelpfulLinksSection isMobile={false} />
              </div>
            }
          ></GridLayout>
        </div>
      </div>
    </PageContainer>
  );
}

const HelpfulLinksSection: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <Accordion
      id="helpful-links"
      defaultOpen={!isMobile ? true : false}
      style="section"
      title="Quick Links"
      body={
        <div className="p-2 space-y-2">
          <QuickLink
            id=""
            label="Last Payslip"
            url=""
          />
          <QuickLink
            id=""
            label="Ask HR"
            url=""
          />
          <QuickLink
            id=""
            label="Payroll Review"
            url=""
          />
        </div>
      }
    />
  );
};
