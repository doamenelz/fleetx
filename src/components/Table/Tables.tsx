import { FC, useContext } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { TableCellProps, TableContainerProps } from "./Tables.types";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/16/solid";
import { TableContext } from "./TableContext";

import { PlusIcon } from "@heroicons/react/20/solid";
import { BodyCopy, SectionHeader } from "..";
//TODO: Add Table sorter cell
//TODO: Add Dropdown Cell - Ant Design
//TODO: Make DatePicker a component

/**
 *
 * Create a table like a typical HTML
 * -- Table Container
 *      -- head
 *         -- tableCell (individually)
 *      -- body
 *         -- array.map
 *            -- tableRow
 *                -- tableCell (individually)
 *
 */
export const TableContainer: FC<TableContainerProps> = (props) => {
  const context = useContext(TableContext);
  return (
    <div className="w-full space-y-2">
      {props.sectionHeader && (
        <SectionHeader
          title={props.sectionHeader.header}
          copy={props.sectionHeader.copy}
          button={
            <>{props.sectionHeader.button ? props.sectionHeader.copy : <></>}</>
          }
        />
      )}

      {props.mainContent}
      {/* {context.page.totalResults > context.page.tableMax && (
        <TablePagination
          start={context.page.start ?? 0}
          end={context.page.end ?? 0}
          total={context.page.totalResults}
        />
      )} */}
    </div>
  );
};

export const TableBody: FC<{
  children: React.ReactNode;
  isEmpty?: boolean;
}> = ({ children, isEmpty }) => {
  return <tbody className=" divide-y divide-c-mid">{children}</tbody>;
};

export const TableRow: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tr className="hover:bg-indigo-50/20">{children}</tr>;
};

// even:bg-slate-50
export const TableCell: FC<TableCellProps> = (props) => {
  return (
    <td
      className={classNames(
        props.mainCell ? "pl-4 sm:pl-3 pr-3" : "px-3 py-2 ",

        props.hideOnMobile ? "hidden" : "",
        "whitespace-nowrap py-4 text-xs font-normal text-slate-700"
      )}
    >
      {props.button ? (
        <a
          // className="cursor-pointer text-primary-900 hover:text-primary-900 hover:underline"
          href={props.button.url}
          target="_blank"
          rel="noreferrer"
        >
          <BodyCopy
            text={props.button.label}
            style="cursor-pointer text-indigo-800 hover:text-indigo-600 hover:underline"
          />
        </a>
      ) : (
        <>{props.label}</>
      )}
    </td>
  );
};

export const TableHeadCell: FC<TableCellProps> = (props) => {
  return (
    <th
      scope="col"
      className={classNames(
        props.mainCell ? "pl-4 pr-3 sm:pl-3" : "px-3",
        props.hideOnMobile ? "hidden" : "",
        props.isDark
          ? "text-slate-100 bg-brand-oceanicNoir"
          : "text-slate-900 bg-slate-50",
        "text-left text-xs py-3 font-semibold border-b border-slate-300 shadow"
      )}
    >
      {props.label}
    </th>
  );
};

export const Table: FC<{
  head: React.ReactNode;
  body: React.ReactNode;
  emptyState?: React.ReactNode;
}> = ({ head, body, emptyState }) => {
  const context = useContext(TableContext);
  return (
    <div className="flow-root">
      <div className="-my-2 overflow-x-auto">
        <div className="inline-block min-w-full align-middle max-h-[calc(100vh_-_260px)]">
          <table className="min-w-full divide-y divide-indigo-200">
            <thead className=" w-full mx-auto sticky top-0 z-10">
              <tr>{head}</tr>
            </thead>
            {context.page.totalResults > 0 && <TableBody>{body}</TableBody>}
          </table>
          {context.page.totalResults === 0 && emptyState}
        </div>
      </div>
    </div>
  );
};

export const TablePagination: FC<{
  total: number;
  start: number;
  end: number;
}> = ({ start, total, end }) => {
  const context = useContext(TableContext);
  return (
    <nav
      className="flex w-full items-center justify-between border-t border-slate-200 px-2 py-4 bg-white"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-slate-700">
          Showing <span className="font-medium">{start}</span> to{" "}
          <span className="font-medium">{end}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex gap-4 justify-between items-center">
        {context.page.start! > context.page.tableMax && (
          <button
            onClick={() => context.page.previousPage}
            className="inline-flex hover:bg-slate-900 rounded-md items-center border  px-3 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-100"
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 " aria-hidden="true" />
            Previous
          </button>
        )}

        <button
          onClick={() => context.page.nextPage}
          className="inline-flex hover:bg-slate-900 rounded-md items-center border  px-3 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-100"
        >
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
};

// TableCell.defaultProps = {};
