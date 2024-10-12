import { FC } from "react";

export const EmptyTable: FC<{
  title: string;
  copy?: string;
  action?: React.ReactNode;
  image?: React.ReactNode;
}> = ({ title, copy, action, image }) => {
  return (
    <div className="text-center w-full mx-auto py-8 my-2 rounded-md bg-gray-50">
      {image}
      <h3 className="mt-2 text-sm font-medium text-gray-700">{title}</h3>
      {copy && <p className="mt-1 text-sm text-gray-500">{copy}</p>}
      {action}
    </div>
  );
};
