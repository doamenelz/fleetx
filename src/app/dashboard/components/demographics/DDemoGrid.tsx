import {
  RDemBusinessUnit,
  RDemContractType,
  RDemEmpTrend,
  RDemGender,
} from "@/app/people/components";
import { CARD_SPAN, GRID_TYPE, GridLayout } from "@/components";
import { COMPONENT_ALIAS_ID } from "@/models/ComponentAliasEnums";
import { getReportInfo } from "@/models/ReportWidgetConfig";

export const DashboardDemographicsGrid = () => {
  return (
    <>
      <GridLayout type={GRID_TYPE.twoCol}>
        <RDemEmpTrend
          config={getReportInfo(COMPONENT_ALIAS_ID.RDemEmpTrend)!}
          span={CARD_SPAN.oneFullOnSmall}
        />
        <RDemGender config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!} />
        <RDemBusinessUnit
          config={getReportInfo(COMPONENT_ALIAS_ID.RDemBusinessUnit)!}
        />
        <RDemContractType
          config={getReportInfo(COMPONENT_ALIAS_ID.RDemContractType)!}
        />
      </GridLayout>
    </>
  );
};
