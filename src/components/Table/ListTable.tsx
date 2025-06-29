import { FC } from "react";
import { ListTableData } from "./ListTable.types";
import Link from "next/link";
import { classNames } from "@/lib/utilities/helperFunctions";
import { jsx } from "react/jsx-runtime";

export enum LIST_TABLE_TYPE {
  generic,
  invoice,
}
export const ListTable: FC<{
  data: ListTableData[];
  type?: LIST_TABLE_TYPE;
}> = ({ data, type }) => {
  return (
    <div className=" border-gray-100">
      <dl className="divide-y divide-slate-100 [&>*:nth-child(even)]:bg-indigo-50/20">
        {data.map((item, index) => (
          <ListCell
            key={index}
            data={item}
            type={type ?? LIST_TABLE_TYPE.generic}
          />
        ))}
      </dl>
    </div>
  );
};

const ListCell: FC<{ data: ListTableData; type: LIST_TABLE_TYPE }> = ({
  data,
  type,
}) => {
  return (
    <div
      id={data.id}
      className={classNames(
        "px-4 text-xs py-2 sm:grid  sm:gap-4 sm:px-3 ",
        type === LIST_TABLE_TYPE.invoice
          ? "sm:grid-cols-3 justify-evenly"
          : "sm:grid-cols-3"
      )}
    >
      <dt className="text-xs leading-6  text-slate-900">{data.key}</dt>
      <dd
        className={classNames(
          "mt-1 text-xs leading-6 text-slate-600  sm:mt-0",
          type === LIST_TABLE_TYPE.invoice
            ? "sm:col-span-1 text-right"
            : "sm:col-span-2"
        )}
      >
        {data.value}
      </dd>
      {data.valueTwo && (
        <dd
          className={classNames(
            "mt-1 text-xs leading-6 text-slate-700  sm:mt-0",
            type === LIST_TABLE_TYPE.invoice
              ? "sm:col-span-1 text-right font-mono"
              : "sm:col-span-2"
          )}
        >
          {data.valueTwo}
        </dd>
      )}
    </div>
  );
};

export const ListTableCell: FC<{
  url?: string;
  title: string;
  copy?: string | JSX.Element;

  rowThree?: string | JSX.Element;
}> = ({ title, copy, url, rowThree }) => {
  return (
    <div className="space-y-0">
      {url && (
        <Link
          href={url}
          className="text-brand-blueRoyal hover:underline"
        >
          {title}
        </Link>
      )}
      {!url && <p className="">{title}</p>}

      {typeof copy === "string" ? (
        <p className="text-slate-500 text-[10px]/[10px] normal-case pb-2">
          {copy}
        </p>
      ) : (
        copy
      )}

      {typeof rowThree === "string" ? (
        <p className="text-slate-500 text-[10px]/[10px] normal-case pb-2">
          {copy}
        </p>
      ) : (
        rowThree
      )}
    </div>
  );
};
