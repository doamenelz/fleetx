/**
 * History
 * Work Orders
 * Faults
 *
 * This Month - completed, scheduled, overdue
 */

"use client";
import {
  BreadCrumb,
  InnerSideNavigation,
  PageHeader,
  PrimaryNavigation,
} from "@/components";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MyBioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const navigation = PrimaryNavigation.find((nav) => path.includes(nav.link));
  const [showHeader, setShowHeader] = useState(true);
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([]);
  return (
    <ModuleContainerContext.Provider
      value={{
        mainPage: { id: "", name: "Service", href: "/service" },
        setShowHeader: setShowHeader,
        breadCrumbs: breadCrumbs,
        showHeader: showHeader,
        setBreadCrumbs: setBreadCrumbs,
      }}
    >
      <PageHeader />
      <InnerSideNavigation
        moduleName=""
        top={true}
        items={navigation?.children ?? []}
      >
        <>{children}</>
      </InnerSideNavigation>
    </ModuleContainerContext.Provider>
  );
}
