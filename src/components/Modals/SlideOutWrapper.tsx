import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FC, Fragment, Dispatch, SetStateAction, JSX } from "react";
import clsx from "clsx";
export interface SlideOutProps {
  children: JSX.Element;
  closeControl: Dispatch<SetStateAction<boolean>>;
  openControl: boolean;
  size?: string;
  enableModalDismiss?: boolean;
  fillHeight?: boolean;
}

export const SlideOutWrapper: FC<SlideOutProps> = ({
  children,
  closeControl,
  openControl,
  size = "md:max-w-sm",
  enableModalDismiss = true,
  fillHeight = false,
}) => {
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
          onClose={enableModalDismiss ? closeControl : () => {}}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-modal" />
          </TransitionChild>

          <div className="fixed inset-0  overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-2 md:pl-10 pointer-events-none">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel
                  className={clsx(
                    "relative pointer-events-auto w-screen",
                    size
                  )}
                >
                  <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className={clsx("flex h-full")}>
                      <div className="flex flex-col w-full ">
                        <div
                          className={clsx(
                            " h-full flex-col overflow-y-scroll bg-white shadow-xl",
                            !fillHeight && "md:rounded-lg md:m-2"
                          )}
                        >
                          {children}
                        </div>
                      </div>
                    </div>
                  </TransitionChild>
                </DialogPanel>
              </TransitionChild>
            </div>
            {/* </div> */}
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
