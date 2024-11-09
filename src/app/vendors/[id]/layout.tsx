"use client";
import { usePathname } from "next/navigation";
import {
  BackHeader,
  Button,
  ICON_POSITION,
  IconDropdown,
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
import { ChevronDown, UserPen, UserRoundMinus } from "lucide-react";
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
            <div className="flex justify-between items-center gap-4 py-4 pl-3 pr-4 bg-gradient-to-r from-gray-25 via-gray-50  to-brand-tan">
              <div className="py-2">
                <p className="text-xs text-slate-500">#{selectedVendor?.id}</p>
                <p className="items-center flex gap-1 font-semibold text-2xl">
                  {selectedVendor!.name !== "" ? selectedVendor!.name : <></>}
                </p>
              </div>
              <IconDropdown
                items={[
                  {
                    id: "1",
                    label: "Edit Vendor",
                    function: () => {
                      // setModalType("edit_user");
                      // showModalHandler();
                    },
                    icon: <UserPen className="w-3 h-3" />,
                  },
                  {
                    id: "2",
                    label: "Disable Vendor",
                    function: () => {
                      // selectedUser?.status === "Active"
                      //   ? setModalType("deactivate_user")
                      //   : setModalType("activate_user");
                      // showModalHandler();
                    },
                    icon: <UserRoundMinus className="w-3 h-3" />,
                  },
                ]}
                button={
                  <Button
                    label="Manage Vendor"
                    icon={{
                      position: ICON_POSITION.trailing,
                      asset: <ChevronDown className="w-4 h-4" />,
                    }}
                  />
                }
              />
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
