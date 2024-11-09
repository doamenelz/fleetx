"use client";
import { FC, useState, useEffect, useContext, Fragment } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { classNames } from "@/lib/utilities/helperFunctions";
// import { ScrollToTop } from "../components/ScrollToTop";
import { NavigationProps } from "./SidebarNavigation.types";
import { usePathname } from "next/navigation";
import { AVATAR_SIZES, Avatar } from "../Avatar";
import { Employee, sampleEmployee } from "../../models";
import { MobileNav } from "./MobileNavigation";
import { RootContext } from "@/context/RootContext";
import { SecondaryNavigation, SearchPallette, MenuDropdownItemProp } from "..";
import { PrimaryNavigation } from "..";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import { getUserStore } from "@/models/UserStore";

export const SidebarLayout: FC<{
  children?: React.ReactNode;
}> = (props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [switchColor, setSwitchColor] = useState(false);
  const [profile, setProfile] = useState("admin");
  const loc = usePathname();

  const filterNavigation = (type: string) => {
    var base = PrimaryNavigation.filter((item) => item.category === "personal");

    return [
      ...base,
      ...PrimaryNavigation.filter((item) => item.category === type),
    ];
  };
  const router = useRouter();

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.log("User pressed: ", event.key);

      if (event.key === "[") {
        event.preventDefault();
        setSidebarIsOpen(!sidebarIsOpen);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [sidebarIsOpen]);

  // useEffect(() => {
  //   var userStore = getUserStore();
  //   if (!userStore?.isLoggedIn) {
  //     router.push("/login");
  //     window.location.reload();

  //     console.log("Im routing to login from SideNav");
  //   }

  //   console.log(`User Logged in status is ${userStore.isLoggedIn}`);
  // }, [loc]);

  const rootContext = useContext(RootContext);
  return (
    <>
      <div className="">
        <div
          className={classNames(
            sidebarIsOpen ? "lg:w-56" : "lg:w-12",
            switchColor ? "bg-stone-50" : "bg-white",
            "hidden h-screen  lg:fixed lg:flex z-50 lg:flex-col overscroll-contain border-r"
          )}
        >
          <div className="flex flex-col p-2.5 overflow-y-auto grow bg-slate-50">
            <img src="/fleetShort.svg" alt="" className="pb-2 w-8 h-8" />
            <nav className="flex flex-col flex-1 place-items-center pt-2 ">
              <ul
                className={classNames(
                  // "flex-1 pt-1 pb-4 ml-1 mb-32 space-y-2 text-xs font-normal "
                  "flex-1 mb-32 space-y-1 text-xs font-normal ",
                  sidebarIsOpen ? "w-full text-left" : ""
                )}
              >
                <div
                  className="border-l-2 hover:bg-slate-100 p-2 border-transparent items-center text-slate-400 hover:text-orange-400 cursor-pointer "
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  {!sidebarIsOpen ? (
                    <PanelLeftOpen className="h-5 w-5 stroke-1 text-slate-600 " />
                  ) : (
                    <PanelLeftClose className="h-5 w-5 stroke-1 text-slate-600 " />
                  )}
                </div>

                {filterNavigation(profile).map((item, index) => (
                  <NavItem
                    key={index}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    link={item.link}
                    fillIcon={item.fillIcon}
                    sideBarIsOpen={sidebarIsOpen}
                    dark={!switchColor}
                  />
                ))}
                <SearchButton
                  toggleSearch={toggleSearch}
                  setToggleSearch={setToggleSearch}
                  sideBarIsOpen={sidebarIsOpen}
                />
              </ul>
              <ul
                className={classNames(
                  "space-y-1 text-xs justify-center font-normal",
                  sidebarIsOpen ? "w-full text-left" : ""
                )}
              >
                {SecondaryNavigation.filter(
                  (nav) => nav.id !== PrimaryNavigation[0].id
                ).map((item, index) => (
                  <NavItem
                    key={index}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    link={item.link}
                    fillIcon={item.fillIcon}
                    sideBarIsOpen={sidebarIsOpen}
                    dark={!switchColor}
                  />
                ))}
              </ul>
            </nav>

            <div
              className={classNames(
                " border-slate-700 border-t mt-2 py-2 flex  gap-2",
                sidebarIsOpen
                  ? " text-left items-center"
                  : "justify-center items-center"
              )}
            >
              {/* <FlexIcon /> */}
              <Avatar
                size={AVATAR_SIZES.sm}
                firstName={sampleEmployee.bioData.firstName}
                lastName={sampleEmployee.bioData.lastName}
                imageUrl={sampleEmployee.bioData.avatar}
                hasPadding={false}
              />
              {sidebarIsOpen && (
                <p className="text-xs text-slate-300">
                  {sampleEmployee.bioData.fullName}
                </p>
              )}
            </div>
          </div>
        </div>
        <MobileNav />
        <SearchPallette open={toggleSearch} setOpen={setToggleSearch} />
        <div
          className={classNames(sidebarIsOpen ? "lg:pl-56" : "lg:pl-12", "")}
        >
          <main className="overscroll-none">{props.children}</main>
        </div>
      </div>
    </>
  );
};

