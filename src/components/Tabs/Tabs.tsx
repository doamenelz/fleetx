import { FC } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { Tab } from "./Tabs.types";
import { TEXT_INPUT_SIZE } from "../TextInput";
import { Dropdown } from "../Dropdown";

export const Tabs: FC<{
  tabs: Tab[];
  tabHandler: Function;
  children: React.ReactNode;
  selectedTab: string;
}> = ({ tabs, tabHandler, children, selectedTab }) => {
  const parseTabList = () => {
    let list: string[] = [];
    tabs.forEach((tab) => {
      list.push(tab.name);
    });
    return list;
  };
  return (
    <>
      <div className="pb-5 bg-white bg-opacity-75 border-b border-gray-200 sm:pb-0 backdrop-blur backdrop-filter">
        <div className="pt-3">
          <div className="sm:hidden">
            {/* <Dropdown
              setValue={tabHandler}
              span={TEXT_INPUT_SIZE.full}
              items={parseTabList()}
            /> */}
          </div>
          <div className="hidden sm:block ">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <a
                  href={tab.href}
                  key={tab.id}
                  onClick={() => tabHandler(tab.id)}
                  className={classNames(
                    selectedTab === tab.id
                      ? "border-brand-blueDeep text-brand-blueRoyal font-medium"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap flex border-b-2 items-center gap-1 px-6 pb-3 text-sm"
                  )}
                  aria-current={selectedTab === tab.id ? "page" : undefined}
                >
                  <span className="w-4 h-4">{tab.icon}</span>
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
