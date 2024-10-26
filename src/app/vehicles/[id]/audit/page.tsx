"use client";

import { PageContainer, SCREEN_WIDTH } from "@/components";
import { VehicleAuditTable } from "../../components/VehicleAuditTable";
import { sampleVehicleAudit } from "@/models/Audit";

export default function Page() {
  return (
    <PageContainer
      documentTitle={`Vehicles`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
    >
      <VehicleAuditTable data={sampleVehicleAudit} />
    </PageContainer>
  );
}
