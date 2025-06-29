import { JSX } from "react";

export interface TabItem {
  label?: string;
  icon?: {
    asset: JSX.Element;
    position: "leading" | "trailing";
  };
  id: string;
  badge?: boolean;
  fillWidth?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  tabHandler: Function;
  selectedTab: string;
  fillWidth?: boolean;
}
