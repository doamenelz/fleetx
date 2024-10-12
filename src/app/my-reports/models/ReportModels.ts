import { ALL_REPORTS, ReportConfig } from "@/models/ReportWidgetConfig";

export interface ReportViewCardModel {
  id: string;
  isAdded: boolean;
}

/** This function compares the BE return report list the user has access to
 *  with the master report list and returns an array of ReportConfigurations  */
export const accessibleReports = (
  reportContextReport: ReportViewCardModel[]
) => {
  var _compiledReports: ReportConfig[] = [];
  ALL_REPORTS.forEach((report) => {
    var _item = reportContextReport.find(
      (item) => item.id === report.aliasID.toString()
    );
    if (_item) {
      _compiledReports.push(report);
    }
  });

  return _compiledReports;
};

export const sampleReports: ReportViewCardModel[] = [
  { id: "RDemEmpTrend", isAdded: false },
  { id: "RCompSplit", isAdded: false },
  { id: "EmployeeHireSummaryCard", isAdded: false },
  { id: "RDeductionsTrend", isAdded: false },
  { id: "RDemGender", isAdded: false },
  { id: "RDemBusinessUnit", isAdded: false },
  { id: "RDemContractType", isAdded: false },
  { id: "RCompNonPayrollSpending", isAdded: false },
  { id: "TimeToHireStrata", isAdded: false },
  { id: "TimePerGradePromotion", isAdded: false },
  { id: "PromotionsSummaryCard", isAdded: false },
  // { id: "SanctionsSummaryCard", isAdded: false, canAccess: true },
];

export const sampleReports2: ReportViewCardModel[] = [
  { id: "RDemEmpTrend", isAdded: false },
  { id: "RCompSplit", isAdded: false },
  { id: "EmployeeHireSummaryCard", isAdded: false },
  { id: "RDeductionsTrend", isAdded: false },
  { id: "RDemGender", isAdded: false },
  { id: "RDemBusinessUnit", isAdded: false },
  { id: "RDemContractType", isAdded: false },
  { id: "RCompNonPayrollSpending", isAdded: false },
  { id: "TimeToHireStrata", isAdded: false },
  { id: "TimePerGradePromotion", isAdded: false },
  { id: "PromotionsSummaryCard", isAdded: false },
  // { id: "SanctionsSummaryCard", isAdded: false, canAccess: true },
];
