import React from "react";

export const TableContext = React.createContext<{
  updatePageDetails: Function;
  data: any;
  updateData: Function;
  page: {
    start?: number;
    end?: number;
    totalResults: number;
    tableMax: number;
    nextPage?: Function;
    previousPage?: Function;
  };
}>({
  page: { start: 0, end: 0, totalResults: 0, tableMax: 0 },
  updatePageDetails: () => {},
  data: [],
  updateData: () => {},
});
