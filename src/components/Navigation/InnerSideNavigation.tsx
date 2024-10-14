"use client";
import { FC, useState, useEffect, Fragment } from "react";
import { InnerSideNavigationContext } from "./InnerSideNavigationContext";
import { classNames } from "@/lib/utilities/helperFunctions";
import { NavigationProps } from ".";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
export interface SideNavItem {
  id: string;
  label: string;
}

export const InnerSideNavigation: FC<{
  children: React.ReactNode;
  top: Boolean;
  items: NavigationProps[];
  moduleName?: string;
}> = ({ children, items, top, moduleName }) => {
  const pathname = usePathname();
  const [selectedView, setSelectedView] = useState(pathname);
  const [switchView, setSwitchView] = useState(top);

  useEffect(() => {
    const url = getURl();
    console.log(`Current url is ${url}`);
    console.log(`pathname url is ${pathname}`);
    // setSelectedView(pathname);
    return () => {
      setSelectedView("/vehicles");
    };
  }, [pathname]);

  const getURl = () => {
    return (
      items.find((item) => pathname === item.link)?.link ??
      getUrlForSubItems(items)
    );
  };

  const getUrlForSubItems = (items: NavigationProps[]) => {
    if (items.some((e) => pathname.includes(e.link ?? ""))) {
      // if (items.some((e) => pathname === e.link)) {
      return pathname;
    } else {
      return "";
    }
  };
  return (
    <InnerSideNavigationContext.Provider
      value={{ selectedView: "", updateSelectedView: () => {} }}
    >
      <>
        <div className={classNames(switchView ? "" : "flex gap-4")}>
          <nav
            className={classNames(
              switchView
                ? "top-[50px] flex backdrop-blur-sm bg-white border-slate-200 shadow"
                : "w-52 h-full space-y-0 top-12 pt-2 ",
              "px-2 z-20 sticky items-center "
            )}
          >
            {items.map((nav, index) =>
              !nav.children ? (
                <div
                  className=""
                  key={index}
                >
                  <Link
                    onClick={() => setSelectedView(nav.link)}
                    href={nav.link}
                    key={index}
                  >
                    <NavItem
                      nav={nav}
                      selectedView={selectedView}
                      notifications={
                        nav.notificationCount !== undefined &&
                        nav.notificationCount > 0
                          ? `${nav.notificationCount}`
                          : ""
                      }
                    />
                  </Link>
                </div>
              ) : switchView ? (
                <DropNavItem
                  key={index}
                  selectedView={selectedView}
                  nav={nav}
                  setSelectedView={setSelectedView}
                />
              ) : (
                <>
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <CollapsibleNavItem
                          selectedView={selectedView}
                          open={open}
                          nav={nav}
                        />
                        <Disclosure.Panel
                          as="ul"
                          className="ml-2 mb-1 border-slate-900"
                        >
                          {nav.children!.map((subItem) => (
                            <li
                              key={subItem.id}
                              className=""
                            >
                              <Link
                                onClick={() => setSelectedView(subItem.link)}
                                href={subItem.link}
                                key={index}
                              >
                                <p
                                  className={classNames(
                                    "text-xs px-3 py-2.5 text-left w-full hover:text-slate-900",
                                    selectedView.includes("/vehicles")
                                      ? "text-slate-700 font-semibold"
                                      : "text-slate-600 hover:bg-slate-100  hover:border-slate-500"
                                  )}
                                >
                                  {subItem.label}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </>
              )
            )}
          </nav>

          {switchView ? (
            <div className={classNames("w-full")}>{children}</div>
          ) : (
            <div className={classNames("w-full bg-white")}>
              <div className="">{children}</div>
            </div>
          )}
        </div>
      </>
    </InnerSideNavigationContext.Provider>
  );
};

const NavItem: FC<{
  nav: NavigationProps;
  selectedView: string;
  notifications?: string;
}> = ({ nav, selectedView, notifications }) => {
  return (
    <div className="group/item">
      <p
        className={classNames(
          "text-xs px-3 py-2.5 border-b-2 gap-2 text-left w-full hover:text-brand-blueRoyal  flex justify-between items-center",
          selectedView.includes(nav.link)
            ? "text-brand-blueRoyal border-brand-orangeHabanero font-normal "
            : "text-slate-700 border-transparent font-normal hover:border-slate-300"
        )}
      >
        {nav.label}
        {notifications && (
          <span>
            <p className="text-xs py-0.5 px-2 rounded-full  text-slate-900 bg-slate-200">
              {notifications}
            </p>
          </span>
        )}
      </p>
    </div>
  );
};

const CollapsibleNavItem: FC<{
  nav: NavigationProps;
  selectedView: string;
  open: Boolean;
}> = ({ nav, selectedView, open }) => {
  const checkIfSubItemIsActive = (items: NavigationProps[]) => {
    if (items.some((e) => selectedView.includes(e.link ?? ""))) {
      return true;
    }
  };
  return (
    <>
      <Disclosure.Button
        className={classNames(
          checkIfSubItemIsActive(nav.children ?? [])
            ? "border-b-2 border-amber-500 font-medium text-slate-900"
            : "border-b-2 hover:border-slate-500 border-transparent text-slate-600",
          "w-full group hover:bg-slate-300 hover:font-medium "
        )}
      >
        <p
          className={classNames(
            "text-xs pl-3 py-2.5  items-center text-left w-full hover:text-slate-900 flex justify-between"
          )}
        >
          {nav.label}
          <div className="flex gap-2 items-center">
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 group-hover:text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 group-hover:text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            )}
          </div>
        </p>
      </Disclosure.Button>
    </>
  );
};

const DropNavItem: FC<{
  nav: NavigationProps;
  selectedView: string;
  setSelectedView: Function;
}> = ({ nav, selectedView, setSelectedView }) => {
  const checkIfSubItemIsActive = (items: NavigationProps[]) => {
    if (items.some((e) => selectedView.includes(e.link ?? ""))) {
      return true;
    }
  };
  return (
    <>
      <Menu
        as="div"
        className="relative inline-block text-left"
      >
        <Menu.Button
          className={classNames(
            checkIfSubItemIsActive(nav.children ?? [])
              ? "text-slate-900 border-amber-500 font-medium bg-slate-50"
              : "text-slate-600 border-transparent font-medium hover:border-slate-300 hover:text-slate-700 hover:bg-slate-100",
            "w-full group  "
          )}
        >
          <p
            className={classNames(
              "text-xs pl-3 py-2.5 items-center text-left gap-2 w-full  flex justify-between"
            )}
          >
            {nav.label}
            <ChevronDownIcon
              className=" w-4 h-4 group-hover:text-amber-400"
              aria-hidden="true"
            />
          </p>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-slate-200 focus:outline-none">
            <div className="px-1 py-1 ">
              {nav.children!.map((subItem, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      onClick={() => setSelectedView(subItem.link)}
                      href={subItem.link}
                      key={subItem.id}
                    >
                      <p
                        className={classNames(
                          "text-xs px-3 py-2.5 text-left w-full hover:text-slate-900 flex items-center gap-2",
                          selectedView === subItem.link
                            ? "text-slate-900 font-semibold"
                            : "text-slate-700 hover:bg-slate-200  hover:border-slate-500"
                        )}
                      >
                        {subItem.label}{" "}
                        {subItem.notificationCount !== undefined &&
                          subItem.notificationCount > 0 && (
                            <p className="py-0.5 px-2 rounded-full bg-warning-50 text-warning-600 font-medium">
                              {subItem.notificationCount}
                            </p>
                          )}
                      </p>
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
