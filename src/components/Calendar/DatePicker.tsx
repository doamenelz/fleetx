"use client";
import { Fragment } from "react";
import {
  Field,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { CalendarCard } from "./CalendarCard";
import { fieldWrapper, INPUT_SIZE, inputWrapper } from "..";
import { Lbl } from "..";
export const DateTypesObject = {
  long: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
  short: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
};
import { DatePickerProps } from "./Calendar.types";
import clsx from "clsx";

export const DatePicker = ({
  label,
  id,
  selectedDate,
  errorLabel,
  showError = false,
  span = INPUT_SIZE.full,
  disabled = false,
  required,
  onChangeHandler,
}: DatePickerProps) => {
  return (
    <div
      className={span}
      key={id}
    >
      <Field
        disabled={disabled}
        className={clsx(fieldWrapper(showError, label))}
      >
        {label && (
          <Lbl
            label={label}
            required={required}
          />
        )}
        <Popover className={clsx("relative min-w-input")}>
          <div>
            <PopoverButton
              disabled={disabled}
              className={clsx(
                inputWrapper(disabled, showError),
                "text-left relative items-center"
              )}
            >
              <div className="flex items-center justify-between gap-1 text-left">
                <p>
                  {selectedDate.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
            </PopoverButton>
          </div>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <PopoverPanel className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base tracking-normal bg-white shadow-lg ring-1 ring-gray-300 focus:outline-none sm:text-xs">
              {({ close }) => (
                <CalendarCard
                  selectedDate={selectedDate}
                  closeFocus={close}
                  updateDate={onChangeHandler}
                />
              )}
            </PopoverPanel>
          </Transition>
        </Popover>
      </Field>
      {showError && <p className="text-xs text-red-500">{errorLabel}</p>}
    </div>
  );
};
