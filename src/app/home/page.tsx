"use client";
import {
  GRID_TYPE,
  GridLayout,
  MenuDropdown,
  PageContainer,
  SCREEN_WIDTH,
  SlideOutWrapper,
} from "@/components";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { generateVehicleDetails, Vehicle } from "@/models";
import ReactDOM from "react-dom";
import { FC, useContext, useEffect, useState } from "react";
import { RootContext } from "@/context/RootContext";
import { Bolt, ChevronDown, CircleOff, ClipboardList, Map } from "lucide-react";
import { DashboardHeader, EmployeeCard, InboxCard } from "./components";
import { AddNewFault } from "../service/components";
import { ROLE_TYPE } from "@/models/Shared/RoleTypes";
import { AddNewTrip } from "../trips/components";
import { HomeContext } from "@/context/HomeContext";
import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";

export default function Page() {
  const rootContext = useContext(RootContext);
  const [faultCompletion, setFaultCompletion] = useState<APICompletion>();
  const [tripCompletion, setTripCompletion] = useState<APICompletion>();
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState("");
  const showModalHandler = () => {
    setShowModal(false);
  };

  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
  const parseRequestPermissions = () => {
    const requestItems: {
      id: string;
      label: string;
      function: () => void;
      icon?: JSX.Element;
    }[] = [];
    rootContext.store?.user?.roles[0].crudValues.forEach((role: string) => {
      switch (role) {
        case ROLE_TYPE.home_service_create:
          requestItems.push({
            id: "01",
            label: "New Service Request",
            function: () => {
              setSelectedRequest("service_request");
              setShowModal(true);
            },
            icon: <Bolt className="size-4" />,
          });
          break;
        case ROLE_TYPE.home_fault_create:
          requestItems.push({
            id: "02",
            label: "New Fault Entry",
            function: () => {
              setSelectedRequest("fault");
              setShowModal(true);
            },
            icon: <CircleOff className="size-4" />,
          });
          break;
        case ROLE_TYPE.home_trip_create:
          requestItems.push({
            id: "03",
            label: "New Trip Request",
            function: () => {
              setSelectedRequest("trip");
              setShowModal(true);
            },
            icon: <Map className="size-4" />,
          });
          break;

        default:
          break;
      }
    });
    return requestItems;
  };

  const getFaults = async () => {
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/faults?createdBy=${rootContext.store?.user?.id}`,
      method: "GET",
      // params: { createdBy: rootContext.store?.user?.id },
      headers: API_HEADERS.baseHeaders,
    });

    setFaultCompletion(api);

    if (api.success) {
      //TODO: handle error
    } else {
    }
  };

  const getTrips = async () => {
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/trips?requestedBy=${rootContext.store?.user?.id}`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    setTripCompletion(api);

    if (api.success) {
    } else {
      console.error("Error fetching Trips:", api.errorMessage);
    }
  };

  return (
    <PageContainer
      documentTitle="Home"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showFooter={true}
    >
      <HomeContext.Provider
        value={{
          userVehicles: userVehicles,
          setUserVehicles: setUserVehicles,
          getFaults: getFaults,
          faultCompletion: faultCompletion,
          getTrips: getTrips,
          tripCompletion: tripCompletion,
        }}
      >
        <div className="pb-8 bg-gray-25 overscroll-contain">
          <DashboardHeader />
          <>
            <div className="max-w-3xl px-4 mx-auto lg:max-w-7xl sm:px-6 lg:px-8 space-y-6">
              <div className="border-b flex items-center justify-between py-8">
                <div className="space-y-1 ">
                  <h1 className="text-2xl font-medium text-gray-700">
                    Welcome back, {rootContext.store?.user!.firstName}
                  </h1>
                  <div className="flex items-center space-x-1 text-sm text-gray-900">
                    <p className="text-sm text-gray-700">
                      Today - {formatDate(new Date(), DATE_OPTIONS.full)}
                    </p>
                  </div>
                </div>
                {parseRequestPermissions().length >= 1 && (
                  <MenuDropdown
                    button={
                      <button className="flex items-center gap-4 text-xs py-2.5 px-4 bg-black text-white rounded-md font-medium">
                        New Entry{" "}
                        <span>
                          <ChevronDown className="size-4" />
                        </span>
                      </button>
                    }
                    items={parseRequestPermissions()}
                  />
                )}
              </div>

              <GridLayout
                type={GRID_TYPE.oneTwo}
                lhs={
                  <div className="space-y-8">
                    <EmployeeCard user={rootContext.store?.user!} />
                  </div>
                }
                rhs={
                  <div className="space-y-6">
                    <InboxCard />
                  </div>
                }
              ></GridLayout>
            </div>
          </>

          {ReactDOM.createPortal(
            <SlideOutWrapper
              closeControl={showModalHandler}
              openControl={showModal}
              size={selectedRequest === "trip" ? "max-w-6xl" : "max-w-7xl"}
              enableModalDismiss
            >
              <>
                {selectedRequest === "fault" && (
                  <div className="px-4 py-2">
                    <AddNewFault
                      dismiss={showModalHandler}
                      vehicles={userVehicles}
                    />
                  </div>
                )}
                {selectedRequest === "vehicle" && <p></p>}
                {selectedRequest === "trip" && (
                  <div className="">
                    <AddNewTrip
                      dismiss={showModalHandler}

                      // trip={createSampleTrip()}
                    />
                  </div>
                )}
                {selectedRequest === "work_order" && <p></p>}
                {selectedRequest === "service_request" && <p></p>}
              </>
            </SlideOutWrapper>,
            document.getElementById("modal")!
          )}
        </div>
      </HomeContext.Provider>
    </PageContainer>
  );
}
