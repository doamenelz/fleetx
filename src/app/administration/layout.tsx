"use client";

import {
  BackHeader,
  BreadCrumb,
  NavigationProps,
  PageContainer,
  PageHeader,
  PageLoader,
  SCREEN_WIDTH,
  SecondaryNavigation,
  Spinner,
  STATUS_COLORS,
  StatusBadge,
  Tab,
  Tabs,
} from "@/components";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";
import { classNames } from "@/lib/utilities/helperFunctions";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { FC, useState } from "react";

interface AdministrationNavProps {
  id: string;
  category: string;
  items: {
    id: string;
    label: string;
    link: string;
    children?: AdministrationNavProps[];
  }[];
}

const navProps: AdministrationNavProps[] = [
  {
    id: "inventory",
    category: "INVENTORY",
    items: [
      {
        id: "manufacturer",
        label: "Manufacturer",
        link: "/administration/inventory/manufacturer",
      },
      {
        id: "category",
        label: "Category",
        link: "/administration/inventory/category",
      },
      {
        id: "colors",
        label: "Colors",
        link: "/administration/inventory/colors",
      },
    ],
  },
  {
    id: "forms",
    category: "FORMS",
    items: [
      { id: "user", label: "User", link: "" },
      { id: "vehicles", label: "Vehicles", link: "" },
      { id: "service", label: "Service", link: "" },
      { id: "parts", label: "Parts", link: "" },
      { id: "vendors", label: "Vendors", link: "" },
    ],
  },

  {
    id: "organization",
    category: "ORGANIZATION",
    items: [
      { id: "general", label: "General Settings", link: "" },
      { id: "companies", label: "Groups and Companies", link: "" },
      { id: "locations", label: "Location", link: "" },
      { id: "departments", label: "Departments", link: "" },
    ],
  },
  {
    id: "access-permissions",
    category: "PERMISSIONS",
    items: [
      { id: "roles", label: "Roles", link: "" },
      { id: "formsa", label: "Mob", link: "" },
    ],
  },
];

//TODO: Update the Document Title
export default function ConfigurationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loc = usePathname();
  const navItems = SecondaryNavigation.find(
    (nav) => nav.id === loc.split("/")[1]
  );

  const [showHeader, setShowHeader] = useState(true);
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([]);

  return (
    <PageContainer
      documentTitle={`Conf -`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
    >
      <ModuleContainerContext.Provider
        value={{
          mainPage: {
            id: "",
            name: "Administration",
            href: "/administration",
          },
          setShowHeader: setShowHeader,
          breadCrumbs: breadCrumbs,
          showHeader: showHeader,
          setBreadCrumbs: setBreadCrumbs,
        }}
      >
        <div className="flex">
          <div className="w-56 bg-white border-r flex-col flex h-screen overflow-auto">
            <p className="font-lg font-semibold p-3">Administration</p>
            <ul className="space-y-8 p-4">
              {navProps.map((item) => (
                <NavSection item={item} key={item.id} />
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full">
            <>
              <PageHeader />
              {children}
            </>
          </div>
        </div>
      </ModuleContainerContext.Provider>
    </PageContainer>
  );
}

const NavSection: FC<{ item: AdministrationNavProps }> = ({ item }) => {
  const loc = usePathname();
  return (
    <div className="space-y-1">
      <p className="text-[10px] text-slate-400 font-semibold">
        {item.category}
      </p>
      <ul className="space-y-1">
        {item.items.map((item) => (
          <Link href={item.link} key={item.id}>
            <p
              className={classNames(
                "p-2 rounded-sm text-xs font-medium ",
                item.link.includes(loc.split("/")[3])
                  ? "bg-brand-oceanicNoir text-gray-25 hover:bg-brand-grayBlue "
                  : "text-gray-600 hover:bg-gray-200"
              )}
            >
              {item.label}
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
};
