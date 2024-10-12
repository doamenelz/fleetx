import {
  SectionHeader,
  TableContainer,
  TableRow,
  Table,
  TableHeadCell,
  TableCell,
  Dropdown,
  TEXT_INPUT_SIZE,
  DatePickerInput,
  TextInput,
  SearchField,
} from "@/components";
import { FC, useState } from "react";
import { ExpenseTypeCardItem } from ".";
import ExpenseTypeCard from "./ExpenseTypeCard";
import { Expense } from "../models/Expense";

const expenseTypes: ExpenseTypeCardItem[] = [
  {
    type: "draft",
    subtitle: "Your requests",
    header: "Draft",
    icon: <></>,
  },
  {
    type: "awaiting",
    subtitle: "Your submitted requests awaiting other's approvals",
    header: "In Progress",
    icon: <></>,
  },
  {
    type: "inbox",
    subtitle: "Your expenses pending retirement",
    header: "Upcoming Retirement",
    icon: <></>,
  },

  {
    type: "history",
    subtitle: "Your Expenses pending retirement",
    header: "Completed Expenses",
    icon: <></>,
  },
];

export const ExpenseTypeGrid: FC<{ data: Expense[] }> = ({ data }) => {
  const getCount = (status: string) => {
    const _count = data.filter((item) => item.status === status);
    return _count.length;
  };

  const [selectedView, setSelectedView] = useState<string>("draft");
  const [filteredList, setFilteredList] = useState<Expense[]>([]);

  const updateFilteredListHandler = (type: string) => {
    setSelectedView(type);
    const _data = data.filter((item) => {
      if (item.status === type) {
        return [item];
      } else {
        return null;
      }
    });
    setFilteredList([..._data]);
  };

  return (
    <>
      <div className="bg-gray-25 border border-gray-300 rounded-md space-y-8 py-2 px-4">
        <SectionHeader
          title="Your Expenses"
          button={
            <div className="flex items-center gap-2">
              <div className="relative">
                {/* <RangePicker className="peer bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 rounded-none shadow-none ring-0 border-0 focus:border-none focus:rounded-none" /> */}
                <div
                  className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-primary-600"
                  aria-hidden="true"
                />
              </div>
            </div>
          }
        />

        <div className="grid grid-cols-4 gap-3">
          {expenseTypes.map((expense, index) => (
            <button
              onClick={() => updateFilteredListHandler(expense.type)}
              key={index}
            >
              <ExpenseTypeCard
                type={expense}
                isActive={selectedView === expense.type}
                count={getCount(expense.type)}
              ></ExpenseTypeCard>
            </button>
          ))}
        </div>
        <TableContainer
          mainContent={
            <Table
              head={
                <>
                  <TableHeadCell
                    label={"Reference #"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Type"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Purpose"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Date Requested"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Status"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                </>
              }
              body={
                <>
                  {filteredList.map((expense, index) => (
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
                        label={expense.type}
                        mainCell={false}
                        hideOnMobile={false}
                        // button={{ url: expense.downloadUrl, label: hrDoc.name }}
                      />
                      <TableCell
                        key={expense.id}
                        label={expense.purpose}
                        mainCell={false}
                        hideOnMobile={false}
                        // button={{ url: expense.downloadUrl, label: hrDoc.name }}
                      />
                      <TableCell
                        key={expense.id}
                        label={expense.requestDate}
                        mainCell={false}
                        hideOnMobile={false}
                        // button={{ url: expense.downloadUrl, label: hrDoc.name }}
                      />
                      <TableCell
                        key={expense.id}
                        label={expense.statusDescription}
                        mainCell={false}
                        hideOnMobile={false}
                        // button={{ url: expense.downloadUrl, label: hrDoc.name }}
                      />
                    </TableRow>
                  ))}
                </>
              }
            />
          }
        />
      </div>
    </>
  );
};
