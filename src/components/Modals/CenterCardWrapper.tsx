import { classNames } from "@/lib/utilities/helperFunctions";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { FC, Fragment, useState, Dispatch, SetStateAction } from "react";

export const CenterCardModal: FC<{
  children: JSX.Element;
  closeControl: Dispatch<SetStateAction<boolean>>;
  openControl: boolean;
  size?: "modal" | "dialog";
}> = ({ children, closeControl, openControl, size }) => {
  return (
    <>
      <Transition
        appear
        show={openControl}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeControl}
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-modal  transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />
          {/* <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-modal" />
          </TransitionChild> */}

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <DialogPanel
                className={classNames(
                  // "w-full flex flex-col transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl h-full transition-all",
                  size === "modal"
                    ? "max-w-3xl"
                    : size === "dialog"
                    ? "max-w-lg"
                    : "max-w-3xl",
                  "relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                )}
              >
                {children}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

/*
overflow-hidden
*/
