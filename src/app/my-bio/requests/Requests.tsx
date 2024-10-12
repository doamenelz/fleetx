import {
  TableContainer,
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  SlideOutWrapper,
  ModalBackdrop,
  Timeline,
  timelineActivities,
  Accordion,
  TextLabel,
  StatusBadge,
  STATUS_COLORS,
  SectionHeader,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
} from "@/components";
import { FC } from "react";
import { EmployeeDocument } from "../../../modules/MyBio/models/EmployeeDocument";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
import { useState, useRef, useEffect } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { ICON_SIZES, Icon } from "@/components/Icons";
import { TableContext } from "@/components/Table/TableContext";
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";

export const RequestsTable: FC<{ data: EmployeeDocument[] }> = ({ data }) => {
  const [openControl, setOpenControl] = useState(false);

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  const [selectedRequest, setSelectedRequest] = useState<EmployeeDocument>();

  const onClickHandler = (selected: EmployeeDocument) => {
    setSelectedRequest(selected);
    setOpenControl(true);
  };
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
                    label={"Name"}
                    mainCell={false}
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
                    label={"Date Requested"}
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
                    label={""}
                    mainCell={false}
                    hideOnMobile={false}
                    isDark={false}
                  />
                </>
              }
              body={
                <>
                  {data.map((document, index) => (
                    <TableRow key={index}>
                      <TableCell
                        label={document.name}
                        mainCell={true}
                        hideOnMobile={false}
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
                        label={
                          <p
                            className={classNames("font-medium text-gray-500")}
                          >
                            <span className="inline-flex items-center rounded-md bg-warning-50 px-2 py-1 text-xs font-medium text-warning-600 ring-1 ring-inset ring-warning-600/20">
                              {document.status}
                            </span>
                          </p>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <Button
                            onClick={() => onClickHandler(document)}
                            label="View"
                            skin={BUTTON_SKIN.linkColor}
                            icon={{
                              position: ICON_POSITION.trailing,
                              asset: (
                                <ArrowRightCircleIcon className="w-3 h-3" />
                              ),
                            }}
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

      <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={setOpenControl}
          openControl={openControl}
          size="lg"
        >
          <div className="p-4">
            <div>
              <SectionHeader
                title="Request Details"
                copy={selectedRequest?.id}
                button={
                  <button
                    onClick={() => setOpenControl(false)}
                    className="rounded-full hover:bg-gray-900 hover:text-gray-100 p-2 bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                }
              />
            </div>
            <div className="space-y-4 p-4 rounded-md border my-4">
              <TextLabel label="Name" copy={selectedRequest?.name} />
              <TextLabel label="Type" copy={selectedRequest?.documentType} />
              <TextLabel
                label="Date Requested"
                copy={formatDate(new Date(), DATE_OPTIONS.dMY)}
              />
            </div>

            <Accordion
              style="section"
              title="Approvals"
              defaultOpen={true}
              body={
                <div className="p-4">
                  <Timeline data={timelineActivities} />
                </div>
              }
              id="timeline"
            />
          </div>
        </SlideOutWrapper>
      </ModalBackdrop>
    </>
  );
};
