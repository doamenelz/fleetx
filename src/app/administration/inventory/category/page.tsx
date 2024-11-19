"use client";

import {
  BackHeader,
  PageContainer,
  PageLoader,
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
    >
      <>
        <CategoryTable />
      </>
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
