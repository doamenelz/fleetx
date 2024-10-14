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
  STATUS_COLORS,
  Lbl,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { Vehicle } from "@/models/Vehicle/Vehicle";
import Link from "next/link";

export const VehicleTableList: FC<{ data: Vehicle[] }> = ({ data }) => {
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
          //   sectionHeader={{
          //     header: "All Vehicles",
          //     copy: "Manage your Next of vehicle, Beneficiaries and Dependents",
          //   }}
          mainContent={
            <Table
              head={
                <>
                  <TableHeadCell
                    label={"Name"}
                    mainCell={true}
                    hideOnMobile={false}
                    isDark={true}
                  />
                  <TableHeadCell
                    label={"License #"}
                    mainCell={false}
                    hideOnMobile={false}
                    isDark={true}
                  />
                  <TableHeadCell
                    label={"Type"}
                    mainCell={false}
                    hideOnMobile={false}
                    isDark={true}
                  />
                  <TableHeadCell
                    label={"Status"}
                    mainCell={false}
                    hideOnMobile={false}
                    isDark={true}
                  />
                  <TableHeadCell
                    label={"Year"}
                    mainCell={false}
                    hideOnMobile={false}
                    isDark={true}
                  />
                  <TableHeadCell
                    label={"Make"}
                    mainCell={false}
                    hideOnMobile={false}
                    isDark={true}
                  />
                  <TableHeadCell
                    label={"Assigned to"}
                    mainCell={false}
                    hideOnMobile={false}
                    isDark={true}
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
                            href={`vehicles/${vehicle.id}`}
                            className="hover:text-indigo-700 font-semibold text-indigo-800"
                          >
                            <p>{vehicle.generalInfo.name}</p>
                          </Link>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vehicle.generalInfo.license}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vehicle.generalInfo.type}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <>
                            <StatusBadge
                              label={vehicle.status}
                              statusType={STATUS_COLORS.success}
                            />
                          </>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vehicle.specifications?.year}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vehicle.specifications?.make}
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
