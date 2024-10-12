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
import { FolderIcon } from "@heroicons/react/24/outline";
export const ConfirmationScorecardSettingsTable: FC<{
  data: EmployeeDocument[];
}> = ({ data }) => {
  return (
    <TableContainer
      mainContent={
        <Table
          head={
            <>
              <TableHeadCell
                label={"Employee"}
                mainCell={true}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"Grade"}
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"Designation"}
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"Start Date"}
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"End Date"}
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"Status"}
                mainCell={false}
                hideOnMobile={false}
                isDark={false}
              />
              <TableHeadCell
                label={"Proposed Date"}
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
                  <FolderIcon
                    className="w-12 h-12 mx-auto text-gray-600"
                    strokeWidth={1.0}
                  />
                </>
              }
              title="You have no pending tasks"
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
