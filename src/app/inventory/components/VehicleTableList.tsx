import { FC } from "react";
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
  Lbl,
  SearchField,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
  MenuDropdown,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { Vehicle } from "@/models/Vehicle/Vehicle";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Ellipsis,
  PlusIcon,
  Upload,
} from "lucide-react";
import { MenuDropdownItemProp } from "@/components/Dropdown/MenuDropdown";

export const VehicleTableList: FC<{ data: Vehicle[] }> = ({ data }) => {
  const vehicleControlItems: MenuDropdownItemProp[] = [
    {
      id: "1",
      label: "Import from CSV",
      function: () => {},
      icon: <Upload className="w-3 h-3" />,
    },
    {
      id: "2",
      label: "Download to CSV",
      function: () => {},
      icon: <Download className="w-3 h-3" />,
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
          sectionHeader={{
            header: "All Vehicles",
            copy: "Manage your Next of vehicle, Beneficiaries and Dependents",
            button: (
              <div className="flex gap-2 items-center">
                <SearchField
                  placeholder="Search"
                  setQuery={() => {}}
                />
                <Lbl label={`5 of ${data.length} results`} />
                <div className="border-r pr-2">
                  <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="items-center flex gap-2">
                  <MenuDropdown
                    items={vehicleControlItems}
                    button={
                      <div className="p-2 rounded-sm border hover:bg-slate-50 hover:text-brand-blueRoyal">
                        <Ellipsis className="w-4 h-4" />
                      </div>
                    }
                  />
                  <Button
                    onClick={() => {}}
                    componentType="link"
                    link="/inventory/new"
                    label="New Vehicle"
                    skin={BUTTON_SKIN.primary}
                    icon={{
                      position: ICON_POSITION.trailing,
                      asset: <PlusIcon className="w-3 h-3" />,
                    }}
                  />
                </div>
              </div>
            ),
          }}
          mainContent={
            <Table
              head={
                <>
                  <TableHeadCell
                    label={"Name"}
                    mainCell={true}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"License #"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Type"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Status"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Year"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Make"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Assigned to"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                </>
              }
              body={
                <>
                  {data.map((vehicle, index) => (
                    <TableRow key={vehicle.id}>
                      <TableCell
                        label={
                          <Link
                            // href={{
                            //   pathname: `vehicles/${vehicle.id}`,
                            //   query: { id: vehicle.id },
                            // }}
                            href={`inventory/${vehicle.id}`}
                            className="hover:text-indigo-700 font-semibold text-indigo-800"
                          >
                            <p>{vehicle.name}</p>
                          </Link>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vehicle.licenseNumber}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vehicle.type}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <>
                            <StatusBadge label={vehicle.status} />
                          </>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vehicle.year}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vehicle?.manufacturer}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <div className="flex items-center gap-2">
                            {vehicle.operator !== undefined ? (
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
                            )}
                          </div>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      {/* <TableCell
                        label={
                          <Button
                            onClick={() => {}}
                            label="Edit"
                            skin={BUTTON_SKIN.secondary}
                            icon={{
                              position: ICON_POSITION.trailing,
                              asset: <PencilIcon className="w-3 h-3" />,
                            }}
                          />
                        }
                        mainCell={true}
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

      {/* <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={setOpenControl}
          openControl={openControl}
          size="3xl"
          showDismissButton
        >
          <>
          </>
        </SlideOutWrapper>
      </ModalBackdrop> */}
    </>
  );
};
