"use client";

import {
  BackHeader,
  GRID_TYPE,
  GridLayout,
  PageContainer,
  PageLoader,
  SCREEN_WIDTH,
  Spinner,
  STATUS_COLORS,
  StatusBadge,
  Tab,
  Tabs,
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

export default function Page({ params }: { params: { id: string } }) {
  // const _leaveDetails = sampleBalances.find((p) => p.type === params.id);
  const loc = usePathname();
  useEffect(() => {
    const vendorDetails = sampleVendors.find(
      (vendor) => vendor.id === params.id
    );
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
            type={GRID_TYPE.twoOne}
            lhs={<VendorTransactionsTable data={sampleVehicleExpenses} />}
            rhs={
              <>
                <VendorSummaryCard vendor={selectedVendor!} />
                <VendorSummaryCard vendor={selectedVendor!} />
              </>
            }
          ></GridLayout>
        </div>
      )}
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
