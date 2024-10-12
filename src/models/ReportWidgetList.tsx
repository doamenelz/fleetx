import {
  RDemBusinessUnit,
  RDemContractType,
  RDemEmpTrend,
  RDemGender,
} from "@/app/people/components";
import { COMPONENT_ALIAS_ID } from "./ComponentAliasEnums";
import { getReportInfo, ReportConfig } from "./ReportWidgetConfig";
import {
  RCompNonPayrollSpending,
  RCompSplit,
  RDeductionsTrend,
  TimePerGradePromotion,
} from "@/app/compensation/components";
import {
  EmployeeHireSummaryCard,
  PromotionsSummaryCard,
  SanctionsSummaryCard,
  TimeToHireStrata,
} from "@/app/workforce/components";
import { CARD_SPAN } from "@/components";

// export const getWidgetConfig = (alias: COMPONENT_ALIAS_ID) => {
//   return ReportWidgetList.find((report) => report.aliasID === alias);
// };
export interface ReportWidgetConfig {
  aliasID: COMPONENT_ALIAS_ID;
  config: ReportConfig;
  component: JSX.Element;
}
export const ReportWidgetList: ReportWidgetConfig[] = [
  {
    aliasID: COMPONENT_ALIAS_ID.RDemEmpTrend,
    config: getReportInfo(COMPONENT_ALIAS_ID.RDemEmpTrend)!,
    component: (
      <RDemEmpTrend config={getReportInfo(COMPONENT_ALIAS_ID.RDemEmpTrend)!} />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RCompSplit,
    config: getReportInfo(COMPONENT_ALIAS_ID.RCompSplit)!,
    component: (
      <RCompSplit config={getReportInfo(COMPONENT_ALIAS_ID.RCompSplit)!} />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RDeductionsTrend,
    config: getReportInfo(COMPONENT_ALIAS_ID.RDeductionsTrend)!,
    component: (
      <RDeductionsTrend
        span={CARD_SPAN.one}
        config={getReportInfo(COMPONENT_ALIAS_ID.RDeductionsTrend)!}
      />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RDemGender,
    config: getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!,
    component: (
      <RDemGender config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!} />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.EmployeeHireSummaryCard,
    config: getReportInfo(COMPONENT_ALIAS_ID.EmployeeHireSummaryCard)!,
    component: (
      <EmployeeHireSummaryCard
        span={CARD_SPAN.full}
        config={getReportInfo(COMPONENT_ALIAS_ID.EmployeeHireSummaryCard)!}
      />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RDemBusinessUnit,
    config: getReportInfo(COMPONENT_ALIAS_ID.RDemBusinessUnit)!,
    component: (
      <RDemBusinessUnit
        config={getReportInfo(COMPONENT_ALIAS_ID.RDemBusinessUnit)!}
      />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RDemContractType,
    config: getReportInfo(COMPONENT_ALIAS_ID.RDemContractType)!,
    component: (
      <RDemContractType
        config={getReportInfo(COMPONENT_ALIAS_ID.RDemContractType)!}
      />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RCompNonPayrollSpending,
    config: getReportInfo(COMPONENT_ALIAS_ID.RCompNonPayrollSpending)!,
    component: (
      <RCompNonPayrollSpending
        config={getReportInfo(COMPONENT_ALIAS_ID.RCompNonPayrollSpending)!}
      />
    ),
  },

  {
    aliasID: COMPONENT_ALIAS_ID.TimeToHireStrata,
    config: getReportInfo(COMPONENT_ALIAS_ID.TimeToHireStrata)!,
    component: (
      <TimeToHireStrata
        config={getReportInfo(COMPONENT_ALIAS_ID.TimeToHireStrata)!}
      />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.TimePerGradePromotion,
    config: getReportInfo(COMPONENT_ALIAS_ID.TimePerGradePromotion)!,
    component: (
      <TimePerGradePromotion
        config={getReportInfo(COMPONENT_ALIAS_ID.TimePerGradePromotion)!}
      />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.PromotionsSummaryCard,
    config: getReportInfo(COMPONENT_ALIAS_ID.PromotionsSummaryCard)!,
    component: (
      <PromotionsSummaryCard
        config={getReportInfo(COMPONENT_ALIAS_ID.PromotionsSummaryCard)!}
      />
    ),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.SanctionsSummaryCard,
    config: getReportInfo(COMPONENT_ALIAS_ID.SanctionsSummaryCard)!,
    component: (
      <SanctionsSummaryCard
        config={getReportInfo(COMPONENT_ALIAS_ID.SanctionsSummaryCard)!}
      />
    ),
  },
];
