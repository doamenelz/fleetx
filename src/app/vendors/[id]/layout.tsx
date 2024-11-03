"use client";
import { usePathname } from "next/navigation";
import {
  BackHeader,
  PageContainer,
  SCREEN_WIDTH,
  Spinner,
  Tab,
  Tabs,
} from "@/components";
import { sampleVehicles, Vehicle } from "@/models/Vehicle/Vehicle";
import { useContext, useEffect, useState } from "react";
import { simulateLoader } from "@/lib/utilities/helperFunctions";
import { useRouter } from "next/router";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";

import { BreadCrumb } from "@/components";
import { sampleVendors, Vendor } from "@/models/Vendors";
const tabs = (loc: string) => {
  return [
    {
      name: "Details",
      href: `/vendors/${loc.split("/")[2]}`,
      id: "1",
    },
    {
      name: "Files",
      href: `/vendors/${loc.split("/")[2]}/files`,
      id: "2",
    },
  ];
};

export const vendorBreadCrumbs = (loc: string, id: string) => {
  var _breadCrumbs: BreadCrumb[] = [
    { id: "001", name: loc.split("/")[2], href: "" },
  ];

  _breadCrumbs.push(tabs(loc).find((breadC) => breadC.id === id)!);
  return _breadCrumbs;
};

export default function VehicleDetails({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  //   const loc = location.pathname.split("/");
  const loc = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<Vendor>();

  const [selectedTab, setSelectedTab] = useState<string>(loc);
  useEffect(() => {
    setSelectedTab(loc);
    const vendorDetails = sampleVendors.find(
      (vendor) => vendor.id === loc.split("/")[2]
    );
    setSelectedVendor(vendorDetails);
    simulateLoader(setIsLoading, 2000);
  }, [loc]);

  const tabHandler = (tabId: string) => {
    setSelectedTab(tabId);
  };

  return (
    <PageContainer
      documentTitle={`Inventory - `}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={vendorBreadCrumbs(loc, "1")}
    >
      {isLoading ? (
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting Vendor Details.." }} />
        </div>
      ) : (
        <>
          <div className="sticky top-12 w-full z-10 bg-white">
            <div className="py-4">
              <p className="text-xs text-slate-500">#{selectedVendor?.id}</p>

              <p className="items-center flex gap-1 font-semibold text-2xl">
                {selectedVendor!.name !== "" ? selectedVendor!.name : <></>}
              </p>
            </div>
            <Tabs
              tabs={tabs(loc)}
              tabHandler={tabHandler}
              selectedTab={selectedTab}
            >
              <></>
            </Tabs>
          </div>
          {children}
        </>
      )}
    </PageContainer>
  );
}
