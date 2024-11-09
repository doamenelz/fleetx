"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
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
  AvatarCell,
  MenuDropdownItemProp,
  IconDropdown,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { Person } from "@/models/Person";
import {
  Ellipsis,
  UserCog,
  UserPen,
  UserRound,
  UserRoundMinus,
} from "lucide-react";

export const UsersList: FC<{ data: Person[] }> = ({ data }) => {
  const router = useRouter();
  //   const ellipsisItems: MenuDropdownItemProp[] = [
  //     {
  //       id: "1",
  //       label: "View User",
  //       function: () => {
  //         (id: string) => router.push(`users/${id}`);
  //       },
  //       icon: <UserRound className="w-3 h-3" />,
  //       type: "link",
  //       href:
  //     },
  //     {
  //       id: "2",
  //       label: "Disable User",
  //       function: () => {},
  //       icon: <UserRoundMinus className="w-3 h-3" />,
  //     },
  //     {
  //       id: "2",
  //       label: "Reset User Password",
  //       function: () => {},
  //       icon: <UserCog className="w-3 h-3" />,
  //     },
  //   ];

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
          //     header: "All vendors",
          //     copy: "Manage your Next of vendor, Beneficiaries and Dependents",
          //   }}
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
                    label={"Email"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Roles"}
                    mainCell={true}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Last Login"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Status"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={""}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                </>
              }
              body={
                <>
                  {data.map((person, index) => (
                    <TableRow key={person.id}>
                      <TableCell
                        label={
                          <div>
                            <AvatarCell
                              firstName={person.firstName}
                              lastName={person.lastName}
                              fullName={person.name}
                              //   highlightName={true}
                              row2={`ID:${person.id}`}
                              imageUrl={person.avatar}
                              size={AVATAR_SIZES.sm}
                            />
                          </div>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={person.email}
                        mainCell={false}
                        hideOnMobile={false}
                      />

                      <TableCell
                        label={person.role}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={person.lastLogin}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <StatusBadge
                            // style="text"
                            label={person.status ?? ""}
                            statusType={
                              person.status === "Active"
                                ? STATUS_COLORS.success
                                : person.status === "Deactivated"
                                ? STATUS_COLORS.declined
                                : STATUS_COLORS.pending
                            }
                          />
                        }
                        mainCell={true}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <IconDropdown
                            items={[
                              {
                                id: "1",
                                label: "View User",
                                function: () => {
                                  router.push(`users/${person.id}`);
                                },
                                icon: <UserRound className="w-3 h-3" />,
                                // type: "link",
                                href: `users/${person.id}`,
                              },
                              {
                                id: "2",
                                label: "Disable User",
                                function: () => {},
                                icon: <UserRoundMinus className="w-3 h-3" />,
                              },
                              {
                                id: "2",
                                label: "Reset User Password",
                                function: () => {},
                                icon: <UserCog className="w-3 h-3" />,
                              },
                            ]}
                            button={
                              <div className="p-2 rounded-sm border hover:border-slate-300 hover:bg-slate-50 hover:text-brand-persianBlue">
                                <Ellipsis className="w-4 h-4" />
                              </div>
                            }
                          />
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
