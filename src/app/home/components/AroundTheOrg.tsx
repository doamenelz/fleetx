"use client";
import { FC, useState, useEffect } from "react";
import { Employee, generateEmployeeList } from "@/models";
import { classNames, simulateLoader } from "@/lib/utilities/helperFunctions";
import {
  AVATAR_SIZES,
  Avatar,
  AvatarCell,
  BodyCopy,
  EmployeeCellLoader,
  EmptyStateText,
  Lbl,
  ModalBackdrop,
  PlainCard,
  SectionHeader,
  SlideOutWrapper,
} from "@/components";
import Link from "next/link";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import ReactDOM from "react-dom";

export const employees = generateEmployeeList(7);
export const podiumEmployees = generateEmployeeList(5);
export const newHiresEmployees = generateEmployeeList(15);
export const anniversariesEmployees = generateEmployeeList(25);

enum ATO_TYPE {
  birthday,
  hires,
  anniversaries,
}

export const ATOList = () => {
  useEffect(() => {}, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    simulateLoader(setIsLoading, 2000);
  }, []);
  return (
    <PlainCard>
      {isLoading ? (
        <EmployeeCellLoader />
      ) : (
        <div className="space-y-8">
          <BodyCopy text="Celebrations, and Events happening around the organization" />
          <ATOStack
            type={ATO_TYPE.anniversaries}
            list={anniversariesEmployees}
          />
          <ATOStack
            type={ATO_TYPE.birthday}
            list={employees}
          />
          <ATOStack
            type={ATO_TYPE.hires}
            list={newHiresEmployees}
          />
        </div>
      )}
    </PlainCard>
  );
};

export const EmptyState: FC<{ icon: JSX.Element; copy: string }> = (props) => {
  return (
    <div className="items-center block w-full p-12 my-8 space-y-4 text-center py-auto">
      {props.icon}
      <div className="text-sm font-medium text-gray-700">{props.copy}</div>
    </div>
  );
};

const ATOStack: FC<{ type: ATO_TYPE; list: Employee[] }> = ({ list, type }) => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="space-y-2">
        <Lbl
          label={
            type == ATO_TYPE.anniversaries
              ? "Anniversaries"
              : type == ATO_TYPE.birthday
              ? "Birthdays"
              : "Hires"
          }
        />
        {list.length > 0 ? (
          <>
            <div className="hidden md:flex ">
              {list
                .slice(0, list.length >= 9 ? 9 : 8)
                .map((employee, index) => (
                  <div
                    className="-space-x-1 text-center group relative hover:border-slate-900  border-2 rounded-full"
                    key={index}
                  >
                    <div className="absolute z-50 hidden p-2 ml-6 -mt-10 text-nowrap font-medium bg-gray-950 border border-gray-400 rounded-sm cursor-text text-gray-25 group-hover:block mx-auto">
                      <div>
                        <p className="text-xs text-slate-100 font-semibold w-full">
                          {employee.bioData.firstName}{" "}
                          {employee.bioData.lastName}
                        </p>
                        {type == ATO_TYPE.anniversaries ? (
                          <p className="text-xs text-slate-300">
                            {"3 years - 30 June"}
                          </p>
                        ) : type == ATO_TYPE.birthday ? (
                          <p className="text-xs text-slate-300">{`${formatDate(
                            new Date(employee.bioData.dateOfBirth!),
                            DATE_OPTIONS.dM
                          )}`}</p>
                        ) : (
                          <p className="text-xs text-slate-300">
                            {"Resumes June 12"}
                          </p>
                        )}
                      </div>
                    </div>
                    <Avatar
                      center
                      firstName={employee.bioData.firstName}
                      lastName={employee.bioData.lastName}
                      imageUrl={employee.bioData.avatar}
                      size={AVATAR_SIZES.sm}
                    />
                  </div>
                ))}
              {list.length > 9 && (
                <button
                  onClick={() => setShowModal(true)}
                  className="mx-auto space-y-3 text-center group -ml-2"
                >
                  <div className="w-8 h-8 text-xs items-center p-2 text-gray-900 bg-gray-200 rounded-full group-hover:text-primary-900 group-hover:bg-primary-50">
                    +{list.length - 9}
                  </div>
                </button>
              )}
            </div>

            {/* Mobile Stack */}
            <div className="flex items-center mt-6 space-x-2 md:hidden">
              <div className="flex flex-shrink-0 -space-x-1">
                {list.slice(0, 7).map((employee, index) => (
                  <Avatar
                    key={index}
                    firstName={employee.bioData.firstName}
                    lastName={employee.bioData.lastName}
                    imageUrl={employee.bioData.avatar}
                    size={AVATAR_SIZES.md}
                  />
                ))}
              </div>
              {list.length > 7 && (
                <span className="flex-shrink-0 text-xs leading-5">
                  +({list.length - 7})
                </span>
              )}
            </div>
          </>
        ) : (
          <EmptyStateText title="No scheduled Time Off" />
        )}
      </div>

      {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="lg"
        >
          <div className="p-4 space-y-4">
            <SectionHeader
              title={
                type == ATO_TYPE.anniversaries
                  ? "Anniversaries"
                  : type == ATO_TYPE.birthday
                  ? "Birthdays"
                  : "Hires"
              }
            />

            <ul className="space-y-4">
              {list.map((employee) => (
                <li key={employee.id}>
                  <AvatarCell
                    firstName={employee.bioData.firstName}
                    lastName={employee.bioData.lastName}
                    fullName={employee.bioData.fullName}
                    imageUrl={employee.bioData.avatar}
                    rowComponent={
                      type == ATO_TYPE.anniversaries ? (
                        <p className="text-xs text-slate-600">
                          {"3 years - 30 June"}
                        </p>
                      ) : type == ATO_TYPE.birthday ? (
                        <p className="text-xs text-slate-600">{`${formatDate(
                          new Date(employee.bioData.dateOfBirth!),
                          DATE_OPTIONS.dM
                        )}`}</p>
                      ) : (
                        <p className="text-xs text-slate-600">
                          {"Resumes June 12"}
                        </p>
                      )
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
