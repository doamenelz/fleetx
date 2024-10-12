import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState, Dispatch, SetStateAction } from "react";

export const CenterCardModal: FC<{
  children: JSX.Element;
  closeControl: Dispatch<SetStateAction<boolean>>;
  openControl: boolean;
}> = ({ children, closeControl, openControl }) => {
  return (
    <>
      <Transition appear show={openControl} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeControl}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-modal" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl overflow-y-scroll flex flex-col transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl h-full transition-all">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
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
