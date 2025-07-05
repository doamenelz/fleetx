import { FC, useContext, useEffect } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { TableCellProps, TableContainerProps } from "./Tables.types";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/16/solid";
import { TableContext } from "./TableContext";

import { PlusIcon } from "@heroicons/react/20/solid";
import { BodyCopy, CopyLoader, SectionHeader } from "..";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
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
    <div className="w-full">
      {props.sectionHeader && (
        <SectionHeader
          title={props.sectionHeader.header}
          copy={props.sectionHeader.copy}
          button={<>{props.sectionHeader.button}</>}
        />
      )}

      {props.mainContent}
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
        props.centerCell ? "text-center" : "text-left",
        "whitespace-nowrap py-4 text-xs font-normal text-slate-700"
      )}
    >
      {props.isLoading && (
        <div>
          <div className="grid grid-cols-4 gap-2 animate-pulse">
            <div className="h-1 col-span-2 bg-gray-200 rounded-md"></div>
            <div className="h-1 col-span-1 bg-gray-200 rounded-md"></div>
            <div className="h-1 col-span-1 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      )}
      {(props.isLoading === undefined || !props.isLoading) && (
        <>{props.label}</>
      )}
    </td>
  );
};

export const TableHeadCell: FC<TableCellProps> = (props) => {
  return (
    <th
      scope="col"
      className={clsx(
        props.mainCell ? "pl-4 pr-3 sm:pl-3" : "px-3",
        props.hideOnMobile ? "hidden" : "",
        props.isDark
          ? "text-slate-100 bg-brand-oceanicNoir"
          : "text-slate-900  bg-gray-50",
        props.centerCell ? "" : "text-left",
        " text-xs py-4 font-semibold border-b border-slate-300 shadow"
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
  height?: string;
}> = ({ head, body, emptyState, height }) => {
  const context = useContext(TableContext);
  return (
    <div className="flow-root">
      <div className=" overflow-x-auto">
        <div
          className={classNames(
            "inline-block min-w-full align-middle",
            height ? `max-h-[calc(100vh_-_${height})]` : "",
            "min-h-0"
          )}
        >
          <table className="min-w-full divide-y  divide-indigo-200">
            <thead className=" w-full mx-auto sticky top-0 ">
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

export const TablePagination = () => {
  interface PageNumbering {
    number: number;
    isActive: boolean;

    isEllipsis: boolean;
    isLastPage: boolean;
    isFirstPage: boolean;
  }
  const context = useContext(TableContext);
  const generateNumberRange = (start: number, end: number) => {
    let numbers = [];
    for (let i = start; i <= end; i++) {
      i > 1 && numbers.push(i);
    }
    return numbers;
  };

  const getCenteredRange = (
    x: number,
    length: number,
    max: number
  ): number[] => {
    const half = Math.floor(length / 2);
    let start = x - half;
    let end = x + half;

    if (start < 2) {
      end += 1 - start;
      start = 2;
    }

    // Adjust if end is greater than max
    if (end > max) {
      start -= end - max;
      end = max;
      if (start < 1) start = 1;
    }

    const range = [];
    for (let i = start; i <= end && range.length < length; i++) {
      range.push(i);
    }
    return range;
  };
  const parseList = (): PageNumbering[] => {
    const pageNumbering: PageNumbering[] = [
      {
        isActive: context.currentPage === 1,
        isEllipsis: false,
        isLastPage: false,
        isFirstPage: true,
        number: 1,
      },
    ];

    const combinedPages = getCenteredRange(
      context.currentPage,
      10,
      context.totalPages
    );

    /** Get Preceeding Ellipsis if applicable */
    if (combinedPages[0] > 2) {
      const page: PageNumbering = {
        isActive: false,
        isEllipsis: true,
        isLastPage: false,
        isFirstPage: false,
        number: 0,
      };
      pageNumbering.push(page);
    }

    /** Generate the Page Numbering for the visible numbers */
    for (let index = 0; index < combinedPages.length; index++) {
      if (
        combinedPages[index] !== 1 &&
        combinedPages[index] !== context.totalPages
      ) {
        const page: PageNumbering = {
          isActive: combinedPages[index] === context.currentPage,
          isEllipsis: false,
          isLastPage: false,
          isFirstPage: false,
          number: combinedPages[index],
        };
        pageNumbering.push(page);
      }
    }

    /** Trailing Ellipsis if applicable */
    if (context.totalPages - combinedPages[combinedPages.length - 1] > 1) {
      const page: PageNumbering = {
        isActive: false,
        isEllipsis: true,
        isLastPage: false,
        isFirstPage: false,
        number: -1,
      };
      pageNumbering.push(page);
    }

    /** Last Page */
    const page: PageNumbering = {
      isActive: context.currentPage === context.totalPages,
      isEllipsis: false,
      isLastPage: true,
      isFirstPage: false,
      number: context.totalPages,
    };
    pageNumbering.push(page);

    return pageNumbering;
  };

  useEffect(() => {}, []);

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          disabled={context.currentPage === 1}
          onClick={() => {
            context.currentPage !== 1 &&
              context.setCurrentPage(context.currentPage - 1);
          }}
          className={clsx(
            context.currentPage === 1 && "cursor-not-allowed ",
            "inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          )}
        >
          <ChevronLeft
            aria-hidden="true"
            className="mr-3 size-5 text-gray-400"
          />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {parseList().map((page) => (
          <PageNumber
            key={page.number}
            number={page.number}
            isActive={page.isActive}
            isEllipsis={page.isEllipsis}
            onClick={context.setCurrentPage}
            isLastPage={page.isLastPage}
            isFirstPage={page.isFirstPage}
          />
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          disabled={context.currentPage === context.totalPages}
          onClick={() => {
            context.currentPage !== context.totalPages &&
              context.setCurrentPage(context.currentPage + 1);
          }}
          className={clsx(
            context.currentPage === context.totalPages && "cursor-not-allowed ",
            "inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          )}
        >
          Next
          <ChevronRight
            aria-hidden="true"
            className="ml-3 size-5 text-gray-400"
          />
        </button>
      </div>
    </nav>
  );
};

const PageNumber: FC<{
  number: number;
  isActive: boolean;
  onClick: Function;
  isEllipsis: boolean;
  isLastPage: boolean;
  isFirstPage: boolean;
}> = ({ number, isActive, onClick, isEllipsis, isLastPage, isFirstPage }) => {
  return isEllipsis ? (
    <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
      ...
    </span>
  ) : (
    <button
      onClick={() => onClick(number)}
      className={clsx(
        isActive
          ? "text-indigo-700 border-indigo-700"
          : "text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent",
        "inline-flex items-center border-t-2  px-4 pt-4 text-xs font-medium "
      )}
    >
      {number}
    </button>
  );
};

export const TableControl: FC<{}> = () => {
  return <></>;
};

export const TableControlIconButton: FC<{
  icon: JSX.Element;
  style?: string;
}> = ({
  icon,
  style = "p-2 border rounded-sm hover:bg-gray-700 hover:text-white",
}) => {
  return <div className={style}>{icon}</div>;
};
