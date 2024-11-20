import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FC, Fragment, Dispatch, SetStateAction } from "react";
import { BUTTON_SKIN, IconButton } from "../Button";
import { ICON_SIZES, Icon } from "../Icons";
import {
  ArrowDownCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { classNames } from "@/lib/utilities/helperFunctions";
export interface SlideOutProps {
  children: JSX.Element;
  closeControl: Dispatch<SetStateAction<boolean>>;
  openControl: boolean;
  size?: "sm" | "lg" | "3xl" | "4xl" | "max";
  showDismissButton?: boolean;
  canDismissProgrammatically?: boolean;
}

export const SlideOutWrapper: FC<SlideOutProps> = ({
  children,
  closeControl,
  openControl,
  size,
  showDismissButton,
  canDismissProgrammatically,
}) => {
  const _size = size === undefined ? "sm" : size;

  const getSize = () => {
    //Change this to a function
    switch (_size) {
      case "sm":
        return "w-screen md:max-w-sm";
      case "lg":
        return "w-screen md:max-w-lg";
      case "3xl":
        return "w-screen md:max-w-3xl";
      case "4xl":
        return "w-screen md:max-w-4xl";
      case "max":
        return "w-screen md:max-w-7xl";

      default:
        return "w-screen md:max-w-md";
    }
  };

  return (
    <>
      <Transition
        appear
        show={openControl}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-50 overscroll-contain"
          onClose={
            showDismissButton && canDismissProgrammatically
              ? closeControl
              : showDismissButton
              ? () => {}
              : closeControl
          }
        >
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

          <div className="fixed inset-0  overflow-hidden">
            {/* <div className="absolute inset-0 overflow-hidden"> */}
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-2 md:pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  className={classNames(
                    "relative pointer-events-auto ",
                    getSize()
                  )}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div
                      className={classNames(
                        "flex h-full",
                        size === "max" ? "" : "md:m-2"
                      )}
                    >
                      {showDismissButton && (
                        <XCircleIcon
                          className=" w-12 h-12 text-gray-200 hover:text-gray-25 cursor-pointer"
                          onClick={() => closeControl(false)}
                        />
                      )}

                      <div className="flex flex-col w-full ">
                        <div
                          className={classNames(
                            " h-full flex-col overflow-y-scroll bg-white shadow-xl",
                            size === "max" ? "" : "md:rounded-lg md:mb-2"
                          )}
                        >
                          {children}
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </Dialog.Panel>
              </Transition.Child>
            </div>
            {/* </div> */}
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
