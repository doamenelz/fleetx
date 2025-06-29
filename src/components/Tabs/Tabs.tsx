import { Dropdown } from "../Inputs";
import { TabsProps } from "./Tabs.types";
import clsx from "clsx";

export const Tabs = ({
  tabs,
  tabHandler,
  selectedTab,
  fillWidth = true,
}: TabsProps) => {
  return (
    <>
      <div className="pb-5 bg-white bg-opacity-75 border-b border-gray-200 sm:pb-0 ">
        <div className="pt-3">
          <div className="sm:hidden">
            <Dropdown
              id=""
              label=""
              value={selectedTab}
              items={tabs.map((tab) => tab.label!)}
              onChangeHandler={tabHandler as () => void}
            />
          </div>
          <div className="hidden sm:block ">
            <nav className={clsx("flex -mb-px", fillWidth && "justify-evenly")}>
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => tabHandler(tab.label)}
                  className={clsx(
                    tab.label?.toUpperCase() === selectedTab.toUpperCase()
                      ? "border-primary-900 text-primary-900 font-medium"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap flex border-b-2 items-center gap-1 text-center pb-3 text-sm ",
                    fillWidth && "w-full"
                  )}
                >
                  <p
                    className={clsx(
                      " items-center flex gap-1",
                      fillWidth ? "text-center mx-auto" : "px-4"
                    )}
                  >
                    {tab.icon && tab.icon.position === "leading" && (
                      <span className="mr-2">{tab.icon.asset}</span>
                    )}

                    {tab.label}
                    {tab.icon && tab.icon.position === "trailing" && (
                      <span>{tab.icon.asset}</span>
                    )}
                    {tab.badge && (
                      <span className="size-1.5 -mt-1 ml-1 text-xs rounded-full bg-red-500"></span>
                    )}
                  </p>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
