import React from "react";
export const PageContainerContext = React.createContext<{
  isLoading: boolean;
  updateIsLoading: Function;
  isLoggedIn: boolean;
}>({
  isLoggedIn: false,
  isLoading: false,
  updateIsLoading: () => {},
});
