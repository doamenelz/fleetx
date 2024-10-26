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
  Lbl,
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
import { Audit } from "@/models/Audit";

export const VehicleAuditTable: FC<{ data: Audit[] }> = ({ data }) => {
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
                    label={"Details"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Old Value"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"New Value"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Date"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"User"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                </>
              }
              body={
                <>
                  {data.map((audit, index) => (
                    <TableRow key={audit.id}>
                      <TableCell
                        label={
                          <button
                            onClick={() => viewServiceDetailsHandler(audit.id)}
                            className="hover:text-indigo-700 font-semibold text-indigo-800"
                          >
                            <p>{audit.id}</p>
                          </button>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />

                      <TableCell
                        label={audit.message}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={audit.oldValue}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={audit.newValue}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={audit.createdAt}
                        mainCell={false}
                        hideOnMobile={false}
                      />

                      <TableCell
                        label={
                          <div>
                            <AvatarCell
                              lastName={audit.user?.lastName ?? ""}
                              firstName={audit.user?.firstName ?? ""}
                              fullName={audit.user?.name ?? ""}
                              imageUrl={audit.user?.avatar ?? ""}
                              size={AVATAR_SIZES.xs}
                              // row2={audit.user?.role ?? ""}
                            />
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
