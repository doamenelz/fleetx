import { TimePerGradePromotion } from "@/app/compensation/components";
import { DashboardOutOfOfficeList } from "@/app/home/components";
import {
  RDemBusinessUnit,
  RDemContractType,
  RDemEmpTrend,
  RDemGender,
} from "@/app/people/components";
import {
  EmployeeHireSummaryCard,
  PromotionsSummaryCard,
  SanctionsSummaryCard,
  TimeToHireStrata,
} from "@/app/workforce/components";
import { CARD_SPAN, GRID_TYPE, GridLayout } from "@/components";
import { COMPONENT_ALIAS_ID } from "@/models/ComponentAliasEnums";
import { getReportInfo } from "@/models/ReportWidgetConfig";

export const DashboardWorkforceGrid = () => {
  return (
    <>
      <GridLayout type={GRID_TYPE.twoCol}>
        <EmployeeHireSummaryCard
          span={CARD_SPAN.full}
          config={getReportInfo(COMPONENT_ALIAS_ID.EmployeeHireSummaryCard)!}
        />
        <DashboardOutOfOfficeList />
        <TimeToHireStrata
          config={getReportInfo(COMPONENT_ALIAS_ID.TimeToHireStrata)!}
        />
        <TimePerGradePromotion
          config={getReportInfo(COMPONENT_ALIAS_ID.TimePerGradePromotion)!}
        />
        <PromotionsSummaryCard
          config={getReportInfo(COMPONENT_ALIAS_ID.PromotionsSummaryCard)!}
        />
        <SanctionsSummaryCard
          config={getReportInfo(COMPONENT_ALIAS_ID.SanctionsSummaryCard)!}
        />
      </GridLayout>
    </>
  );
};
