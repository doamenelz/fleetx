import {
  TableContainer,
  TableRow,
  Table,
  TableHeadCell,
  TableCell,
  AvatarCell,
  TablePagination,
  TextInput,
  SearchField,
  Dropdown,
  TEXT_INPUT_SIZE,
  Button,
  BUTTON_SKIN,
  GridLayout,
  GRID_TYPE,
  AVATAR_SIZES,
} from "@/components";
import { FC, useContext, useState, useEffect } from "react";
import { ExpenseTypeCardItem } from ".";
import { Expense } from "../models/Expense";

import { TableContext } from "@/components/Table/TableContext";

export const FinanceExpenseRetirementCard: FC<{ data: Expense[] }> = ({
  data,
}) => {
  const getCount = (status: string) => {
    const _count = data.filter((item) => item.status === status);
    return _count.length;
  };

  //   const [selectedView, setSelectedView] = useState<string>("draft");
  const [filteredList, setFilteredList] = useState<Expense[]>([]);
  const [listStart, setListStart] = useState(0);
  const [listEnd, setListEnd] = useState(0);
  const [totalResults, setTotalResults] = useState(data.length);
  const tableMax: number = 8;

  useEffect(() => {
    if (data.length > tableMax) {
      setListStart(1);
      setListEnd(tableMax);
    }

    setFilteredList(data.slice(0, tableMax));
    setTotalResults(data.length);
  }, []);

  //   const updateFilteredListHandler = (type: string) => {
  //     setSelectedView(type);
  //     const _data = data.filter((item) => {
  //       if (item.status === type) {
  //         return [item];
  //       } else {
  //         return null;
  //       }
  //     });
  //     setFilteredList([..._data]);
  //   };

  return (
    <>
      <div className="bg-gray-25 border rounded-md p-4  space-y-4">
        <div className="flex items-center gap-4">
          <SearchField placeholder="Search" setQuery={() => {}} />

          {/* <Dropdown
            items={["Pending Requests", "Processed Requests", "All Requests"]}
            setValue={() => {}}
            span={TEXT_INPUT_SIZE.span1}
            id="ad"
            defaultValue="Pending Requests"
          />
          <Dropdown
            items={["By Name", "By Employee ID"]}
            setValue={() => {}}
            span={TEXT_INPUT_SIZE.span1}
            id="ad"
            defaultValue="By Name"
          /> */}

          <Button label="Filter" />
        </div>

        <TableContext.Provider
          value={{
            page: {
              start: listStart,
              end: listEnd,
              totalResults: totalResults,
              tableMax: tableMax,
            },
            updatePageDetails: () => {},
            data: filteredList,
            updateData: setFilteredList,
          }}
        >
          <FinanceTable />
        </TableContext.Provider>
      </div>
    </>
  );
};

const FinanceTable = () => {
  const context = useContext(TableContext);
  return (
    <>
      <TableContainer
        mainContent={
          <Table
            head={
              <>
                <TableHeadCell
                  label={"Reference #"}
                  mainCell={false}
                  hideOnMobile={false}
                  //   isDark={true}
                />
                <TableHeadCell
                  label={"Requested by"}
                  mainCell={false}
                  hideOnMobile={false}
                  //   isDark={true}
                />
                {/* <TableHeadCell
        label={"Department"}
        mainCell={false}
        hideOnMobile={false}
      /> */}
                <TableHeadCell
                  label={"Type"}
                  mainCell={false}
                  hideOnMobile={false}
                  //   isDark={true}
                />
                <TableHeadCell
                  label={"Advanced"}
                  mainCell={false}
                  hideOnMobile={false}
                  //   isDark={true}
                />
                <TableHeadCell
                  label={"Retirement"}
                  mainCell={false}
                  hideOnMobile={false}
                  //   isDark={true}
                />
                <TableHeadCell
                  label={"Submitted Date"}
                  mainCell={false}
                  hideOnMobile={false}
                  //   isDark={true}
                />
                <TableHeadCell
                  label={"Status"}
                  mainCell={false}
                  hideOnMobile={false}
                  //   isDark={true}
                />
              </>
            }
            body={
              <>
                {(context.data as Expense[]).map((expense, index) => (
                  <TableRow key={expense.id}>
                    <TableCell
                      key={expense.id}
                      label={expense.id}
                      mainCell={true}
                      hideOnMobile={false}
                      button={{
                        url: "expense.downloadUrl",
                        label: expense.id,
                      }}
                    />

                    <TableCell
                      key={expense.id}
                      label={
                        // expense.details?.requestor.fullName
                        <AvatarCell
                          size={AVATAR_SIZES.sm}
                          firstName={
                            expense.details!.requestor.bioData.firstName
                          }
                          lastName={expense.details!.requestor.bioData.lastName}
                          fullName={
                            expense.details?.requestor.bioData.fullName ?? ""
                          }
                          row2={
                            expense.details?.requestor.jobInformation
                              ?.jobTitle ?? ""
                          }
                        />
                      }
                      mainCell={true}
                      hideOnMobile={false}
                    />
                    <TableCell
                      key={expense.id}
                      label={expense.type}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
                      key={expense.id}
                      label={`${expense.details?.currency} ${expense.details?.advanced}`}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
                      key={expense.id}
                      label={`${expense.details?.currency} ${expense.details?.retirement}`}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
                      key={expense.id}
                      label={expense.requestDate}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
                      key={expense.id}
                      label={expense.status}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                  </TableRow>
                ))}
              </>
            }
          />
        }
      />
    </>
  );
};
