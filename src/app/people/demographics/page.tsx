"use client";
import {
  CustomCardWithTitle,
  BodyCopy,
  Button,
  CARD_SPAN,
  GRID_TYPE,
  GridLayout,
  MenuDropdown,
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  setScreenWidth,
} from "@/components";
import { classNames } from "@/lib/utilities/helperFunctions";
import {
  DemographicsHeader,
  RDemAge,
  RDemEmpTrend,
  RDemGender,
  RDemGeoPolitical,
  RDemMarital,
  RDemSummary,
} from "../components";
import { getReportInfo } from "@/models/ReportWidgetConfig";
import { COMPONENT_ALIAS_ID } from "@/models/ComponentAliasEnums";

export default function Page() {
  return (
    <PageContainer
      documentTitle="Analytics | People | Demographics"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
      showFooter
      // bgColor="bg-slate-50"
    >
      <div
        className={classNames(
          setScreenWidth(SCREEN_WIDTH.full),
          "py-2 lg:px-4 space-y-6"
        )}
      >
        <SectionHeader title="Demographics" />
        {/* <DemographicsHeader /> */}

        <GridLayout
          type={GRID_TYPE.twoOne}
          lhs={
            <GridLayout type={GRID_TYPE.twoCol}>
              <RDemEmpTrend
                span={CARD_SPAN.full}
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemEmpTrend)!}
              />
            </GridLayout>
          }
          rhs={
            <>
              <RDemSummary />
            </>
          }
        ></GridLayout>
        <GridLayout type={GRID_TYPE.threeCol}>
          <RDemAge />
          <RDemMarital />
          <RDemGender config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!} />
        </GridLayout>
        <GridLayout type={GRID_TYPE.twoCol}>
          <RDemGender config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!} />
          <RDemGeoPolitical />
        </GridLayout>
      </div>
    </PageContainer>
  );
}

/**
 * Distribution by ethnicity, country, state,
 * By Directorate
 *
 *
 */
