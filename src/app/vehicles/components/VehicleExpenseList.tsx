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
import { VehicleExpenses } from "@/models";
import {
  ArrowLeftRight,
  Download,
  Ellipsis,
  FilePenLine,
  Upload,
} from "lucide-react";

export const VehicleExpenseList: FC<{ data: VehicleExpenses[] }> = ({
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
              head={
                <>
                  <TableHeadCell
                    label={"# ID"}
                    mainCell={true}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Summary"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Created"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Type"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Vendor"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Amount"}
                    mainCell={false}
                    hideOnMobile={false}
                    centerCell
                  />
                  <TableHeadCell
                    label={"Status"}
                    mainCell={false}
                    hideOnMobile={false}
                    centerCell={true}
                  />
                  {/* <TableHeadCell
                    label={""}
                    mainCell={false}
                    hideOnMobile={false}
                    centerCell={true}
                  /> */}
                </>
              }
              body={
                <>
                  {data.map((expense, index) => (
                    <TableRow key={expense.id}>
                      <TableCell
                        label={
                          <button
                            onClick={() =>
                              viewServiceDetailsHandler(expense.id)
                            }
                            className="hover:text-indigo-700 font-semibold text-indigo-800"
                          >
                            <p>{expense.id}</p>
                          </button>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      {/* <TableCell
                        label={
                          <AvatarCell
                            firstName={expense.custodian.firstName}
                            lastName={expense.custodian.lastName}
                            imageUrl={expense.custodian.avatar}
                            size={AVATAR_SIZES.xs}
                            fullName={`${expense.custodian.firstName} ${expense.custodian.lastName}`}
                            row2={`${
                              expense.isCurrent ? "Current Custodian" : ""
                            }`}
                          />
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      /> */}
                      <TableCell
                        label={expense.summary}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={expense.dateReported}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={expense.type}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={expense.vendorId}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={expense.cost.spentAmount}
                        centerCell
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <StatusBadge
                            label={expense.status}
                            statusType={
                              expense.status === "paid"
                                ? STATUS_COLORS.success
                                : expense.status === "declined"
                                ? STATUS_COLORS.declined
                                : STATUS_COLORS.pending
                            }
                          />
                        }
                        centerCell
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      {/* <TableCell
                        centerCell
                        label={
                          expense.isCurrent ? (
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
                      /> */}
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
