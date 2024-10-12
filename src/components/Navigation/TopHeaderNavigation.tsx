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
import {
  Building,
  Building2,
  EllipsisVerticalIcon,
  ExternalLink,
  LogOut,
} from "lucide-react";

export const TopHeaderNavigation: FC<{
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
        <div className={classNames("")}>
          <div
            className={classNames(
              "bg-white z-30 fixed top-0 inset-x-0 overscroll-contain "
            )}
          >
            <div className=" w-full top-0 bg-gray-25 px-4 border-b items-center flex justify-between">
              <div className="flex items-center">
                <div className="flex items-baseline px-2 gap-1 border-r">
                  <img
                    src="./fleetLong.svg"
                    className="h-4"
                  />
                  {/* <p className="text-xs text-slate-600 font-mono">Analytics</p> */}
                </div>

                <nav className=" pl-2">
                  <ul
                    className={classNames(
                      "flex text-xs font-normal items-center gap-2"
                    )}
                  >
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
              </div>
              <div className="flex gap-4 items-center text-xs text-slate-700">
                <AvatarDropdown employee={sampleEmployee} />

                <div className="border-r h-6 text-slate-700 border-slate-200"></div>
                <div className="">
                  <img
                    src="https://demo.hr-flex.com/uploadeddocuments/_assets/companylogo.png"
                    className="h-6"
                    alt=""
                  />
                </div>
                <SearchPallette
                  open={toggleSearch}
                  setOpen={setToggleSearch}
                />
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
            "group flex items-center w-full  py-2 border-b-2",
            pathName.includes(link!)
              ? "group-hover:text-slate-700 border-brand-black text-brand-black  "
              : "group-hover:text-slate-800  text-slate-600 border-white",
            sideBarIsOpen && pathName.includes(link!)
              ? "bg-slate-900 pr-2 shadow-sm"
              : ""
          )}
        >
          {/* {pathName.includes(link!) ? fillIcon : icon} */}
          <p
            className={classNames(
              "font-medium py-2 px-2 group-hover:bg-slate-100 rounded-sm text-xs"
            )}
          >
            {label}
          </p>

          {notificationCount !== undefined && notificationCount > 0 && (
            <span className="w-2 h-2 -mt-2 text-xs rounded-full bg-error-500"></span>
          )}
        </div>
      </Link>

      {/* {!sideBarIsOpen && (
        <span className="absolute z-50 hidden p-2 ml-12 -mt-10 font-medium bg-gray-950 border border-gray-500 rounded-sm cursor-text text-gray-50 group-hover:block">
          {label}
        </span>
      )} */}
    </div>
  );
};

const AvatarDropdown: FC<{ employee: Employee }> = ({ employee }) => {
  const items = [
    {
      id: "1",
      label: "Company Profile",
      action: () => {},
      icon: <Building2 className="h-3 w-3" />,
    },
    {
      id: "2",
      label: "Sign Out",
      action: () => {},
      icon: <LogOut className="h-3 w-3" />,
    },
    {
      id: "3",
      label: "Go to HRFlex Core",
      action: () => {},
      icon: <ExternalLink className="h-3 w-3" />,
    },
  ];
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div>
        <MenuButton className="flex items-center hover:outline-none hover:ring-2 hover:ring-brand-blueFlower hover:ring-offset-2 hover:ring-offset-gray-100 rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <Avatar
            size={AVATAR_SIZES.sm}
            firstName={employee.bioData.firstName}
            lastName={employee.bioData.lastName}
            imageUrl={employee.bioData.avatar}
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="p-2">
          <ul className="border-b pb-2 space-y-1">
            {items.slice(0, 2).map((item) => (
              <MenuItem key={item.id}>
                <button className="flex w-full gap-2 items-center p-2 text-slate-600 hover:bg-slate-100 rounded hover:text-slate-900">
                  {item.icon}
                  <p>{item.label}</p>
                </button>
              </MenuItem>
            ))}
          </ul>
          {/* <MenuItem key={items[2].id}>
            <button className="flex w-full gap-2 items-center mt-1 p-2 hover:bg-indigo-50 rounded hover:text-indigo-700">
              {items[2].icon}
              <p>{items[2].label}</p>
            </button>
          </MenuItem> */}
        </div>
      </MenuItems>
    </Menu>
  );
};
