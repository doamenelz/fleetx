"use client";
import { Fragment, useContext, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { RootContext } from "@/context/RootContext";
import { classNames } from "@/lib/utilities/helperFunctions";

export enum NOTIFICATION_TYPE {
  error,
  success,
}
export const Toast = () => {
  const context = useContext(RootContext);

  useEffect(() => {
    let timer = setTimeout(function () {
      context.toggleNotification(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [context.showNotification]);

  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:items-start sm:p-6"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          <Transition
            show={context.showNotification}
            as={Fragment}
            enter="transform ease-out duration-500 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={classNames(
                context.notificationType === "success"
                  ? "bg-success-25 border-success-600"
                  : "bg-error-25 border-error-600",
                "w-full max-w-sm overflow-hidden border-l-8 rounded-md shadow-xl pointer-events-auto "
              )}
            >
              <div className="px-2 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {/* Icon */}
                    {context.notificationType === "success" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-success-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}

                    {context.notificationType === "error" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-error-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {context.notificationHeader}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {context.notificationCopy}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      type="button"
                      className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      onClick={() => {
                        context.toggleNotification(false);
                      }}
                    >
                      <span className="sr-only">Close</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-900"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
