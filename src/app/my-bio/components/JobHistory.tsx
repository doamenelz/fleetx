import {
  TableContainer,
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  AVATAR_SIZES,
  AvatarCell,
} from "@/components";
import { FC } from "react";
import { JobHistoryEvent } from "../../../modules/MyBio/models/JobHistory";
import { TableContext } from "@/components/Table/TableContext";

export const JobHistoryTable: FC<{ data: JobHistoryEvent[] }> = ({ data }) => {
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
                  label={"Activity"}
                  mainCell={true}
                  hideOnMobile={false}
                  isDark={false}
                />
                <TableHeadCell
                  label={"Role"}
                  mainCell={true}
                  hideOnMobile={false}
                  isDark={false}
                />
                <TableHeadCell
                  label={"Line Manager"}
                  mainCell={false}
                  hideOnMobile={false}
                  isDark={false}
                />
                <TableHeadCell
                  label={"Notes"}
                  mainCell={false}
                  hideOnMobile={false}
                  isDark={false}
                />
              </>
            }
            body={
              <>
                {data.map((job, index) => (
                  <TableRow key={job.id}>
                    <TableCell
                      label={
                        <>
                          <div className="hidden lg:flex">
                            <p className="text-slate-800 font-medium">
                              {job.date}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500 lg:hidden">
                              {job.date}
                            </p>
                            <p className="text-primary-800 lg:text-slate-700">
                              {job.activity}
                            </p>
                          </div>
                        </>
                      }
                      mainCell={true}
                      hideOnMobile={false}
                    />

                    <TableCell
                      label={job.role}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
                      label={
                        <AvatarCell
                          imageUrl={job.lineManager.bioData.avatar}
                          firstName={job.lineManager.bioData.firstName}
                          lastName={job.lineManager.bioData.lastName}
                          size={AVATAR_SIZES.sm}
                          fullName={`${job.lineManager.bioData.firstName} ${job.lineManager.bioData.lastName}`}
                          row2={job.lineManager.jobInformation?.jobTitle}
                        />
                      }
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableCell
                      label={
                        <>
                          {job.attachment !== "" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>
                          )}
                        </>
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
  );
};
