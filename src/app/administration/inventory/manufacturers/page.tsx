"use client";

import { PageContainer, PlainCard, SCREEN_WIDTH } from "@/components";

import { usePathname } from "next/navigation";
import { ManufacturerTable } from "./components/ManufacturersTable";

//TODO: Update the Document Title
export default function Page({ params }: { params: { id: string } }) {
  const loc = usePathname();

  return (
    <PageContainer
      documentTitle={`Vehicles -`}
      fullWidth={SCREEN_WIDTH.regular}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={[
        { id: "001", name: loc.split("/")[2], href: "" },
        { id: "002", name: "Manufacturers", href: "" },
      ]}
    >
      <div className="py-4">
        <PlainCard>
          <ManufacturerTable />
        </PlainCard>
      </div>
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
