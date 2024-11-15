"use client";

import {
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  SearchField,
  Lbl,
  IconDropdown,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
  MenuDropdownItemProp,
  PageLoader,
} from "@/components";
import {
  PlusIcon,
  Upload,
  Download,
  Ellipsis,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Filter,
} from "lucide-react";
import { VendorTableList } from "./components";
import { sampleVehicles } from "@/models";
import { sampleVendors, Vendor } from "@/models/Vendors";
import { apiHandler } from "@/lib/utilities/apiHelper";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "@/context/RootContext";
import { VendorClass } from "@/models/Configurations";

const vehicleControlItems: MenuDropdownItemProp[] = [
  {
    id: "1",
    label: "Import from CSV",
    function: () => {},
    icon: <Upload className="w-3 h-3" />,
  },
  {
    id: "2",
    label: "Download to CSV",
    function: () => {},
    icon: <Download className="w-3 h-3" />,
  },
];

export default function Page() {
  const rootContext = useContext(RootContext);
  const [vendors, setVendors] = useState<Vendor[]>();
  const [isLoading, setLoadComplete] = useState(true);
  const [vendorClass, setVendorClass] = useState<VendorClass>();

  const getVendors = async () => {
    console.log("Calling Get Vendors");
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/vendors`,
      method: "GET",
    });
    if (api.success) {
      let response = api.data.data as Vendor[];
      console.log(response);
      setVendors(response);
      setLoadComplete(false);
    } else {
      //TODO: Show Error Component
      console.log("Getting Vendor List Failed");
    }
  };

  const getVendorClass = () => {
    const _config = sessionStorage.getItem("configurations");

    if (_config !== null) {
      const parseConfig = JSON.parse(_config);
      const parsedVendorClass = parseConfig.find(
        (item: { type: string }) => item.type === "VENDOR_CLASSES"
      ) as VendorClass;
      console.log(parsedVendorClass?.classes[0]);
      setVendorClass(parsedVendorClass);
    }

    //TODO: Call API if Configuration hasn't loaded
  };

  useEffect(() => {
    getVendorClass();
    getVendors();
  }, []);
  return (
    <PageContainer
      documentTitle="Vendors"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showFooter={false}
      showHeader={true}
    >
      <div>
        {isLoading ? (
          <PageLoader size="sm" label="Getting Vendors.." />
        ) : (
          <>
            {" "}
            <div className="flex justify-between gap-2 items-center pt-2">
              <SearchField placeholder="Search" setQuery={() => {}} />
              <div className="flex gap-2">
                <Lbl label={`${vendors?.length} results`} />
                <div className="border-r pr-2">
                  <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <button className="border p-2 rounded hover:bg-slate-50 hover:text-brand-blueRoyal">
                  <Filter className="w-4 h-4" />
                </button>
                <div className="items-center flex gap-2">
                  <IconDropdown
                    items={vehicleControlItems}
                    button={
                      <div className="p-2 rounded-sm border hover:bg-slate-50 hover:text-brand-blueRoyal">
                        <Ellipsis className="w-4 h-4" />
                      </div>
                    }
                  />
                  <Button
                    onClick={() => {}}
                    label="New Vendor"
                    skin={BUTTON_SKIN.primary}
                    icon={{
                      position: ICON_POSITION.trailing,
                      asset: <PlusIcon className="w-3 h-3" />,
                    }}
                  />
                </div>
              </div>
            </div>
            <VendorTableList data={vendors!} vendorClass={vendorClass!} />
          </>
        )}
      </div>
    </PageContainer>
  );
}
