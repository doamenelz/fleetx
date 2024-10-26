import { FC, useState } from "react";
import ReactDOM from "react-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableRow,
  AVATAR_SIZES,
  Avatar,
  StatusBadge,
  STATUS_COLORS,
  Lbl,
  SlideOutWrapper,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { Vehicle } from "@/models/Vehicle/Vehicle";
import Link from "next/link";
import { ServiceReminders } from "@/models/ServiceAndRecalls/Service";
import { ServiceDetails } from "@/app/service/components/ServiceDetails";

export const VehicleServiceTableList: FC<{ data: ServiceReminders[] }> = ({
  data,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const showModalHandler = () => {
    //TODO: Make API call to get the list of reports on modal dismiss if the user saved changes
    setShowModal(false);
    // setIsLoading(false);
    // simulateLoader(setIsLoading, 2000);
  };

  const viewServiceDetailsHandler = (id: string) => {
    setSelectedService(id);
    setShowModal(true);
  };

  const getServiceFromId = (id: string) => {
    return data.find((service) => service.id === id);
  };

  return (
    <>
      <TableContext.Provider
        value={{
          updateData: () => {},
          updatePageDetails: () => {},
          data: data,
          page: { totalResults: data.length, tableMax: 8 },
        }}
      >
        <TableContainer
          mainContent={
            <Table
              height="270px"
              head={
                <>
                  <TableHeadCell
                    label={"# ID"}
                    mainCell={true}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Due Date"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Service Date"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Status"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Vendor"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Cost"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Mileage"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                </>
              }
              body={
                <>
                  {data.map((service, index) => (
                    <TableRow key={service.id}>
                      <TableCell
                        label={
                          <button
                            onClick={() =>
                              viewServiceDetailsHandler(service.id)
                            }
                            className="hover:text-indigo-700 font-semibold text-indigo-800"
                          >
                            <p>{service.id}</p>
                          </button>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={service.programName}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={service.schedule.dueAt}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <>
                            <StatusBadge
                              label={service.status}
                              statusType={STATUS_COLORS.success}
                            />
                          </>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={service.status}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={service.status}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <div className="flex items-center gap-2">
                            {/* {vehicle.operator !== undefined ? (
                              <>
                                <Avatar
                                  firstName={vehicle.operator.firstName}
                                  lastName={vehicle.operator.lastName}
                                  imageUrl={vehicle.operator.avatar}
                                  size={AVATAR_SIZES.sm}
                                />
                                <Lbl label={vehicle.operator.name} />
                              </>
                            ) : (
                              "Unassigned"
                            )} */}
                          </div>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                    </TableRow>
                  ))}
                </>
              }
            />
          }
        ></TableContainer>
      </TableContext.Provider>
      {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="3xl"
        >
          <ServiceDetails serviceId={selectedService} />
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </>
  );
};
