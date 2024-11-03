"use client";

import { sampleDocuments } from "@/models/Document";
import { VendorDocumentsTable } from "../../components/VendorDocumentsTable";
import {
  Button,
  Lbl,
  PageContainer,
  SCREEN_WIDTH,
  SearchField,
} from "@/components";
import { vendorBreadCrumbs } from "../layout";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Page() {
  const loc = usePathname();
  return (
    <PageContainer
      documentTitle={`Vendors - File`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={vendorBreadCrumbs(loc, "2")}
      bgColor=""
    >
      <div className="">
        <div className="flex pt-2 justify-between items-center">
          <SearchField placeholder="Search" setQuery={() => {}} />

          <div className="flex gap-2">
            <Lbl label={`5 of ${sampleDocuments.length} results`} />
            <div className="">
              <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="items-center flex gap-2">
              <Button label="Upload Document" />
            </div>
          </div>
        </div>
        <VendorDocumentsTable data={sampleDocuments} />
      </div>
    </PageContainer>
  );
}
