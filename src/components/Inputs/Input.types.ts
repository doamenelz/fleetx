/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import clsx from "clsx";
import { JSX } from "react";
export enum INPUT_TYPES {
  text,
  textarea,
  dropdown,
  date,
  email,
  address,
  number,
  phone,
  password,
  checkBox,
  checkBoxGroup,
  radio,
  combo,
}

export enum INPUT_SIZE {
  full = "col-span-full",
  span1 = "sm:col-span-1",
  span2 = "sm:col-span-2",
  span3 = "sm:col-span-3",
  span4 = "sm:col-span-4",
  span5 = "sm:col-span-5",
}

export interface InputProps {
  style?: INPUT_TYPES;
  label: string;
  id: string;
  placeHolder?: string;
  items?: string[];
  span?: INPUT_SIZE;
  copy?: string | JSX.Element;
  disabled?: boolean;
  defaultValue?: string | boolean;
  required?: boolean;
  value: string;
  valueDate?: Date;
  showError?: boolean;
  //   setShowError: () => void;
  errorLabel?: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  setValue: Function;
}

export const inputWrapper = (disabled: boolean, showError: boolean) => {
  return clsx(
    disabled === true ? "cursor-not-allowed " : "",
    showError && "ring-red-500",
    "rounded-md py-2 px-3 ring-1 ring-inset ring-gray-300 block w-full border-0 font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus-within:ring-primary-400 focus:border-sky-500"
  );
};

// rounded-md bg-white px-3 pb-1.5 pt-2.5 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600

export const fieldWrapper = (showError: boolean, label?: string) => {
  return clsx("space-y-1", showError && "", label && "");
};

export const dropOptionsContainer = () => {
  return " absolute z-10 mt-1 max-h-60 w-[var(--button-width)] overflow-auto rounded bg-white p-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm";
};

// export const inputWrapper = (disabled: boolean, showError: boolean) => {
//   return clsx(
//     disabled === true ? "cursor-not-allowed " : "",
//     showError && "border-red-500",
//     "block w-full border-0 py-1 font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
//   );
// };

// // rounded-md bg-white px-3 pb-1.5 pt-2.5 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600

// export const fieldWrapper = (showError: boolean, label?: string) => {
//   return clsx(
//     "rounded-md py-1.5 px-3 ring-1 ring-inset ring-gray-200 focus-within:ring-2 focus-within:ring-primary-400 ",
//     showError == true ? "ring-red-500" : "ring-gray-300",
//     label && ""
//   );
// };

// export const dropOptionsContainer = () => {
//   return " absolute z-10 mt-1 max-h-60 w-[var(--button-width)] overflow-auto rounded bg-white p-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm";
// };
