import { FC, Fragment, useState } from "react";
import { Transition, Dialog, Disclosure } from "@headlessui/react";

import { classNames } from "@/lib/utilities/helperFunctions";
import { NavigationIcon, Logout, ICON_SIZES } from "../Icons";
import { PrimaryNavigation } from ".";
import { AvatarCell } from "../Avatar";
import { sampleEmployee } from "../../models";
import { FlexLogoFullLight } from "../../assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const MobileNav: FC<{}> = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const getPathName = () => {
    const name = PrimaryNavigation.find((item) => location.includes(item.link));

    return name?.label;
  };

  const location = usePathname();
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between p-4 lg:hidden bg-gradient-to-r from-gray-800 to-gray-900">
      <p className="text-sm font-medium text-gray-25">{getPathName()}</p>
      <button className=" text-gray-25" onClick={() => setOpenMobile(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
          />
        </svg>
      </button>

      <Transition.Root show={openMobile} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenMobile}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-modal" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen h-screen max-w-sm overflow-y-scroll pointer-events-auto bg-gray-950">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="flex flex-col h-screen overflow-y-scroll text-gray-700 bg-gray-900 shadow-xl">
                        <div className="flex items-center justify-between px-4 py-2">
                          <FlexLogoFullLight />
                          <button
                            onClick={() => setOpenMobile(false)}
                            className="p-2 bg-gray-500 rounded-full text-gray-25 bg-opacity-20 backdrop-blur backdrop-filter "
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
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex-1">
                            <ul className="py-2 pl-2 mb-4 ml-4 space-y-1 text-sm text-gray-200 bg-gray-600 border-gray-600 bg-opacity-20">
                              {PrimaryNavigation.map((item) => (
                                <li key={item.id}>
                                  {!item.children ? (
                                    <Link
                                      onClick={() => setOpenMobile(false)}
                                      key={item.label}
                                      href={item.link!}
                                      // className={({ isActive }) => {
                                      //   return isActive
                                      //     ? "text-gray-25 font-semibold shadow-sm border-gray-400 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 pl-2 group flex items-center py-3 border-l-4 rounded-tl-sm rounded-bl-sm bg-opacity-20 backdrop-blur backdrop-filter"
                                      //     : "group flex items-center px-2 py-3 hover:bg-gray-300 hover:text-primary-900 text-gray-300";
                                      // }}
                                    >
                                      {item.label}
                                    </Link>
                                  ) : (
                                    <Disclosure as="div">
                                      {({ open }) => (
                                        <>
                                          <Disclosure.Button
                                            className={classNames(
                                              "flex pl-2 gap-3 font-normal text-primary-300 w-full group items-center py-3 hover:bg-gray-50 hover:text-primary-900"
                                            )}
                                          >
                                            {open ? (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-3 h-3"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M19.5 12h-15"
                                                />
                                              </svg>
                                            ) : (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-3 h-3"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M12 4.5v15m7.5-7.5h-15"
                                                />
                                              </svg>
                                            )}
                                            {item.label}
                                          </Disclosure.Button>
                                          <Disclosure.Panel
                                            as="ul"
                                            className="pl-2 mt-1 space-y-1 bg-gray-900 border border-gray-800"
                                          >
                                            {item.children!.map((subItem) => (
                                              <li key={subItem.id}>
                                                <Link
                                                  key={subItem.id}
                                                  href={subItem.link!}
                                                  className={classNames(
                                                    open &&
                                                      location.includes(
                                                        subItem.link!
                                                      )
                                                      ? "bg-primary-25 pl-4 border-l-4 rounded-tl-sm rounded-bl-sm border-warning-400 font-medium text-primary-900"
                                                      : "hover:bg-gray-50 hover:text-primary-900",
                                                    "block py-2 pl-6 leading-6 font-light"
                                                  )}
                                                >
                                                  {subItem.label}
                                                </Link>
                                              </li>
                                            ))}
                                          </Disclosure.Panel>
                                        </>
                                      )}
                                    </Disclosure>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 space-y-4">
                            <Link href={"/login"}>
                              <button className="flex items-center w-full gap-2 py-1 bg-gray-500 rounded-md shadow text-warning-500 bg-opacity-20 backdrop-blur backdrop-filter">
                                <NavigationIcon
                                  icon={<Logout />}
                                  size={ICON_SIZES.xxl}
                                />
                                <span className="text-sm text-gray-25">
                                  Logout
                                </span>
                              </button>
                            </Link>
                            <AvatarCell
                              firstName={sampleEmployee.bioData.firstName}
                              lastName={sampleEmployee.bioData.lastName}
                              imageUrl={sampleEmployee.bioData.avatar}
                              row2={sampleEmployee.jobInformation?.jobTitle}
                              fullName={sampleEmployee.bioData.fullName}
                              dark={true}
                            />
                          </div>
                        </div>

                        {/* <div className="relative bottom-0 px-4 pt-4 mx-4 mt-4 mb-24 bg-gray-100 rounded-md">
                          <div className="mb-3">
                            <EmployeeCell
                              employee={SignedInEmployee}
                              size={AVATAR_IMAGE_SIZES.md}
                            />
                          </div>

                          <ProfileContent />
                        </div> */}
                      </div>
                    </Transition.Child>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
