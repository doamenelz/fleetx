import React from "react";
export const HierarchialNavigationContext = React.createContext<{
  selectedView: string;
  updateSelectedView: Function;
}>({
  selectedView: "",
  updateSelectedView: () => {},
});
