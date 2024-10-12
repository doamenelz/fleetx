import { FC } from "react";

export const MainHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="z-40  bg-gray-25">
      <div className="flex flex-wrap items-center gap-6 px-4 py-4 sm:flex-nowrap sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 text-gray-900">
          {title}
        </h1>
        {/* <div className="flex order-last w-full text-sm font-semibold leading-6 gap-x-8 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
          <a href="#" className="text-primary-600">
            Last 7 days
          </a>
          <a href="#" className="text-gray-700">
            Last 30 days
          </a>
          <a href="#" className="text-gray-700">
            All-time
          </a>
        </div> */}
        <a
          href="#"
          className="flex items-center px-3 py-2 ml-auto text-sm font-semibold text-white rounded-md shadow-sm gap-x-1 bg-primary-600 hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          {/* <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" /> */}
          Button
        </a>
      </div>
    </div>
  );
};
