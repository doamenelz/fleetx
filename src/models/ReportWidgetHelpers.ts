import { COMPONENT_ALIAS_ID } from "./ComponentAliasEnums";
import { ReportWidgetList } from "./ReportWidgetList";

export enum CHART_PLACEHOLDER {
  bar,
  pie,
  lineChart,
}

export enum REPORT_CATEGORY {
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

export const getWidgetConfig = (alias: COMPONENT_ALIAS_ID) => {
  return ReportWidgetList.find((report) => report.aliasID === alias);
};
