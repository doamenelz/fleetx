import React from "react";

export const TableContext = React.createContext<{
  updatePageDetails: Function;
  data: any;
  updateData: Function;
  totalPages: number;
  currentPage: number;
  totalResults: number;
  tableMax: number;
  setCurrentPage: (pageNumber: number) => void;

  page: {
    start?: number;
    end?: number;
    totalResults: number;
    tableMax: number;
    nextPage?: Function;
    previousPage?: Function;
    currentPageNumber?: number;
  };
}>({
  page: { start: 0, end: 0, totalResults: 0, tableMax: 0 },
  updatePageDetails: () => {},
  data: [],
  updateData: () => {},
  totalPages: 1,
  totalResults: 1,
  currentPage: 1,
  tableMax: 15,
  setCurrentPage: () => {},
});
