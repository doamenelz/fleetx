"use client";

import {
  BackHeader,
  PageContainer,
  PageLoader,
  PlainCard,
  SCREEN_WIDTH,
  Spinner,
  STATUS_COLORS,
  StatusBadge,
  Tab,
  Tabs,
} from "@/components";

import { usePathname } from "next/navigation";
import { CategoryTable } from "./components/CategoryTable";

//TODO: Update the Document Title
export default function Page() {
  const loc = usePathname();

  return (
    <PageContainer
      documentTitle={`Administration | Category`}
      fullWidth={SCREEN_WIDTH.regular}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={[
        { id: "001", name: loc.split("/")[2], href: "" },
        { id: "002", name: "Category", href: "" },
      ]}
    >
      <div className="py-4">
        {" "}
        <PlainCard>
          <CategoryTable />
        </PlainCard>
      </div>
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
