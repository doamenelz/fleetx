"use client";

import { BreadCrumb, PageHeader } from "@/components";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";
import { useState } from "react";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showHeader, setShowHeader] = useState(true);
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([]);
  return (
    <ModuleContainerContext.Provider
      value={{
        mainPage: { id: "", name: "Vendors", href: "/vendors" },
        setShowHeader: setShowHeader,
        breadCrumbs: breadCrumbs,
        showHeader: showHeader,
        setBreadCrumbs: setBreadCrumbs,
      }}
    >
      <>
        <PageHeader />
        {children}
      </>
    </ModuleContainerContext.Provider>
  );
}
