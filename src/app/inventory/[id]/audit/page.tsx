"use client";

import { PageContainer, SCREEN_WIDTH } from "@/components";
import { VehicleAuditTable } from "../../components/VehicleAuditTable";
import { sampleVehicleAudit } from "@/models/Audit";
import { getVehicleBreadCrumbs } from "../breadCrumbModel";
import { usePathname } from "next/navigation";

export default function Page() {
  const loc = usePathname();
  return (
    <PageContainer
      documentTitle={`Vehicles`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={getVehicleBreadCrumbs(loc, "7")}
    >
      <VehicleAuditTable data={sampleVehicleAudit} />
    </PageContainer>
  );
}
