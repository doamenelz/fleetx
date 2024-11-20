"use client";
import {
  Accordion,
  GRID_TYPE,
  GridLayout,
  InputHandler,
  PageContainer,
  QuickLink,
  SCREEN_WIDTH,
  setScreenWidth,
} from "@/components";
import { EmployeeHero } from "../my-bio/components";
import { sampleEmployee } from "@/models";
import { classNames, simulateLoader } from "@/lib/utilities/helperFunctions";
import { AnnualRemunerationCard } from "./components/LastPayslipCard";
import { PayDetails } from "./components/PayDetails";
import { EarningsTable, SummaryHeader } from "./components/EarningsTable";
import { FC, useState } from "react";
import { RemittanceCard } from "./components/RemittanceCard";
import { OverviewToggle } from "./models/Inputs";
import { PayReviewCard } from "./components/PayReviewCard";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const togglePeriod = () => {
    setIsLoading(true);
    simulateLoader(setIsLoading, 1000);
  };
  return (
    <PageContainer
      documentTitle="My Profile"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showFooter={true}
    >
      <EmployeeHero
        employee={sampleEmployee}
        screenWidth={SCREEN_WIDTH.regular}
      />
      <div
        className={classNames(
          "px-4 py-8",
          setScreenWidth(SCREEN_WIDTH.regular)
        )}
      >
        <GridLayout
          type={GRID_TYPE.twoOne}
          lhs={
            <div className="space-y-8">
              <div className="space-y-4 bg-slate-50/10 p-2 rounded-md border-c-mid border ">
                <div className="flex justify-end items-center pb-2">
                  {/* <BodyCopy text="Overview" /> */}
                  <InputHandler
                    props={{ ...OverviewToggle, setValue: togglePeriod }}
                  />
                </div>
                {isLoading ? (
                  <div>p</div>
                ) : (
                  <>
                    <div className="md:flex justify-between mt-4  border border-c-mid bg-white rounded-sm">
                      <SummaryHeader
                        label="Total Net Pay"
                        copy="NGN 154,234.45"
                        type="net"
                      />
                      <SummaryHeader
                        label="Total Deductions"
                        copy="NGN 154,234.45"
                        type="deduction"
                      />
                      <SummaryHeader
                        label="Total Allowances"
                        copy="NGN 154,234.45"
                      />
                    </div>
                    <EarningsTable />
                    <RemittanceCard />
                  </>
                )}
              </div>
              <PayReviewCard />
            </div>
          }
          rhs={
            <>
              <div className="mb-4 space-y-8">
                <AnnualRemunerationCard />
              </div>

              <PayDetails />

              <HelpfulLinksSection />
            </>
          }
        ></GridLayout>
      </div>
    </PageContainer>
  );
}

const HelpfulLinksSection = () => {
  return (
    <Accordion
      id="helpful-links"
      defaultOpen={false}
      style="section"
      title="Helpful Links"
      body={
        <div className="p-2 space-y-2">
          <QuickLink
            id=""
            label="Understanding Your Pay"
            url=""
          />
          <QuickLink
            id=""
            label="Reimbursement Policy"
            url=""
          />
          <QuickLink
            id=""
            label="Overtime Policy"
            url=""
          />
        </div>
      }
    />
  );
};
