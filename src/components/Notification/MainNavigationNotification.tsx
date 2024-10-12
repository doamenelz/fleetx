import { Menu, Transition, Dialog } from "@headlessui/react";
import { BellAlertIcon, PencilIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import {
  Avatar,
  AVATAR_SIZES,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
  Tab,
  Tabs,
} from "..";
import { sampleEmployee } from "@/models";
import Link from "next/link";

const team = [
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Whitney Francis",
    email: "whitney.francis@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leonard Krasner",
    email: "leonard.krasner@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    email: "floyd.miles@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Selman",
    email: "emily.selman@example.com",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const tabs: Tab[] = [
  { id: "", name: "All", href: "all" },
  { id: "", name: "Team Requests", href: "team" },
  { id: "", name: "Direct Requests", href: "direct" },
];

export const MainNavigationNotification = () => {
  const [open, setOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("All");

  return (
    <>
      <Link href={"/dashboard"}>
        <BellAlertIcon
          className="w-4 h-4 hover:text-primary-900 cursor-pointer"
          // onClick={() => setOpen(true)}
        />
      </Link>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
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
          {/* <div className="fixed inset-0 bg-modal" /> */}

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto p-4">
                        <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                          Notifications
                        </Dialog.Title>
                        <Tabs
                          tabs={tabs}
                          selectedTab={selectedView}
                          tabHandler={setSelectedView}
                        >
                          <p></p>
                        </Tabs>
                        <div className="divide-y">
                          <ConfirmationPendingAction />
                          <ProfileUpdate />
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const ConfirmationPendingAction = () => {
  return (
    <div className="p-4 group  text-left tracking-tight w-full">
      <div className="flex text-xs text-gray-700 gap-4 py-2">
        <Avatar
          firstName={sampleEmployee.bioData.firstName}
          lastName={sampleEmployee.bioData.lastName}
          imageUrl={sampleEmployee.bioData.avatar}
          size={AVATAR_SIZES.sm}
        />
        <div>
          <p className="font-medium">
            {sampleEmployee.bioData.firstName} {sampleEmployee.bioData.lastName}{" "}
            <span className="font-light">submitted an </span>{" "}
            <span className="font-medium ">Appraisal Request</span>
          </p>
          <div className="flex gap-2 mt-1 mb-4 items-center">
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <span>
                <CalendarIcon className="w-3 h-3" />
              </span>
              23 Jan, 2024
            </p>
            <p className="text-gray-400">|</p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <span>
                <BriefcaseIcon className="w-3 h-3" />
              </span>
              Employment Confirmation
            </p>
          </div>
          <Button
            // onClick={() => onClickHandler(document)}
            label="View Request"
            skin={BUTTON_SKIN.secondaryColor}
            // icon={{
            //   position: ICON_POSITION.trailing,
            //   asset: <PencilIcon className="w-3 h-3" />,
            // }}
          />
        </div>
      </div>
    </div>
  );
};

const ProfileUpdate = () => {
  return (
    <>
      <div className="p-4 text-left tracking-tight w-full">
        <div className="flex text-xs text-gray-700 gap-4 py-2">
          <Avatar
            firstName={"Human"}
            lastName={"Resources"}
            size={AVATAR_SIZES.sm}
          />
          <div>
            <p className="font-medium">
              Human Resources
              <span className="font-light"> approved your </span>{" "}
              <span className="font-medium group-hover:text-primary-900">
                Profile Changes
              </span>
            </p>
            <div className="flex gap-2 mt-1 items-center">
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <span>
                  <CalendarIcon className="w-3 h-3" />
                </span>
                23 Jan, 2024
              </p>
              <p className="text-gray-400">|</p>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <span>
                  <BriefcaseIcon className="w-3 h-3" />
                </span>
                Profile Information
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
