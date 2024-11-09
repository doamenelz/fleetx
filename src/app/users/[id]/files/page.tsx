"use client";

import {
  FileDocument,
  sampleDocuments,
  sampleUserDoc,
} from "@/models/Document";
import {
  Button,
  GRID_TYPE,
  GridLayout,
  Lbl,
  PageContainer,
  SCREEN_WIDTH,
  SearchField,
  TextLabel,
  IconDropdown,
  ICON_POSITION,
  DocCard,
} from "@/components";
import { userPageBreadcrumbs } from "../layout";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Trash,
  FileQuestion,
  File,
} from "lucide-react";
import { UserDocumentsTable } from "../../components/UserDocumentsTable";
import { FC } from "react";

export default function Page() {
  const loc = usePathname();
  return (
    <PageContainer
      documentTitle={`Vendors - File`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={userPageBreadcrumbs(loc, "2")}
      bgColor=""
    >
      <div className="space-y-4">
        <div className="flex pt-2 justify-between items-center">
          <SearchField
            placeholder="Search"
            setQuery={() => {}}
          />

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
        {/* <UserDocumentsTable data={sampleDocuments} /> */}
        <GridLayout type={GRID_TYPE.fourCol}>
          {sampleUserDoc.map((doc) => (
            <DocCard
              doc={doc}
              key={doc.id}
            />
          ))}
        </GridLayout>
      </div>
    </PageContainer>
  );
}
