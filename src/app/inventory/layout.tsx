"use client";

import { PageHeader } from "@/components";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModuleContainerContext.Provider
      value={{
        headerLabel: "Inventory",
        setShowHeader: () => {},
        breadCrumbs: [],
        showHeader: true,
      }}
    >
      <>
        <PageHeader />
        {children}
      </>
    </ModuleContainerContext.Provider>
  );
}
