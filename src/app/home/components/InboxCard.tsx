import { FaultInboxCell, ServiceInboxCell } from "@/app/service/components";
import { TripInboxCell } from "@/app/trips/components/TripInboxCell";
import {
  EmptyTable,
  ICON_POSITION,
  PlainCard,
  TabItem,
  Tabs,
} from "@/components";
import { HomeContext } from "@/context/HomeContext";
import { RootContext } from "@/context/RootContext";
import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";
import { simulateLoader } from "@/lib/utilities/helperFunctions";
import {
  createSampleTrip,
  createSampleVehicleFault,
  Trip,
  VehicleFault,
} from "@/models";
import { ROLE_TYPE } from "@/models/Shared/RoleTypes";
import {
  createVehicleService,
  VehicleService,
} from "@/models/Vehicle/VehicleService";
import {
  Bolt,
  CircleOff,
  ClipboardList,
  Mailbox,
  MailboxIcon,
  Map,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

//TODO: Show error state for failed faults
export const InboxCard = () => {
  const rootContext = useContext(RootContext);
  const homeContext = useContext(HomeContext);
  const loc = usePathname();
  const [selectedTab, setSelectedTab] = useState("Service");
  const [serviceCompletion, setServiceCompletion] = useState<APICompletion>();
  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
  };
  // const [faultCompletion, setFaultCompletion] = useState<APICompletion>();
  // const [tripCompletion, setTripCompletion] = useState<APICompletion>();

  const getServiceList = () => {
    setServiceCompletion({
      status: 200,
      data: [
        createVehicleService(),
        createVehicleService(),
        createVehicleService(),
        createVehicleService(),
        createVehicleService(),
      ] as VehicleService[],
      success: true,
    });
  };

  useEffect(() => {
    simulateLoader(() => {
      getServiceList();
    }, 3000);
    homeContext.getFaults();
    homeContext.getTrips();
  }, []);

  const parseTabPermissions = () => {
    const items: TabItem[] = [];

    rootContext.store?.user?.roles[0].crudValues.forEach((role: string) => {
      switch (role) {
        // case ROLE_TYPE.home_view_request_history:
        //   items.push({
        //     id: "01",
        //     label: "Requests",
        //     icon: {
        //       asset: <Mailbox className="size-4" />,
        //       position: "leading",
        //     },
        //   });
        //   break;
        case ROLE_TYPE.home_view_service_history:
          items.push({
            id: "02",
            label: "Service",
            icon: { asset: <Bolt className="size-4" />, position: "leading" },
          });
          break;
        case ROLE_TYPE.home_view_fault_history:
          items.push({
            id: "03",
            label: "Faults",
            icon: {
              asset: <CircleOff className="size-4" />,
              position: "leading",
            },
          });
          break;
        case ROLE_TYPE.home_view_work_order_history:
          items.push({
            id: "04",
            label: "Work Orders",
            icon: {
              asset: <ClipboardList className="size-4" />,
              position: "leading",
            },
          });
          break;
        case ROLE_TYPE.home_view_trip_history:
          items.push({
            id: "05",
            label: "Trips",
            icon: { asset: <Map className="size-4" />, position: "leading" },
          });
          break;

        default:
          break;
      }
    });

    return items.sort((a, b) => Number(a.id) - Number(b.id));
  };
  return (
    <div className="min-h-[300px]">
      <Tabs
        tabs={parseTabPermissions()}
        tabHandler={handleTabChange}
        selectedTab={selectedTab}
      />
      <div className="pt-3">
        {selectedTab === "Service" && (
          <>
            {serviceCompletion && serviceCompletion.success && (
              <>
                {serviceCompletion.data.length >= 1 ? (
                  <>
                    {serviceCompletion.data.map((service: VehicleService) => (
                      <ServiceInboxCell
                        service={service}
                        key={service.id}
                      />
                    ))}
                    {serviceCompletion.data.length > 5 && (
                      <Link
                        href={""}
                        className="w-full "
                      >
                        <p className="text-center w-full text-xs py-2 hover:bg-primary-50 rounded-md">
                          View All
                        </p>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <p>Nothing pending</p>
                  </>
                )}
              </>
            )}
            {serviceCompletion === undefined && (
              <>
                <LoadingInboxCell />
                <LoadingInboxCell />
                <LoadingInboxCell />
              </>
            )}
          </>
        )}

        {selectedTab === "Faults" && (
          <>
            {homeContext.faultCompletion &&
              homeContext.faultCompletion.success && (
                <>
                  {homeContext.faultCompletion.data.results.length >= 1 ? (
                    <>
                      {homeContext.faultCompletion.data.results.map(
                        (fault: VehicleFault) => (
                          <FaultInboxCell
                            fault={fault}
                            key={fault.id}
                          />
                        )
                      )}
                      {homeContext.faultCompletion.data.results.length > 5 && (
                        <Link
                          href={""}
                          className="w-full "
                        >
                          <p className="text-center w-full text-xs py-2 hover:bg-primary-50 rounded-md">
                            View All
                          </p>
                        </Link>
                      )}
                    </>
                  ) : (
                    <>
                      <p>Nothing pending</p>
                    </>
                  )}
                </>
              )}
            {homeContext.faultCompletion &&
              homeContext.faultCompletion.success === false && (
                <p>{homeContext.faultCompletion.errorMessage}</p>
              )}

            {homeContext.faultCompletion === undefined && (
              <>
                <LoadingInboxCell />
                <LoadingInboxCell />
                <LoadingInboxCell />
              </>
            )}
          </>
        )}

        {selectedTab === "Trips" && (
          <>
            {homeContext.tripCompletion &&
              homeContext.tripCompletion.success && (
                <>
                  {homeContext.tripCompletion.data.length >= 1 ? (
                    <>
                      {homeContext.tripCompletion.data.map((trip: Trip) => (
                        <TripInboxCell
                          trip={trip}
                          key={trip.id}
                        />
                      ))}
                      {homeContext.tripCompletion.data.length > 5 && (
                        <Link
                          href={""}
                          className="w-full "
                        >
                          <p className="text-center w-full text-xs py-2 hover:bg-primary-50 rounded-md">
                            View All
                          </p>
                        </Link>
                      )}
                    </>
                  ) : (
                    <>
                      <p>Nothing pending</p>
                    </>
                  )}
                </>
              )}
            {homeContext.tripCompletion &&
              homeContext.tripCompletion.success === false && (
                <EmptyTable
                  title={homeContext.tripCompletion.errorMessage ?? ""}
                />
              )}

            {homeContext.tripCompletion === undefined && (
              <>
                <LoadingInboxCell />
                <LoadingInboxCell />
                <LoadingInboxCell />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Trip Approvals
 * Vehicle Requests
 *
 *
 *
 */

const LoadingInboxCell = () => {
  return (
    <div className="flex animate-pulse space-x-4 w-full items-center rounded-md p-4">
      <div className="size-16 rounded-md bg-gradient-to-tl from-gray-200 via-gray-50 to-gray-100"></div>
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 rounded bg-gray-200"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-4 rounded bg-gray-200"></div>
            <div className="col-span-1 h-4 rounded bg-gray-200"></div>
          </div>
          <div className="h-4 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
const InboxCell = () => {
  return (
    <div className="flex items-center p-4 ">
      <div className="flex items-center justify-center size-16 rounded-md bg-gray-100">
        <MailboxIcon className="size-6" />
      </div>
      <div>
        <p>Jenny sent a request</p>
        <p>Jenny sent a request</p>
        <p>Date</p>
      </div>
    </div>
  );
};