const NavItem: FC<NavigationProps> = ({
  id,
  label,
  link,
  notificationCount,
  icon,
  fillIcon,
  sideBarIsOpen,
}) => {
  const pathName = usePathname();
  const rootContext = useContext(RootContext);
  return (
    <div className="group">
      <Link
        key={id}
        href={link!}
        scroll={false}
        onClick={() => rootContext.updateNavTitle(label)}
        className=""
      >
        <div
          className={classNames(
            "group flex p-2 border-l-2 group-hover:text-indigo-800 group-hover:bg-indigo-50",
            pathName.includes(link!)
              ? "border-brand-oceanicNoir text-brand-oceanicNoir "
              : "  border-slate-50 text-neutral-500 ",
            sideBarIsOpen && pathName.includes(link!) ? "" : "",
            sideBarIsOpen
              ? "items-center text-left gap-2"
              : "items-center justify-center "
          )}
        >
          {icon}
          {sideBarIsOpen && <p className="font-medium">{label}</p>}

          {notificationCount !== undefined && notificationCount > 0 && (
            <span className="w-2 h-2 -mt-2 text-xs rounded-full bg-error-500"></span>
          )}
        </div>
      </Link>

      {!sideBarIsOpen && (
        <span className="absolute z-50 hidden p-2 ml-12 -mt-10 font-medium bg-gray-950 border border-gray-500 rounded-sm cursor-text text-gray-50 group-hover:block">
          {label}
        </span>
      )}
    </div>
  );
};

const SearchButton: FC<{
  sideBarIsOpen: boolean;
  setToggleSearch: Function;
  toggleSearch: boolean;
}> = ({ sideBarIsOpen, setToggleSearch, toggleSearch }) => {
  const pathName = usePathname();
  const rootContext = useContext(RootContext);
  return (
    <div className="group ">
      <button
        onClick={() => setToggleSearch(!toggleSearch)}
        className={classNames(
          "group flex p-2 border-l-2 w-full group-hover:text-indigo-800 group-hover:bg-indigo-50 border-slate-50 text-neutral-500 ",

          sideBarIsOpen
            ? "items-center text-left gap-2"
            : "items-center justify-center "
        )}
      >
        <Search className="" />
        {sideBarIsOpen && <p className="font-medium">Search</p>}
      </button>

      {!sideBarIsOpen && (
        <span className="absolute z-50 hidden p-2 ml-12 -mt-10 font-medium bg-gray-950 border border-gray-500 rounded-sm cursor-text text-gray-50 group-hover:block">
          Search
        </span>
      )}
    </div>
  );
};

const AvatarDropdown: FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              License
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
};
