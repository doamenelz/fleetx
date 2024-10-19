import { FC, useState } from "react";
import ReactDOM from "react-dom";
import {
  TableContainer,
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  StatusBadge,
  STATUS_COLORS,
  SlideOutWrapper,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { ServiceDetails } from "@/app/service/components/ServiceDetails";
import { VehicleAssignment } from "@/models";

export const VehicleAssignmentTable: FC<{ data: VehicleAssignment[] }> = ({
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
                    label={"Custodian"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Start Mileage"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"End Mileage"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Start Date"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"End Date"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  {/* <TableHeadCell
                    label={"Mileage"}
                    mainCell={false}
                    hideOnMobile={false}
                  /> */}
                </>
              }
              body={
                <>
                  {data.map((assignment, index) => (
                    <TableRow key={assignment.id}>
                      <TableCell
                        label={
                          <button
                            onClick={() =>
                              viewServiceDetailsHandler(assignment.id)
                            }
                            className="hover:text-indigo-700 font-semibold text-indigo-800"
                          >
                            <p>{assignment.id}</p>
                          </button>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={assignment.custodian.email}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={assignment.odometerStart}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <>
                            <StatusBadge
                              label={assignment.odometerEnd}
                              statusType={STATUS_COLORS.success}
                            />
                          </>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={assignment.startDate}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={assignment.endDate}
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
