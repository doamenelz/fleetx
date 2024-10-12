import {
  TableContainer,
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  AVATAR_SIZES,
  AvatarCell,
  EmptyTable,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
} from "@/components";
import { FC } from "react";
import { EmployeeDocument } from "../../../../modules/MyBio/models/EmployeeDocument";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
import { ArrowRightCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { FolderIcon } from "@heroicons/react/24/outline";
import { ConfirmationPendingAction } from "@/modules/MyBio/models/ConfirmationPendingAction";
import { TableContext } from "@/components/Table/TableContext";
export const ConfirmationPendingActionsTable: FC<{
  data: ConfirmationPendingAction[];
}> = ({ data }) => {
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
                  label={"Employee"}
                  mainCell={false}
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
                  label={"Department"}
                  mainCell={false}
                  hideOnMobile={false}
                  isDark={false}
                />
                <TableHeadCell
                  label={"Location"}
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
                <TableHeadCell
                  label={""}
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
                title="You have no Pending Actions"
                copy=""
              />
            }
            body={data.map((document, index) => (
              <TableRow key={document.id}>
                <TableCell
                  label={
                    <AvatarCell
                      firstName={document.employee.bioData.firstName}
                      lastName={document.employee.bioData.lastName}
                      fullName={document.employee.bioData.fullName}
                      row2={document.employee.jobInformation?.jobTitle}
                      imageUrl={document.employee.bioData.avatar}
                      size={AVATAR_SIZES.sm}
                    />
                    // <div>
                    //   <p>{document.employee.bioData.fullName}</p>
                    //   <p className="text-gray-500 text-xs">
                    //     {document.employee.jobInformation?.jobTitle}
                    //   </p>
                    // </div>
                  }
                  mainCell={true}
                  hideOnMobile={false}
                />

                <TableCell
                  label={document.employee.jobInformation?.grade}
                  mainCell={false}
                  hideOnMobile={false}
                />

                <TableCell
                  label={document.employee.jobInformation?.teamName}
                  mainCell={false}
                  hideOnMobile={false}
                />
                <TableCell
                  label={document.employee.jobInformation?.location}
                  mainCell={false}
                  hideOnMobile={false}
                />
                <TableCell
                  label={document.proposedDate}
                  mainCell={false}
                  hideOnMobile={false}
                />
                <TableCell
                  label={
                    <Button
                      label="Appraise"
                      skin={BUTTON_SKIN.linkColor}
                      icon={{
                        position: ICON_POSITION.trailing,
                        asset: <ArrowRightCircleIcon className="w-3 h-3" />,
                      }}
                    />
                  }
                  mainCell={false}
                  hideOnMobile={false}
                />
              </TableRow>
            ))}
          />
        }
      ></TableContainer>
    </TableContext.Provider>
  );
};
