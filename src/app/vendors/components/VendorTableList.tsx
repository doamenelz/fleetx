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
import Link from "next/link";
import { Vendor } from "@/models/Vendors";

export const VendorTableList: FC<{ data: Vendor[] }> = ({ data }) => {
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
                    label={"ID #"}
                    mainCell={true}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Name"}
                    mainCell={true}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Primary Contact"}
                    mainCell={false}
                    hideOnMobile={false}
                  />

                  <TableHeadCell
                    label={"Address"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Classes"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Status"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                </>
              }
              body={
                <>
                  {data.map((vendor, index) => (
                    <TableRow key={vendor.id}>
                      <TableCell
                        label={
                          <Link
                            // href={{
                            //   pathname: `vendors/${vendor.id}`,
                            //   query: { id: vendor.id },
                            // }}
                            href={`vendors/${vendor.id}`}
                            className="hover:text-indigo-700 font-semibold text-indigo-800"
                          >
                            <p>{vendor.id}</p>
                          </Link>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={vendor.name}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <div className="text-xs space-y-1">
                            <p className="font-medium text-slate-800">
                              {vendor.contacts[0].name}
                            </p>
                            <p className="text-slate-500">
                              {vendor.contacts[0].phoneNumber}
                            </p>
                            <p className="text-slate-500">
                              {vendor.contacts[0].email}
                            </p>
                          </div>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />

                      <TableCell
                        label={
                          <div className="space-y-1">
                            <p>
                              {vendor.address.lineOne},{" "}
                              <span>{vendor.address.lineTwo}</span>
                            </p>
                            <p className="text-slate-500 flex gap-1">
                              {vendor.address.city},
                              <span>{vendor.address.postalCode}</span>
                            </p>
                            <p className="gap-1 flex text-slate-500">
                              <span>{vendor.address.state},</span>
                              {vendor.address.country}
                            </p>
                          </div>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <div className="">
                            {vendor.serviceClasses.map(
                              (serviceClass, index) => (
                                <p
                                  className="capitalize"
                                  key={index}
                                >
                                  • {serviceClass}
                                </p>
                              )
                            )}
                          </div>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <StatusBadge
                            style="text"
                            label={vendor.status}
                            statusType={STATUS_COLORS.success}
                          />
                        }
                        mainCell={true}
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
