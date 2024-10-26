import { BreadCrumb } from "@/components";
import React from "react";
export const ModuleContainerContext = React.createContext<{
  headerLabel: string;
  /** Determines showing if the Page Header or BreadCrumbs should be showed */
  showHeader: boolean;
  breadCrumbs: BreadCrumb[];
  setShowHeader: Function;
}>({
  headerLabel: "",
  showHeader: true,
  breadCrumbs: [],
  setShowHeader: () => {},
});
