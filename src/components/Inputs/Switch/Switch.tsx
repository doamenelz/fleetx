"use client";
import { Switch } from "@headlessui/react";
import { SwitchProps } from "./Switch.types";
import clsx from "clsx";

export const SwitchInput = ({
  id,
  icon,
  onChangeHandler,
  checked,
  srText = "Switch",
  theme = {
    checked: "data-[checked]:bg-primary-900",
    idle: "bg-gray-200",
  },
}: SwitchProps) => {
  return (
    <Switch
      id={id}
      checked={checked}
      onChange={onChangeHandler}
      className={clsx(
        theme.checked,
        theme.idle,
        "group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent  transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary-300 focus:ring-offset-2 "
      )}
    >
      <span className="sr-only">{srText}</span>
      <span className="pointer-events-none relative inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
        >
          {icon?.off}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex size-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
        >
          {icon?.on}
        </span>
      </span>
    </Switch>
  );
};
