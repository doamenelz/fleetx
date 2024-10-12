import { COMPONENT_ALIAS_ID } from "./ComponentAliasEnums";

enum CHART_PLACEHOLDER {
  bar,
  pie,
  lineChart,
}

enum REPORT_CATEGORY {
  demographics,
  performance,
  people,
  workforce,
  expenses,
  compensation,
}

export const getPlaceholder = (type: CHART_PLACEHOLDER) => {
  switch (type) {
    case CHART_PLACEHOLDER.bar:
      return "/barChartPlaceholder.svg";
    case CHART_PLACEHOLDER.pie:
      return "/piePlaceholder.svg";
    case CHART_PLACEHOLDER.lineChart:
      return "/lineChartPlaceholder.svg";
    default:
      return "/barPlaceholder.svg";
  }
};

export const getReportCategory = (category: REPORT_CATEGORY) => {
  switch (category) {
    case REPORT_CATEGORY.demographics:
      return "Demographics";
    case REPORT_CATEGORY.performance:
      return "Performance";
    case REPORT_CATEGORY.people:
      return "People";
    case REPORT_CATEGORY.workforce:
      return "Workforce";
    case REPORT_CATEGORY.compensation:
      return "Compensation";
    case REPORT_CATEGORY.expenses:
      return "Expenses";
    default:
      return "Demographics";
  }
};

export interface ReportConfig {
  aliasID: COMPONENT_ALIAS_ID;
  title: string;
  category: string;
  placeholderImage: string;
}

export const getReportInfo = (componentAlias: COMPONENT_ALIAS_ID) => {
  return ALL_REPORTS.find((report) => report.aliasID === componentAlias);
};

export const getAllReportCategories = (reports: ReportConfig[]) => {
  var categories = new Set<string>();
  for (let index = 0; index < reports.length; index++) {
    const element = reports[index].category;
    categories.add(element);
  }
  return [...new Set(categories)];
};

export const ALL_REPORTS: ReportConfig[] = [
  {
    aliasID: COMPONENT_ALIAS_ID.RDemEmpTrend,
    title: "Employee Count",
    category: getReportCategory(REPORT_CATEGORY.demographics),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.bar),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RCompSplit,
    title: "Payroll (Contract Type)",
    category: getReportCategory(REPORT_CATEGORY.compensation),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.lineChart),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RDeductionsTrend,
    title: "Deductions",
    category: getReportCategory(REPORT_CATEGORY.compensation),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.lineChart),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.EmployeeHireSummaryCard,
    title: "Overview (Year to Date)",
    category: getReportCategory(REPORT_CATEGORY.workforce),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.lineChart),
  },

  {
    aliasID: COMPONENT_ALIAS_ID.RDemGender,
    title: "Distribution by Gender (Cadre)",
    category: getReportCategory(REPORT_CATEGORY.demographics),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.lineChart),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RDemBusinessUnit,
    title: "Distribution by Business Function",
    category: getReportCategory(REPORT_CATEGORY.demographics),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.pie),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RDemContractType,
    title: "Distribution by Contract Type",
    category: getReportCategory(REPORT_CATEGORY.demographics),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.pie),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.RCompNonPayrollSpending,
    title: "Non Payroll Spending",
    category: getReportCategory(REPORT_CATEGORY.expenses),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.pie),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.TimeToHireStrata,
    title: "Ave. Time to Hire (Cadre)",
    category: getReportCategory(REPORT_CATEGORY.workforce),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.bar),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.TimePerGradePromotion,
    title: "Ave. Time Spent p/Cadre before Compensation Increase",
    category: getReportCategory(REPORT_CATEGORY.workforce),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.bar),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.PromotionsSummaryCard,
    title: "Promotions by Grade (Cadre) YTD",
    category: getReportCategory(REPORT_CATEGORY.workforce),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.bar),
  },
  {
    aliasID: COMPONENT_ALIAS_ID.SanctionsSummaryCard,
    title: "Disciplinary Actions Overview (YTD)",
    category: getReportCategory(REPORT_CATEGORY.workforce),
    placeholderImage: getPlaceholder(CHART_PLACEHOLDER.pie),
  },
];
