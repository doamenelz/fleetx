import { BreadCrumb } from "@/components";
import React from "react";
export const ModuleContainerContext = React.createContext<{
  mainPage: BreadCrumb;
  /** Determines showing if the Page Header or BreadCrumbs should be showed */
  showHeader: boolean;
  breadCrumbs: BreadCrumb[];
  setShowHeader: Function;
  setBreadCrumbs: Function;
}>({
  mainPage: {
    id: "",
    name: "",
    href: "",
  },
  showHeader: true,
  breadCrumbs: [],
  setShowHeader: () => {},
  setBreadCrumbs: () => {},
});
