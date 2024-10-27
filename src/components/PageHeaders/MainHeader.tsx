import { classNames } from "@/lib/utilities/helperFunctions";
import { FC, useContext } from "react";
import { BreadCrumbs } from "../BreadCrumbs";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";

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

export const PageHeader = () => {
  const moduleContext = useContext(ModuleContainerContext);
  return (
    <div
      className={classNames(
        "bg-white z-30 px-6 sticky top-0 overscroll-contain "
        // sidebarIsOpen ? "lg:pl-56" : "lg:pl-12"
      )}
    >
      <div className=" w-full top-0 bg-gray-25 h-12  items-center flex justify-between border-b">
        {moduleContext.showHeader == true ||
        moduleContext.showHeader == undefined ? (
          <p className="font-semibold text-gray-700">
            {moduleContext.mainPage.name}
          </p>
        ) : (
          <BreadCrumbs
            data={moduleContext.breadCrumbs}
            mainPage={{
              id: "",
              name: moduleContext.mainPage.name,
              href: moduleContext.mainPage.href,
            }}
          />
        )}

        <div className="flex gap-4 items-center text-xs text-slate-700">
          <div className="border-r h-6 text-slate-700 border-slate-200"></div>
          <div className="">
            <img
              src="/compLogo.svg"
              className="h-6"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
