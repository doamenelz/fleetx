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
  Button,
  BUTTON_SKIN,
  MenuDropdownProps,
  MenuDropdown,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import Link from "next/link";
import { Vendor } from "@/models/Vendors";
import { FileDocument } from "@/models/Document";
import { Download, Ellipsis, FilePenLine, Trash } from "lucide-react";

export const VendorDocumentsTable: FC<{ data: FileDocument[] }> = ({
  data,
}) => {
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
              height=""
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
                    label={"Date Uploaded"}
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
                  {data.map((doc, index) => (
                    <TableRow key={doc.id}>
                      <TableCell
                        label={
                          <Link
                            // href={{
                            //   pathname: `vendors/${vendor.id}`,
                            //   query: { id: vendor.id },
                            // }}
                            href={`vendors/${doc.id}`}
                            className="hover:text-indigo-700 font-semibold text-indigo-800"
                          >
                            <p>{doc.id}</p>
                          </Link>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={doc.name}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={doc.dateUploaded}
                        mainCell={false}
                        hideOnMobile={false}
                      />

                      <TableCell
                        label={
                          <MenuDropdown
                            items={[
                              {
                                id: "1",
                                label: "Download",
                                function: () => {},
                                icon: <FilePenLine className="w-3 h-3" />,
                              },
                              {
                                id: "2",
                                label: "Download",
                                function: () => {},
                                icon: <Trash className="w-3 h-3" />,
                              },
                            ]}
                            button={
                              <div className="p-2 rounded-sm border hover:border-slate-300 hover:bg-slate-50 hover:text-brand-persianBlue">
                                <Ellipsis className="w-4 h-4" />
                              </div>
                            }
                          />
                          // <Button label="Edit" skin={BUTTON_SKIN.secondary} />
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
