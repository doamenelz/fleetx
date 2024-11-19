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

//TODO: Update the Document Title
export default function Page({ params }: { params: { id: string } }) {
  const loc = usePathname();

  return (
    <PageContainer
      documentTitle={`Vehicles -`}
      fullWidth={SCREEN_WIDTH.regular}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
    >
      <p>Manufacturer</p>
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
