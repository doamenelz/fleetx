"use client";
import { FC, useState, useEffect, Fragment } from "react";
import { InnerSideNavigationContext } from "./InnerSideNavigationContext";
import { classNames } from "@/lib/utilities/helperFunctions";
import { NavigationProps } from ".";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowsRightLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { SectionHeader } from "..";
import { MainNavigationNotification, Avatar, AVATAR_SIZES } from "..";
import { sampleEmployee } from "@/models";
import { MessageCenterNav } from "@/modules/MessageCenter/models/MessageCenter";
import { HierarchialNavigationContext } from "./HierarchialNavigationContext";
export interface SideNavItem {
  id: string;
  label: string;
}

export const HierarchialNavigation: FC<{
  children: React.ReactNode;
  items: MessageCenterNav[];
  defaultView: string;
}> = ({ children, items, defaultView }) => {
  const [selectedView, setSelectedView] = useState(defaultView);

  useEffect(() => {
    return () => {
      //   setSelectedView(location.pathname);
    };
  }, []);

  return (
    <HierarchialNavigationContext.Provider
      value={{ selectedView: defaultView, updateSelectedView: () => {} }}
    >
      <>
        <div className={classNames("flex")}>
          <nav
            className={classNames(
              "w-52 h-full space-y-0 top-12 pt-2 px-2 z-20 sticky items-center "
            )}
          >
            {items.map((item) => (
              <div key={item.id} className="pt-6 pl-4 text-nowrap">
                <p className="text-xs text-gray-500 tracking-tighter ">
                  {item.mainLabel}
                </p>
                {item.children.map((label) => (
                  <Link href={label.url} key={label.id}>
                    <button
                      onClick={() => setSelectedView(label.id)}
                      key={label.id}
                      className={classNames(
                        selectedView === label.id
                          ? "bg-primary-50 border-primary-900 hover:bg-primary-200"
                          : "border-pageBg hover:bg-primary-50",
                        "border-l-2 py-2 px-4 my-2 w-full   hover:border-primary-900  text-xs text-gray-600 hover:text-gray-800 font-medium justify-between items-center flex"
                      )}
                    >
                      {label.label}
                      {label.notifications > 0 && (
                        <span className="text-xs py-0.5 px-2.5 bg-primary-700 text-gray-100 rounded-full">
                          {label.notifications}
                        </span>
                      )}
                    </button>
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <div className={classNames(" w-full")}>
            <div className=" ">{children}</div>
          </div>
        </div>
      </>
    </HierarchialNavigationContext.Provider>
  );
};
