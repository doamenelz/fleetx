import React from "react";
import { ReportViewCardModel } from "./ReportModels";
export const MyReportContext = React.createContext<{
  /** List of all the Reports the User has access to. */
  reports: ReportViewCardModel[];
  /** Function to update the List of Reports user has access to. Will be triggered on `SAVE` */
  updateReports: Function;
}>({
  reports: [],
  updateReports: () => {},
});
