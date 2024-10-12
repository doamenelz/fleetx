import React from "react";
export const InnerSideNavigationContext = React.createContext<{
  selectedView: string;
  updateSelectedView: Function;
}>({
  selectedView: "",
  updateSelectedView: () => {},
});
