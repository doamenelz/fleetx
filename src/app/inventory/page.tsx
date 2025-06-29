"use client";
import {
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
  Lbl,
  MainHeader,
  NOTIFICATION_TYPE,
  PageContainer,
  PageHeader,
  PlainCard,
  SCREEN_WIDTH,
  SearchField,
  SectionHeader,
  setScreenWidth,
  SummaryCardHeader,
  SummaryCardObject,
} from "@/components";
import { classNames, showNotification } from "@/lib/utilities/helperFunctions";
import { VehicleTableList } from "./components/VehicleTableList";
import { sampleVehicles, Vehicle } from "@/models/Vehicle/Vehicle";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Ellipsis,
  PlusIcon,
  Upload,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";
import { API_HEADERS, apiHandler } from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";

const summaryStats: SummaryCardObject[] = [
  {
    name: "# of Vehicles",
    value: "520",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Active",
    value: "487",
    change: "+2.66%",
    changeType: "positive",
  },
  {
    name: "Repairs / Servicing",
    value: "15",
    change: "-2%",
    changeType: "neutral",
  },
  {
    name: "Decommissioned",
    value: "18",
    change: "+1",
    changeType: "positive",
  },
];

export default function Page() {
  const rootContext = useContext(RootContext);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);

  const getInventory = async () => {
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/inventory`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      console.log(api);
      const results = (await api.data.data) as Vehicle[];
      setVehicleList(results);
    } else {
      // setShowModal(false);
      //TODO: Resolve
      console.log("Failed");
      showNotification(
        NOTIFICATION_TYPE.error,
        "Something went wrong",
        api.errorMessage ?? "",
        rootContext
      );
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <PageContainer
      documentTitle="Inventory"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showFooter={false}
      showHeader={true}
    >
      <div
        className={classNames("space-y-4", setScreenWidth(SCREEN_WIDTH.full))}
      >
        <SummaryCardHeader stats={summaryStats} />
        <PlainCard>
          <VehicleTableList data={vehicleList} />
        </PlainCard>
      </div>
    </PageContainer>
  );
}
