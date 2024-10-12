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
import { FlexIcon, FlexLogoFullLight } from "@/assets";
import { RootContext } from "@/context/RootContext";
import {
  ToolTip,
  TipDirection,
  SecondaryNavigation,
  MainNavigationNotification,
  SearchPallette,
  MenuDropdown,
  MenuDropdownItemProp,
} from "..";
import { PrimaryNavigation } from "..";
import {
  Bars3Icon,
  BellAlertIcon,
  MagnifyingGlassCircleIcon,
  MoonIcon,
} from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Icon, ICON_SIZES } from "../Icons";
import { IconList } from "@/assets/IconList";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "lucide-react";

export const SidebarLayout: FC<{
  children?: React.ReactNode;
}> = (props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [switchColor, setSwitchColor] = useState(false);
  const [profile, setProfile] = useState("admin");

  const filterNavigation = (type: string) => {
    var base = PrimaryNavigation.filter((item) => item.category === "personal");

    return [
      ...base,
      ...PrimaryNavigation.filter((item) => item.category === type),
    ];
  };
  const router = useRouter();
  const items: MenuDropdownItemProp[] = [
    {
      id: "01",
      label: "Switch to Executive View",
      function: () => {
        setProfile("executive");
        router.push("/home", { scroll: false });
      },
    },
    {
      id: "02",
      label: "Switch to Regular View",
      function: () => {
        setProfile("admin");
        router.push("/home", { scroll: false });
      },
    },
  ];
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

  const rootContext = useContext(RootContext);
  return (
    <>
      <div className="">
        <div
          className={classNames(
            sidebarIsOpen ? "lg:w-56" : "lg:w-12",
            switchColor ? "bg-stone-50" : "bg-slate-950",
            "hidden h-screen  lg:fixed lg:flex z-50 lg:flex-col overscroll-contain"
          )}
        >
          <div className="flex flex-col overflow-y-auto grow">
            <nav className="flex flex-col flex-1 ">
              {/* <MainIcon sidebarIsOpen={sidebarIsOpen} /> */}

              <ul
                className={classNames(
                  "flex-1 pt-1 pb-4 ml-1 mb-32 space-y-2 text-xs font-normal "
                )}
              >
                <div
                  className="border-l-2 p-2 border-transparent items-center text-slate-400 hover:text-orange-400 cursor-pointer "
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  <Bars3Icon className="w-6 h-6" />
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
              </ul>
            </nav>
            <ul className="pb-4 mx-auto items-center text-xs">
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
                  dark={!switchColor}
                />
              ))}
            </ul>
            <div className=" p-2 border-slate-700 border-t items-center">
              <FlexIcon />
            </div>
          </div>
        </div>
        <MobileNav />
        <div
          className={classNames(sidebarIsOpen ? "lg:pl-56" : "lg:pl-12", "")}
        >
          <div
            className={classNames(
              "bg-white z-30 fixed top-0 inset-x-0 overscroll-contain ",
              sidebarIsOpen ? "lg:pl-56" : "lg:pl-12"
            )}
          >
            <div className=" w-full top-0 bg-gray-25 px-4 py-2 border-b items-center flex justify-between">
              <p className="text-base font-semibold text-gray-700 ">
                {rootContext.navTitle}
              </p>
              <MenuDropdown
                button={
                  <>
                    <p className="text-xs font-light text-primary-900">
                      Company: Grand Oak - Nigeria
                    </p>
                  </>
                }
                items={[
                  {
                    id: "",
                    label: "Grand Oak - Nigeria",
                    function: () => {},
                  },
                  { id: "", label: "Grand Oak - Ghana", function: () => {} },
                ]}
              />
              <div className="flex gap-4 items-center text-xs text-slate-700">
                {/* <button
                  onClick={() => setToggleSearch(!toggleSearch)}
                  className="bg-slate-100 rounded-full p-2 hover:bg-slate-700 hover:text-slate-50"
                >
                  <Icon
                    icon={IconList.search}
                    size={ICON_SIZES.sm}
                  />
                </button> */}
                <AvatarDropdown employee={sampleEmployee} />
                <Avatar
                  size={AVATAR_SIZES.sm}
                  firstName={sampleEmployee.bioData.firstName}
                  lastName={sampleEmployee.bioData.lastName}
                  imageUrl={sampleEmployee.bioData.avatar}
                />
                {/* <AvatarDropdown items={items} /> */}

                <div className="border-r h-6 text-slate-700 border-slate-200"></div>
                <div className="">
                  <img
                    src="https://demo.hr-flex.com/uploadeddocuments/_assets/companylogo.png"
                    className="h-6"
                    alt=""
                  />
                </div>
                {/* <SearchPallette
                  open={toggleSearch}
                  setOpen={setToggleSearch}
                /> */}
              </div>
            </div>
          </div>
          <main className="overscroll-none pt-12">{props.children}</main>
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
        onClick={() => rootContext.updateNavTitle(label)}
      >
        <div
          className={classNames(
            "group flex items-center border-l-2 w-full  ",
            pathName.includes(link!)
              ? "group-hover:text-gray-700 border-orange-500 text-orange-400 group-hover:bg-slate-200 "
              : "group-hover:text-indigo-800 group-hover:bg-indigo-50 text-slate-400 border-slate-950",
            sideBarIsOpen && pathName.includes(link!)
              ? "bg-slate-900 pr-2 shadow-sm"
              : ""
          )}
        >
          {pathName.includes(link!) ? fillIcon : icon}
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

const AvatarDropdown: FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <MenuButton className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon
            aria-hidden="true"
            className="h-5 w-5"
          />
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
          <form
            action="#"
            method="POST"
          >
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
