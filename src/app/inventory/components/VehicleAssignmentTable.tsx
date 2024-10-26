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
  IconDropdown,
  MenuDropdownItemProp,
  AvatarCell,
  AVATAR_SIZES,
  Button,
  BUTTON_SKIN,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { ServiceDetails } from "@/app/service/components/ServiceDetails";
import { VehicleAssignment } from "@/models";
import {
  ArrowLeftRight,
  Download,
  Ellipsis,
  FilePenLine,
  Upload,
} from "lucide-react";

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

  const ellipsisItems: MenuDropdownItemProp[] = [
    {
      id: "1",
      label: "Edit",
      function: () => {},
      icon: <FilePenLine className="w-3 h-3" />,
    },
    {
      id: "2",
      label: "Transfer Custody",
      function: () => {},
      icon: <ArrowLeftRight className="w-3 h-3" />,
    },
  ];
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
                    label={"Operator"}
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
                    centerCell
                  />
                  <TableHeadCell
                    label={""}
                    mainCell={false}
                    hideOnMobile={false}
                    centerCell={true}
                  />
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
                        label={
                          <AvatarCell
                            firstName={assignment.custodian.firstName}
                            lastName={assignment.custodian.lastName}
                            imageUrl={assignment.custodian.avatar}
                            size={AVATAR_SIZES.xs}
                            fullName={`${assignment.custodian.firstName} ${assignment.custodian.lastName}`}
                            row2={`${
                              assignment.isCurrent ? "Current Custodian" : ""
                            }`}
                          />
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={assignment.odometerStart}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={assignment.odometerEnd}
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
                        centerCell
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        centerCell
                        label={
                          assignment.isCurrent ? (
                            <IconDropdown
                              items={ellipsisItems}
                              button={
                                <div className="p-2 rounded-sm border hover:border-slate-300 hover:bg-slate-50 hover:text-brand-persianBlue">
                                  <Ellipsis className="w-4 h-4" />
                                </div>
                              }
                            />
                          ) : (
                            <Button
                              label="Edit"
                              skin={BUTTON_SKIN.secondary}
                            ></Button>
                          )
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
