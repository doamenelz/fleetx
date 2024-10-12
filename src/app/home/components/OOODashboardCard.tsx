"use client";
import {
  AVATAR_SIZES,
  Avatar,
  EmployeeCellLoader,
  AvatarCell,
  EmptyStateText,
  Lbl,
  AnalyticsCard,
  CARD_SPAN,
  SlideOutWrapper,
  SectionHeader,
} from "@/components";
import {
  formatDate,
  checkIfDateInRange,
  DATE_OPTIONS,
} from "@/lib/utilities/dateHelpers";
import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { simulateLoader } from "@/lib/utilities/helperFunctions";
import {
  TimeOffDetails,
  sampleCalendarEmployee,
  sampleTimeOffDetailsArray,
} from "@/app/time-off/models/TimeOff";
import { useMounted } from "@/lib/hooks/useMounted";
export const DashboardOutOfOfficeList = () => {
  const [list, setList] = useState<TimeOffDetails[]>(sampleCalendarEmployee);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    simulateLoader(setIsLoading, 2000);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };

  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <>
      <AnalyticsCard
        title="Time Off and Absences Overview"
        copy="Workforce"
        span={CARD_SPAN.full}
      >
        {isLoading ? (
          <>
            <EmployeeCellLoader />
          </>
        ) : (
          <div className="grid grid-cols-3 xl:gap-3 gap-0 space-y-4 xl:space-y-0 xl:divide-x-2 divide-y-1 xl:divide-y-0">
            {list.length > 0 ? (
              <div className="col-span-full xl:col-span-1">
                <div className="hidden mt-6 md:flex ">
                  {list
                    .slice(0, list.length >= 8 ? 6 : 8)
                    .map((employee, index) => (
                      <div
                        className="-space-x-1 text-center group relative hover:border-slate-900  border-2 rounded-full"
                        key={index}
                      >
                        <div className="absolute z-50 hidden p-2 ml-6 -mt-10 text-nowrap font-medium bg-gray-950 border border-gray-400 rounded-sm cursor-text text-gray-25 group-hover:block mx-auto">
                          <div>
                            <p className="text-xs text-slate-100 font-semibold w-full">
                              {employee.employee.bioData.firstName}{" "}
                              {employee.employee.bioData.lastName}
                            </p>
                            <p className="text-xs text-slate-300">{`${formatDate(
                              new Date(employee.startDate),
                              DATE_OPTIONS.dM
                            )} - ${formatDate(
                              new Date(employee.endDate),
                              DATE_OPTIONS.dM
                            )}`}</p>
                          </div>
                        </div>
                        <Avatar
                          center
                          firstName={employee.employee.bioData.firstName}
                          lastName={employee.employee.bioData.lastName}
                          imageUrl={employee.employee.bioData.avatar}
                          size={AVATAR_SIZES.lg}
                        />
                      </div>
                    ))}
                  <button
                    onClick={() => setShowModal(true)}
                    className="mx-auto space-y-3 text-center group -ml-2"
                  >
                    <div className="w-12 h-12 font-medium p-3 text-gray-900 bg-gray-200 rounded-full group-hover:text-primary-900 group-hover:bg-primary-50">
                      +{list.length - 6}
                    </div>
                  </button>
                </div>

                {/* Mobile Stack */}
                <div className="flex items-center mt-6 space-x-2 md:hidden">
                  <div className="flex flex-shrink-0 -space-x-1">
                    {list.slice(0, 7).map((employee, index) => (
                      <Avatar
                        key={index}
                        firstName={employee.employee.bioData.firstName}
                        lastName={employee.employee.bioData.lastName}
                        imageUrl={employee.employee.bioData.avatar}
                        size={AVATAR_SIZES.md}
                      />
                    ))}
                  </div>
                  {list.length > 7 && (
                    <span className="flex-shrink-0 text-xs font-medium leading-5">
                      +({list.length - 7})
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <EmptyStateText title="No scheduled Time Off" />
            )}
            <div className="space-y-1 xl:px-4 py-4 xl:py-0 xl:col-span-1 col-span-full">
              <Lbl label="Leave Utilization" />
              <p className="text-2xl font-semibold">25.6%</p>
              <p className="text-sm text-slate-600">
                5,780 days used | 15,560 days remaining
              </p>
            </div>
            <div className="space-y-1 xl:px-4 py-4 xl:py-0 xl:col-span-1 col-span-full">
              <Lbl label="Peak Month" />
              <p className="text-2xl font-semibold">August</p>
              <p className="text-sm text-slate-600">
                1,200 leave days scheduled | 210 Employees
              </p>
            </div>
          </div>
        )}
      </AnalyticsCard>
      {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="lg"
        >
          <div className="p-4 space-y-4">
            <SectionHeader title="Out Today" />

            <ul className="space-y-4">
              {list.map((employee) => (
                <li key={employee.id}>
                  <AvatarCell
                    firstName={employee.employee.bioData.firstName}
                    lastName={employee.employee.bioData.lastName}
                    fullName={employee.employee.bioData.fullName}
                    imageUrl={employee.employee.bioData.avatar}
                    rowComponent={
                      <p className="text-xs text-slate-600">
                        {"Resumes June 12"}
                      </p>
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </SlideOutWrapper>,
        document.getElementById("modal")!
      )}
    </>
  );
};
