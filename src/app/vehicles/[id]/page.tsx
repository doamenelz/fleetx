"use client";

import { BackHeader, PageContainer, SCREEN_WIDTH } from "@/components";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  // const _leaveDetails = sampleBalances.find((p) => p.type === params.id);

  useEffect(() => {}, []);
  return (
    <PageContainer
      documentTitle={`Vehicles - ${params.id}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
    >
      <BackHeader previousPathName="Vehicles" />
    </PageContainer>
  );
}
