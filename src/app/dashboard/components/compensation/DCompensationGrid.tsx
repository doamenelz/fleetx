import {
  RCompNonPayrollSpending,
  RCompSplit,
  RCompTrend,
  RDeductionsTrend,
  TimePerGradePromotion,
} from "@/app/compensation/components";
import {
  RDemBusinessUnit,
  RDemContractType,
  RDemEmpTrend,
  RDemGender,
} from "@/app/people/components";
import { CARD_SPAN, GRID_TYPE, GridLayout } from "@/components";
import { COMPONENT_ALIAS_ID } from "@/models/ComponentAliasEnums";
import { getReportInfo } from "@/models/ReportWidgetConfig";

export const DashboardCompensationGrid = () => {
  return (
    <>
      <GridLayout type={GRID_TYPE.twoCol}>
        <RCompSplit
          config={getReportInfo(COMPONENT_ALIAS_ID.RCompSplit)!}
          span={CARD_SPAN.full}
        />
        <RDeductionsTrend
          span={CARD_SPAN.oneFullOnSmall}
          config={getReportInfo(COMPONENT_ALIAS_ID.RDeductionsTrend)!}
        />
        <RCompNonPayrollSpending
          config={getReportInfo(COMPONENT_ALIAS_ID.RCompNonPayrollSpending)!}
        />
      </GridLayout>
    </>
  );
};
