import { FC, useContext, useState } from "react";
import { FlexGray, FlexLogoFull } from "@/assets";
import flex from "../../assets/Flex.svg";
import {
  NavigationProps,
  PrimaryNavigation,
  SecondaryNavigation,
  Tabs,
} from "@/components";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
import { sampleEmployee } from "@/models";
import Link from "next/link";
import { RootContext } from "@/context/RootContext";

export const AppsLayout = () => {
  //   const rootContext = useContext(RootContext);

  const [selectedTab, setSelectedTab] = useState("Personal Apps");
  const [toggleSearch, setToggleSearch] = useState(false);

  const filteredApps = () => {
    var _filteredApps: NavigationProps[] = [
      ...PrimaryNavigation,
      ...SecondaryNavigation,
    ];

    // switch (selectedTab) {
    //   case "personal":
    //     _filteredApps = CentralNavigationList.filter(
    //       (item) => item.category === NavCategory.personal
    //     );
    //     break;
    //   case "company":
    //     _filteredApps = CentralNavigationList.filter(
    //       (item) => item.category === NavCategory.company
    //     );
    //     break;
    //   default:
    //     _filteredApps = CentralNavigationList;
    //     break;
    // }

    return _filteredApps;
  };

  return (
    <div className="flex flex-col mt-4 justify-between h-[calc(100vh-56px)] ">
      <div className="w-full px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b">
          <div className="z-10 pt-8 pb-4 space-y-1">
            <div className="flex items-center space-x-1 text-sm text-gray-900">
              <p className="text-xs text-gray-700">
                {formatDate(new Date(), DATE_OPTIONS.full)}
              </p>
            </div>
            <h1 className="text-lg font-medium text-gray-700">
              Welcome back, {sampleEmployee.bioData.firstName}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full gap-2 mx-auto text-sm text-center bg-gray-50 flex items-center p-4">
        <FlexLogoFull />
        <p className="text-xs text-center text-gray-700">
          by Quetzal Consults Ltd © 2024
        </p>
      </div>
    </div>
  );
};

const NavigationCell: FC<{ navItem: NavigationProps }> = ({ navItem }) => {
  const rootContext = useContext(RootContext);
  return (
    <Link
      href={navItem.link}
      onClick={() => rootContext.updateNavTitle(navItem.label)}
    >
      <div className="flex col-span-1 items-top gap-2 p-4 text-left rounded-md hover:bg-gray-25 group shadow-none hover:shadow-xl hover:shadow-gray-100 hover:ring-gray-100 hover:ring-1 ">
        <div className=" text-gray-600 rounded-md  group-hover:text-primary-900 group-hover:bg-gray-50">
          {navItem.icon}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700 group-hover:text-primary-900">
            {navItem.label}
          </p>
          <p className="text-xs text-gray-500">{navItem.description}</p>
        </div>
      </div>
    </Link>
  );
};
