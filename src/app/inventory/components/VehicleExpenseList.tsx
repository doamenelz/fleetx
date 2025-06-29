import { FC, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  TableContainer,
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  StatusBadge,
  SlideOutWrapper,
  TablePagination,
  TableControlIconButton,
  PageIndexMeta,
  EmptyTable,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { VehicleExpenseEntry } from "@/models";

import { getCompanyProfile } from "@/models/Shared/Configs";
import { RootContext } from "@/context/RootContext";
import { CompanyConfiguration } from "@/models/Shared/CompanyConfig";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { VehicleExpenseDetails } from "./VehicleExpenseDetails";
import {
  ListFilter,
  PackageOpen,
  Redo,
  Search,
  TriangleAlert,
} from "lucide-react";
import { da } from "@faker-js/faker";
import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";
import { usePathname } from "next/navigation";

export const VehicleExpenseList: FC<{ vehicleId: string }> = ({
  vehicleId,
}) => {
  const rootContext = useContext(RootContext);
  const pathName = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [expensesCompletion, setExpensesCompletion] = useState<APICompletion>();
  const [selectedExpense, setSelectedExpense] = useState<VehicleExpenseEntry>();
  const company = getCompanyProfile(
    rootContext.envVar.baseURL
  ) as CompanyConfiguration;

  //----- Page Controls ----
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<VehicleExpenseEntry[]>([]);
  const [pageIndexMeta, setPageIndexMeta] = useState<PageIndexMeta>();

  const showModalHandler = () => {
    setShowModal(false);
    // setIsLoading(false);
    // simulateLoader(setIsLoading, 2000);
  };

  const viewServiceDetailsHandler = (expense: VehicleExpenseEntry) => {
    setSelectedExpense(expense);
    // setSelectedService(id);
    setShowModal(true);
  };

  const getExpenses = async () => {
    const api = await apiHandler({
      url: `${
        rootContext.envVar.baseURL
      }/expenses?vehicleId=${vehicleId}&page=${currentPage}&pageSize=${10}`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      setEntries(api.data.results);
      setTotalPages(api.data.totalNumberOfPages);
      setTotalResults(api.data.count);
      setPageIndexMeta(api.data.pageIndexMeta);
    }
    console.log("API Response: ", api);
    setExpensesCompletion(api);
    setIsLoading(false);
  };

  //------ Search Controls -----
  const [searchModal, setSearchModal] = useState(false);
  const searchModalHandler = () => {
    setSearchModal(false);
  };

  useEffect(() => {
    getExpenses();
  }, [currentPage]);

  const darkHeader = false;

  useEffect(() => {}, [currentPage]);

  return (
    <>
      <TableContext.Provider
        value={{
          updateData: () => {},
          updatePageDetails: () => {},
          currentPage: currentPage,
          setCurrentPage: setCurrentPage,
          totalPages: totalPages,
          totalResults: totalResults,
          tableMax: 12,
          data: [],
          page: { totalResults: 15, tableMax: 8 },
        }}
      >
        <TableContainer
          sectionHeader={{
            header: "Expenses",
            copy: "All Expenses associated with this vehicle",
            button: (
              <div className="flex items-center gap-2">
                {totalResults > 0 && (
                  <p className="text-xs pr-2 border-r">
                    Showing{" "}
                    {expensesCompletion?.data.pageIndexMeta?.startRecord} -{" "}
                    {expensesCompletion?.data.pageIndexMeta?.endRecord} of{" "}
                    {totalResults} Results
                  </p>
                )}
                <TableControlIconButton
                  icon={<Search className="size-4" />}
                  onClick={() => setSearchModal(true)}
                />
                <TableControlIconButton
                  icon={<ListFilter className="size-4" />}
                  onClick={() => {}}
                />
              </div>
            ),
          }}
          mainContent={
            <>
              {expensesCompletion?.success === true &&
                expensesCompletion.status === 200 && (
                  <>
                    <Table
                      head={
                        <>
                          <TableHeadCell
                            label={"# ID"}
                            mainCell={true}
                            hideOnMobile={false}
                            isDark={darkHeader}
                          />
                          <TableHeadCell
                            label={"Summary"}
                            mainCell={false}
                            hideOnMobile={false}
                            isDark={darkHeader}
                          />
                          <TableHeadCell
                            label={"Expense Date"}
                            mainCell={false}
                            hideOnMobile={false}
                            isDark={darkHeader}
                          />
                          <TableHeadCell
                            label={"Type"}
                            mainCell={false}
                            hideOnMobile={false}
                            isDark={darkHeader}
                          />
                          <TableHeadCell
                            label={"Amount"}
                            mainCell={false}
                            hideOnMobile={false}
                            isDark={darkHeader}
                            centerCell
                          />
                          <TableHeadCell
                            isDark={darkHeader}
                            label={"Status"}
                            mainCell={false}
                            hideOnMobile={false}
                            centerCell={true}
                          />
                        </>
                      }
                      body={
                        <>
                          {entries.map((expense, index) => (
                            <TableRow key={expense.id}>
                              <TableCell
                                label={
                                  <button
                                    onClick={() =>
                                      viewServiceDetailsHandler(expense)
                                    }
                                    className="hover:text-indigo-700 font-semibold text-indigo-800"
                                  >
                                    <p>{expense.id}</p>
                                  </button>
                                }
                                mainCell={false}
                                hideOnMobile={false}
                                isLoading={isLoading}
                              />

                              <TableCell
                                label={expense.summary}
                                mainCell={false}
                                hideOnMobile={false}
                                isLoading={isLoading}
                              />
                              <TableCell
                                label={formatDate(
                                  new Date(expense.expenseDate),
                                  DATE_OPTIONS.dMY
                                )}
                                mainCell={false}
                                hideOnMobile={false}
                                isLoading={isLoading}
                              />
                              <TableCell
                                label={`${expense.type.toUpperCase()}`}
                                mainCell={false}
                                hideOnMobile={false}
                                isLoading={isLoading}
                              />
                              <TableCell
                                label={
                                  <p className="font-mono">{`${
                                    company.currency.code
                                  }${
                                    expense.status === "approved"
                                      ? expense.cost.approvedAmount
                                      : expense.cost.reportedAmount
                                  }`}</p>
                                }
                                centerCell
                                mainCell={false}
                                hideOnMobile={false}
                                isLoading={isLoading}
                              />
                              <TableCell
                                label={
                                  <StatusBadge
                                    showDot
                                    style="text"
                                    label={expense.status}
                                  />
                                }
                                centerCell
                                mainCell={false}
                                hideOnMobile={false}
                                isLoading={isLoading}
                              />
                            </TableRow>
                          ))}
                        </>
                      }
                    />
                    {totalPages !== undefined && totalPages > 1 && (
                      <TablePagination />
                    )}
                  </>
                )}
              {expensesCompletion?.success === false &&
                expensesCompletion.status !== 404 && (
                  <EmptyTable
                    title="Something went wrong"
                    copy={
                      expensesCompletion?.errorMessage ??
                      "Unable to fetch data."
                    }
                    image={
                      <div>
                        <TriangleAlert className="size-8 mx-auto text-error-400" />
                      </div>
                    }
                    action={
                      <Button
                        onClick={getExpenses}
                        label="Retry"
                        skin={BUTTON_SKIN.secondary}
                        icon={{
                          asset: <Redo className="size-3" />,
                          position: ICON_POSITION.trailing,
                        }}
                      />
                    }
                  />
                )}
              {expensesCompletion?.success === false &&
                expensesCompletion.status === 404 && (
                  <EmptyTable
                    title={expensesCompletion?.errorMessage ?? "Nothing Found"}
                    image={
                      <div>
                        <PackageOpen className="size-8 mx-auto text-gray-600" />
                      </div>
                    }
                  />
                )}
            </>
          }
        ></TableContainer>
      </TableContext.Provider>
      {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="max-w-md"
        >
          <VehicleExpenseDetails expense={selectedExpense!} />
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
      {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={searchModalHandler}
          openControl={searchModal}
          size="max-w-md"
        >
          <p>Search</p>
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </>
  );
};
