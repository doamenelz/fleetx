import { FC } from "react";
import { ListTableData } from "./ListTable.types";

export const ListTable: FC<{ data: ListTableData[] }> = ({ data }) => {
  return (
    <div className="border-t border-gray-100">
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
      <dt className="text-xs font-medium leading-6 text-slate-700">
        {data.key}
      </dt>
      <dd className="mt-1 text-xs leading-6 text-slate-900 sm:col-span-2 sm:mt-0">
        {data.value}
      </dd>
    </div>
  );
};
