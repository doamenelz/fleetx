import {
  Menu,
  Transition,
  Popover,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { Icon, ICON_SIZES } from "../Icons";
import { IconList } from "@/assets/IconList";

export interface MenuDropdownItemProp {
  id: string;
  label: string;
  function: () => void;
  icon?: JSX.Element;
}

export const MenuDropdown: FC<{
  button?: JSX.Element;
  items: MenuDropdownItemProp[];
}> = ({ button, items }) => {
  return (
    <Menu as="div" className=" relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center bg-slate-50 rounded-md p-2 text-sm font-medium text-gray-900 hover:bg-indigo-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-200">
          {button ? (
            button
          ) : (
            // <Icon icon={IconList.ellipsis} size={ICON_SIZES.md} />
            <EllipsisVerticalIcon className="text-gray-900 w-4 h-4" />
          )}
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-56 max-w-input z-20 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none">
          <div className="grid grid-flow-row p-1">
            {items.map((item, index) => (
              <MenuItem key={index}>
                <button
                  onClick={() => item.function}
                  className="text-xs pl-3 py-2.5 items-center text-left gap-2 w-full hover:bg-slate-100 flex justify-between"
                  key={item.id}
                >
                  {item.label}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export const IconDropdown: FC<{
  items: MenuDropdownItemProp[];
  button: JSX.Element;
}> = ({ items, button }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="focus:outline-none items-center flex">
        <span className="sr-only">Open options</span>
        {button}
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className=" mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="p-2">
          <ul className="space-y-1">
            {items.map((item) => (
              <MenuItem key={item.id}>
                <button
                  onClick={item.function}
                  className="flex text-xs w-full gap-2 items-center p-2 text-slate-700 hover:bg-slate-100 rounded hover:text-slate-900"
                >
                  {item.icon}
                  <p>{item.label}</p>
                </button>
              </MenuItem>
            ))}
          </ul>
          {/* <MenuItem key={items[2].id}>
        <button className="flex w-full gap-2 items-center mt-1 p-2 hover:bg-indigo-50 rounded hover:text-indigo-700">
          {items[2].icon}
          <p>{items[2].label}</p>
        </button>
      </MenuItem> */}
        </div>
      </MenuItems>
    </Menu>
  );
};
