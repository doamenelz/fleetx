import { FC } from "react";
import { ListTableData } from "./ListTable.types";
import Link from "next/link";

export const ListTable: FC<{ data: ListTableData[] }> = ({ data }) => {
  return (
    <div className=" border-gray-100">
      <dl className="divide-y divide-slate-100 [&>*:nth-child(even)]:bg-indigo-50/20">
        {data.map((item) => (
          <ListCell data={item} />
        ))}
      </dl>
    </div>
  );
};

const ListCell: FC<{ data: ListTableData }> = ({ data }) => {
  return (
    <div
      id={data.id}
      className=" px-4 text-xs py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3 capitalize"
    >
      <dt className="text-xs leading-6 font-medium text-slate-900">
        {data.key}
      </dt>
      <dd className="mt-1 text-xs leading-6 text-slate-700 sm:col-span-2 sm:mt-0">
        {data.value}
      </dd>
    </div>
  );
};

export const ListTableCell: FC<{
  url?: string;
  title: string;
  copy?: string;
  due: string;
}> = ({ title, copy, url, due }) => {
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

      <p className="text-slate-500 text-[10px]/[10px] normal-case">
        {copy} | <span>{due}</span>
      </p>
    </div>
  );
};
