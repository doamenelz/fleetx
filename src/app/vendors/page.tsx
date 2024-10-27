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
import { sampleVendors } from "@/models/Vendors";

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
        <div className="flex justify-between gap-2 items-center pt-2">
          <SearchField
            placeholder="Search"
            setQuery={() => {}}
          />
          <div className="flex gap-2">
            <Lbl label={`15 results`} />
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
        <VendorTableList data={sampleVendors} />
      </div>
    </PageContainer>
  );
}
