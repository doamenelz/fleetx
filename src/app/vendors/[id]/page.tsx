"use client";

import {
  BackHeader,
  GRID_TYPE,
  GridLayout,
  Lbl,
  PageContainer,
  PageLoader,
  SCREEN_WIDTH,
  SearchField,
  Spinner,
  STATUS_COLORS,
  StatusBadge,
  Tab,
  Tabs,
  Button,
  SectionHeader,
} from "@/components";
import { sampleVehicles, Vehicle } from "@/models/Vehicle/Vehicle";
import { useEffect, useState } from "react";
import { simulateLoader } from "@/lib/utilities/helperFunctions";
import { usePathname } from "next/navigation";
import { vendorBreadCrumbs } from "./layout";
import { sampleVendors, Vendor } from "@/models/Vendors";
import { VendorSummaryCard } from "../components/VendorSummaryCard";
import { VendorTransactionsTable } from "../components/VendorTransactions";
import { sampleVehicleExpenses } from "@/models";
import { ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

export default function Page({ params }: { params: { id: string } }) {
  // const _leaveDetails = sampleBalances.find((p) => p.type === params.id);
  const loc = usePathname();
  useEffect(() => {
    const vendorDetails = sampleVendors[0];
    setSelectedVendor(vendorDetails);
    simulateLoader(setIsLoading, 2000);
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<Vendor>();

  return (
    <PageContainer
      documentTitle={`Vendors - ${params.id}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={vendorBreadCrumbs(loc, "1")}
    >
      {isLoading ? (
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting Vendor Information.." }} />
        </div>
      ) : (
        <div className="py-4">
          <GridLayout
            type={GRID_TYPE.oneTwo}
            rhs={
              <>
                <SectionHeader title="Transactions" />
                <div className="flex pt-2 justify-between items-center">
                  <SearchField placeholder="Search" setQuery={() => {}} />

                  <div className="flex gap-2">
                    <Lbl
                      label={`5 of ${sampleVehicleExpenses.length} results`}
                    />
                    <div className="">
                      <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <VendorTransactionsTable data={sampleVehicleExpenses} />
              </>
            }
            lhs={
              <>
                <VendorSummaryCard vendor={selectedVendor!} />
                {/* <VendorSummaryCard vendor={selectedVendor!} /> */}
              </>
            }
          ></GridLayout>
        </div>
      )}
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
