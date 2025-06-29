"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { MenuDropdownProps } from "./MenuDropdown.types";
import clsx from "clsx";
export const MenuDropdown = ({
  button = (
    <div className="p-2 inline-flex w-full justify-center bg-gray-50 rounded-md text-sm font-medium text-gray-900 hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
      <EllipsisVerticalIcon className="text-gray-900 size-4" />
    </div>
  ),
  anchorPosition = "bottom end",
  optionsWidth = "w-[var(--input-width)]",
  items,
}: MenuDropdownProps) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <MenuButton className={"w-full"}>{button}</MenuButton>

      <MenuItems
        anchor={anchorPosition}
        className={clsx(
          optionsWidth,
          "absolute mt-2 z-50 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none"
        )}
      >
        <div className="grid grid-flow-row p-1">
          {items.map((item, index) => (
            <MenuItem key={index}>
              <button
                onClick={item.function}
                className={clsx(
                  "flex gap-6 justify-between rounded cursor-default select-none py-2 px-3 text-xs text-gray-900 data-[focus]:bg-primary-900 data-[focus]:text-white data-[focus]:outline-none bg-white"
                )}
                key={item.id}
              >
                {item.label}
                {item.icon}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};
