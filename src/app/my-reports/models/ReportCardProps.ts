import { ReportConfig } from "@/models/ReportWidgetConfig";
import { HTMLAttributes } from "react";
import { ReportViewCardModel } from "./ReportModels";
export type ReportCardProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  withOpacity?: boolean;
  isDragging?: boolean;
  config?: ReportConfig;
  userWidgetList?: ReportViewCardModel[];
  updateWidgetList?: Function;
  _sampleReports?: ReportViewCardModel[];
};
