import {
  TableContainer,
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  AVATAR_SIZES,
  AvatarCell,
  StatusBadge,
  STATUS_COLORS,
} from "@/components";
import { FC } from "react";
import { EmployeeDocument } from "../../../modules/MyBio/models/EmployeeDocument";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
import { TableContext } from "@/components/Table/TableContext";
export const MyDocumentsTable: FC<{ data: EmployeeDocument[] }> = ({
  data,
}) => {
  return (
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
                  label={"Name"}
                  mainCell={true}
                  hideOnMobile={false}
                  isDark={false}
                />
                <TableHeadCell
                  label={"Type"}
                  mainCell={false}
                  hideOnMobile={false}
                  isDark={false}
                />
                <TableHeadCell
                  label={"Date Uploaded"}
                  mainCell={false}
                  hideOnMobile={false}
                  isDark={false}
                />
                <TableHeadCell
                  label={"Date Approved"}
                  mainCell={false}
                  hideOnMobile={false}
                  isDark={false}
                />
                <TableHeadCell
                  label={"Expiry"}
                  mainCell={false}
                  hideOnMobile={false}
                  isDark={false}
                />
              </>
            }
            body={
              <>
                {data.map((document, index) => (
                  <TableRow key={document.id}>
                    <TableCell
                      label={document.name}
                      mainCell={true}
                      hideOnMobile={false}
                      button={{
                        url: "",
                        label: document.name,
                      }}
                    />

                    <TableCell
                      label={
                        <StatusBadge
                          label={document.documentType}
                          statusType={STATUS_COLORS.regular}
                        />
                      }
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
                      label={formatDate(
                        document.dateUploaded,
                        DATE_OPTIONS.dMY
                      )}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
                      label={formatDate(
                        document.dateApproved,
                        DATE_OPTIONS.dMY
                      )}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
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
                    {/* <TableCell
                      label={document.comments}
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
  );
};
