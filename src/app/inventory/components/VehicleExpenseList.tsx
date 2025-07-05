import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
  PopoverContainer,
  PlainCard,
  BasicTextInputWithIcon,
  BasicTextInput,
  Dropdown,
  SectionHeader,
  DatePicker,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { VehicleExpenseEntry } from "@/models";

import { getCompanyProfile } from "@/models/Shared/Configs";
import { RootContext } from "@/context/RootContext";
import { CompanyConfiguration } from "@/models/Shared/CompanyConfig";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { VehicleExpenseDetails } from "./VehicleExpenseDetails";
import {
  ArrowRight,
  ListFilter,
  PackageOpen,
  Redo,
  Search,
  TriangleAlert,
} from "lucide-react";
import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Filter {
  id: string;
  value: string | Date;
}
export const VehicleExpenseList: FC<{ vehicleId: string }> = ({
  vehicleId,
}) => {
  const rootContext = useContext(RootContext);
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
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [url, setUrl] = useState<string>();
  const darkHeader = false;

  const showModalHandler = () => {
    setShowModal(false);
  };

  const viewServiceDetailsHandler = (expense: VehicleExpenseEntry) => {
    setSelectedExpense(expense);
    // setSelectedService(id);
    setShowModal(true);
  };

  const getExpenses = async () => {
    const _url: string[] = [];
    searchValue !== "" && _url.push(`&summary=${searchValue}`);
    url !== undefined && _url.push(url);
    const parameters = _url.join("");
    console.log("Parameters", parameters);
    const api = await apiHandler({
      url:
        `${
          rootContext.envVar.baseURL
        }/expenses?vehicleId=${vehicleId}&page=${currentPage}&pageSize=${10}` +
        parameters,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      setEntries(api.data.results);
      setTotalPages(api.data.totalNumberOfPages);
      setTotalResults(api.data.count);
      // setPageIndexMeta(api.data.pageIndexMeta);
    }
    console.log("API Response: ", api);
    setExpensesCompletion(api);
    setIsLoading(false);
  };

  //------ Search Controls -----
  const [filterModal, setFilterModal] = useState(false);
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getExpenses();
    }
  };
  const setFilterModalHandler = () => {
    setFilterModal(false);
  };

  const searchExpenseHandler = () => {
    // const _url: string[] = [url ?? ""];
    // _url.push(`&summary=${searchValue}`);
    // setUrl(_url.join(""));
    getExpenses();
  };

  useEffect(() => {
    getExpenses();
  }, [currentPage, url]);

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
              <div className=" space-y-1 justify-end">
                <div className="flex text-xs items-center gap-2 justify-end text-right">
                  <BasicTextInputWithIcon
                    id="expense-search"
                    label=""
                    placeholder="Expense Name"
                    onChangeHandler={(
                      event: React.FormEvent<HTMLInputElement>
                    ) => {
                      setSearchValue(event.currentTarget.value);
                    }}
                    value={searchValue}
                    onKeyDownAction={handleEnterPress}
                    icon={{
                      asset: <Search className="size-4 text-gray-400" />,
                      position: ICON_POSITION.leading,
                    }}
                    actionIcon={
                      <button
                        onClick={searchExpenseHandler}
                        className={clsx(
                          "p-1 rounded-sm group ",
                          searchValue !== ""
                            ? "hover:bg-gray-700 group-hover:text-white"
                            : "bg-gray-50"
                        )}
                        disabled={searchValue === "" ? true : false}
                      >
                        <ArrowRight
                          className={clsx(
                            "size-4",
                            searchValue !== ""
                              ? "text-gray-700 group-hover:text-white"
                              : "text-gray-200"
                          )}
                        />
                      </button>
                    }
                  />

                  <button onClick={() => setFilterModal(true)}>
                    <TableControlIconButton
                      style={clsx(
                        "p-2 border rounded-sm hover:bg-gray-700 hover:text-white",
                        activeFilters.length > 1
                          ? "bg-brand-persianBlue text-white"
                          : ""
                      )}
                      icon={<ListFilter className="size-4" />}
                    />
                  </button>
                </div>
                <div className="flex gap-2 justify-end items-center font-mono">
                  {totalResults > 0 && (
                    <p className=" pr-2 border-r-2 text-right text-[10px]">
                      {expensesCompletion?.data.pageIndexMeta?.startRecord} -{" "}
                      {expensesCompletion?.data.pageIndexMeta?.endRecord} of{" "}
                      {totalResults} Results
                    </p>
                  )}
                  {activeFilters.length > 0 && (
                    <p className="font-semibold  text-[10px]">FILTERS:</p>
                  )}
                  {activeFilters.map((filter) => (
                    <span
                      key={filter.id}
                      className="text-[10px] pr-2 border-r"
                    >
                      {filter.id}: {filter.value.toString()}
                    </span>
                  ))}
                </div>
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
                        <PackageOpen className="size-8 mx-auto text-gray-600 stroke-1" />
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
          closeControl={setFilterModalHandler}
          openControl={filterModal}
          size="max-w-md"
        >
          <FilterControls
            filters={activeFilters}
            setFilters={setActiveFilters}
            dismissModal={setFilterModalHandler}
            setUrl={setUrl}
          />
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </>
  );
};

