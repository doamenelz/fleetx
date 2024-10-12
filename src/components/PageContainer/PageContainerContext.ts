import React from "react";
export const PageContainerContext = React.createContext<{
  isLoading: boolean;
  updateIsLoading: Function;
}>({
  isLoading: false,
  updateIsLoading: () => {},
});
