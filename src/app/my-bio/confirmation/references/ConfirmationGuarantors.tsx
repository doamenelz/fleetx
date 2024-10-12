import {
  TableContainer,
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  EmptyTable,
} from "@/components";
import { FC } from "react";
import { EmployeeDocument } from "../../../../modules/MyBio/models/EmployeeDocument";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
import { PlusIcon } from "@heroicons/react/20/solid";
import { DocumentTextIcon, FolderIcon } from "@heroicons/react/24/outline";
export const ConfirmationGuarantorsTable: FC<{
  data: EmployeeDocument[];
}> = ({ data }) => {
  return (
    <TableContainer
      mainContent={
        <Table
          head={
            <>
              <TableHeadCell
                label={"Title"}
                mainCell={true}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"Name"}
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"Address"} // Address, State, Country
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"Contact Information"} // Mobile and Email
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />

              <TableHeadCell
                label={"Relationship"} // Relationship + Relationship Duration + Type
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />
            </>
          }
          emptyState={
            <EmptyTable
              image={
                <>
                  <DocumentTextIcon
                    className="w-12 h-12 mx-auto text-gray-600"
                    strokeWidth={1.0}
                  />
                </>
              }
              title="No records available"
              copy=""
            />
          }
          body={data.map((document, index) => (
            <TableRow key={document.id}>
              <TableCell
                key={document.id}
                label={document.name}
                mainCell={true}
                hideOnMobile={false}
                button={{
                  url: "",
                  label: document.name,
                }}
              />

              <TableCell
                key={document.id}
                label={document.documentType}
                mainCell={false}
                hideOnMobile={false}
              />
              <TableCell
                key={document.id}
                label={formatDate(document.dateUploaded, DATE_OPTIONS.dMY)}
                mainCell={false}
                hideOnMobile={false}
              />
              <TableCell
                key={document.id}
                label={formatDate(document.dateApproved, DATE_OPTIONS.dMY)}
                mainCell={false}
                hideOnMobile={false}
              />
              <TableCell
                key={document.id}
                label={
                  <p
                    className={`${
                      document.expiryDate >= new Date()
                        ? "text-gray-500"
                        : "text-error-600 font-medium"
                    } `}
                  >
                    {formatDate(document.expiryDate, DATE_OPTIONS.dMY)}
                  </p>
                }
                mainCell={false}
                hideOnMobile={false}
              />
              <TableCell
                key={document.id}
                label={document.comments}
                mainCell={false}
                hideOnMobile={false}
              />
            </TableRow>
          ))}
        />
      }
    ></TableContainer>
  );
};