enum DATE_RANGE_OPTIONS {
  allTime = "All Time",
  ytd = "Year to Date",
  last30 = "Last 30 Days",
  last60 = "Last 60 Days",
  custom = "Custom Range",
}

enum FILTER_IDS {
  status = "Status",
  startDate = "From",
  endDate = "To",
  dateRange = "Period",
  type = "Type",
}
const FilterControls: FC<{
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  dismissModal: () => void;
  setUrl: Dispatch<SetStateAction<string | undefined>>;
}> = ({ filters, setFilters, dismissModal, setUrl }) => {
  const getDataFromFilters = (filter: string, _default: any) => {
    const index = filters.findIndex((_filter) => _filter.id === filter);
    return index === -1 ? _default : filters[index].value;
  };
  const _baseDate = new Date();
  const statuses = ["Select a Status", "Approved", "New", "Declined"];
  const ranges = [
    DATE_RANGE_OPTIONS.allTime,
    DATE_RANGE_OPTIONS.last30,
    DATE_RANGE_OPTIONS.last60,
    DATE_RANGE_OPTIONS.ytd,
    DATE_RANGE_OPTIONS.custom,
  ];
  const [range, setRange] = useState<string>(
    getDataFromFilters(FILTER_IDS.dateRange, DATE_RANGE_OPTIONS.last60)
  );
  const types = ["Select a Type", "Fuel", "Service", "Repairs"];
  const [status, setStatus] = useState(
    getDataFromFilters(FILTER_IDS.status, "Select a Status")
  );
  const [startDate, setStartDate] = useState<Date>(
    getDataFromFilters(FILTER_IDS.startDate, _baseDate)
  );
  const [endDate, setEndDate] = useState<Date>(
    getDataFromFilters(FILTER_IDS.endDate, _baseDate)
  );
  const [type, setType] = useState(
    getDataFromFilters(FILTER_IDS.type, "Select a Type")
  );

  const applyFilters = () => {
    const url: string[] = [];
    const _filters: Filter[] = [];
    status !== "Select a Status" &&
      _filters.push({ id: FILTER_IDS.status, value: status });
    status !== "Select a Status" && url.push(`&status=${status}`);

    type !== "Select a Type" &&
      _filters.push({ id: FILTER_IDS.type, value: type });
    type !== "Select a Type" && url.push(`&type=${type}`);

    switch (range) {
      case DATE_RANGE_OPTIONS.allTime:
        _filters.push({
          id: FILTER_IDS.dateRange,
          value: DATE_RANGE_OPTIONS.allTime,
        });
        break;
      case DATE_RANGE_OPTIONS.last30:
        _filters.push({ id: FILTER_IDS.dateRange, value: range });

        const _start30 = new Date();
        _start30.setDate(today.getDate() - 30);

        _filters.push({
          id: FILTER_IDS.startDate,
          value: formatDate(_start30, DATE_OPTIONS.dMY),
        });
        const _end30 = new Date();
        _filters.push({
          id: FILTER_IDS.endDate,
          value: formatDate(_end30, DATE_OPTIONS.dMY),
        });
        url.push(
          `&startDate=${_start30.toISOString().split("T")[0]}&endDate=${
            _end30.toISOString().split("T")[0]
          }`
        );
        break;
      case DATE_RANGE_OPTIONS.last60:
        const _start60 = new Date();
        _start60.setDate(today.getDate() - 60);
        _filters.push({
          id: FILTER_IDS.startDate,
          value: formatDate(_start60, DATE_OPTIONS.dMY),
        });
        const _end60 = new Date();
        _filters.push({
          id: FILTER_IDS.endDate,
          value: formatDate(_end60, DATE_OPTIONS.dMY),
        });
        url.push(
          `&startDate=${_start60.toISOString().split("T")[0]}&endDate=${
            _end60.toISOString().split("T")[0]
          }`
        );
        break;
      case DATE_RANGE_OPTIONS.custom:
        url.push(
          `&startDate=${startDate.toISOString().split("T")[0]}&endDate=${
            endDate.toISOString().split("T")[0]
          }`
        );
        break;
      case DATE_RANGE_OPTIONS.ytd:
        const firstDayOfCurrentYear = new Date(new Date().getFullYear(), 0, 1);
        _filters.push({
          id: FILTER_IDS.startDate,
          value: formatDate(firstDayOfCurrentYear, DATE_OPTIONS.dMY),
        });
        _filters.push({
          id: FILTER_IDS.endDate,
          value: formatDate(new Date(), DATE_OPTIONS.dMY),
        });
        _filters.push({
          id: FILTER_IDS.dateRange,
          value: DATE_RANGE_OPTIONS.ytd,
        });
        url.push(
          `&startDate=${
            firstDayOfCurrentYear.toISOString().split("T")[0]
          }&endDate=${new Date().toISOString().split("T")[0]}`
        );
        break;

      default:
        break;
    }

    setFilters(_filters);
    setUrl(url.join(""));
    dismissModal();
  };

  const today = new Date();
  const oldDate = new Date();
  const minDate = new Date(oldDate.setFullYear(oldDate.getFullYear() - 21));
  const maxDate = new Date(today.setFullYear(today.getFullYear() + 21));
  return (
    <div className="p-4 space-y-4 text-xs font-normal">
      <SectionHeader title={"Filters"} />
      <Dropdown
        id={FILTER_IDS.status}
        label={FILTER_IDS.status}
        value={status}
        onChangeHandler={setStatus}
        items={statuses}
      />
      <Dropdown
        id={FILTER_IDS.type}
        label={FILTER_IDS.type}
        value={type}
        onChangeHandler={setType}
        items={types}
      />
      <Dropdown
        id={FILTER_IDS.dateRange}
        label={FILTER_IDS.dateRange}
        value={range}
        onChangeHandler={setRange}
        items={ranges}
      />
      {range === DATE_RANGE_OPTIONS.custom && (
        <>
          <DatePicker
            label={FILTER_IDS.startDate}
            id={FILTER_IDS.startDate}
            onChangeHandler={setStartDate}
            selectedDate={startDate}
            maxDate={maxDate}
            minDate={minDate}
          />
          <DatePicker
            label={FILTER_IDS.endDate}
            id={FILTER_IDS.endDate}
            onChangeHandler={setEndDate}
            maxDate={maxDate}
            minDate={startDate}
            selectedDate={endDate}
          />
        </>
      )}

      <Button
        onClick={applyFilters}
        label="Apply Filters"
      />
    </div>
  );
};
