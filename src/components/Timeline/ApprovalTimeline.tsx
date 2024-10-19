import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";
import { TimelineProps } from ".";
import { AVATAR_SIZES, AvatarCell } from "..";
export const AuditTimeline: FC<{ data: TimelineProps[] }> = ({ data }) => {
  // const ype = "paid";
  return (
    <ul>
      {data.map((item, index) => (
        <li
          key={item.id}
          className="relative flex gap-x-4"
        >
          <div
            className={classNames(
              "absolute left-0 top-0 flex w-6 justify-center ",
              item.id === data[data.length - 1].id ? "h-6" : "-bottom-6"
            )}
          >
            <div className="w-px bg-gray-200" />
          </div>
          {
            <>
              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                {item.action === "approved" || item.action === "submitted" ? (
                  <CheckCircleIcon
                    className="h-5 w-5 text-success-600"
                    aria-hidden="true"
                  />
                ) : item.action === "declined" ? (
                  <XCircleIcon
                    className="h-5 w-5 text-error-600"
                    aria-hidden="true"
                  />
                ) : (
                  <div
                    className={classNames(
                      "h-1.5 w-1.5 rounded-full bg-gray-100 ring-1",
                      item.stage === "current"
                        ? "ring-primary-600"
                        : "ring-gray-300"
                    )}
                  />
                )}
              </div>
              <div className="space-y-2 w-full pb-8">
                <div className="space-y-1 pb-2">
                  <>
                    <p className="text-xs font-semibold capitalize text-gray-600 mb-1">
                      {item.action}
                    </p>
                    <AvatarCell
                      firstName={item.author.bioData.firstName}
                      lastName={item.author.bioData.lastName}
                      fullName={item.author.bioData.fullName}
                      imageUrl={item.author.bioData.avatar}
                      size={AVATAR_SIZES.sm}
                      rowComponent={
                        item.date !== undefined ? (
                          <div className="flex items-center gap-1 text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-3 h-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                              />
                            </svg>

                            <time
                              dateTime={"activityItem.dateTime"}
                              className="flex-none py-0.5 leading-5 text-xs font-light "
                            >
                              {item.date}
                            </time>
                          </div>
                        ) : (
                          <p></p>
                        )
                      }
                      row3={item.author.jobInformation?.jobTitle}
                    />
                  </>
                </div>

                {item.comments && (
                  <div className="text-xs p-2 mt-2 ring-1 ring-gray-200 bg-gray-50 rounded-md">
                    <p className="text-gray-500">Comments</p>
                    <p className="text-sm text-gray-700 w-full">
                      {item.comments}
                    </p>
                  </div>
                )}
              </div>
            </>
          }
        </li>
      ))}
    </ul>
  );
};
