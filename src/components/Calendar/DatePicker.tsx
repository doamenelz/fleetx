import { FC, useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarCard } from "./CalendarCard";
import { INPUT_TYPES, TEXT_INPUT_SIZE } from "..";
import { Lbl } from "..";
import { classNames } from "@/lib/utilities/helperFunctions";
export const DateTypesObject = {
  long: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
  short: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
};
import { InputObject } from "..";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";

enum DATE_TYPES {
  long,
  short,
}

export const DatePicker: FC<{
  label?: string;
  id: string;
  selectedDate: Date;
  errorLabel?: string;
  type?: string;
  defaultValue?: string;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  span?: TEXT_INPUT_SIZE;
  dateTypes?: DATE_TYPES;
  setValue: Function;
  showError?: boolean;
  style: INPUT_TYPES;
}> = (props) => {
  const [_valueDate, _setValueDate] = useState<Date>(props.selectedDate);

  const onChangeHandler = (event: Date) => {
    const inputObject: InputObject = {
      id: props.id,
      stringValue: event.toISOString(),
      type: INPUT_TYPES.text,
      required: props.required,
    };
    props.setValue(inputObject);
    _setValueDate(event ?? new Date());
  };

  return (
    <div
      className={classNames(
        "rounded-md px-3 pb-1.5 pt-2.5  ring-1 ring-inset ring-gray-200 focus-within:ring-1 focus-within:ring-brand-persianBlue"
      )}
    >
      {props.label && (
        <Lbl
          label={props.label}
          required={props.required}
        />
      )}
      <Popover className={classNames("relative  tracking-tighter min-w-input")}>
        <div>
          <Popover.Button className="block w-full border-0 py-1 font-medium text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-xs focus:outline-none">
            <div className="flex items-center justify-between gap-1 mr-3 text-left">
              <p>
                {_valueDate.toLocaleDateString(undefined, {
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
          </Popover.Button>
          {props.showError && (
            <p className="text-xs text-red-500">{props.errorLabel}</p>
          )}
          {/* <div
            className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-primary-600 "
            aria-hidden="true"
          /> */}
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
          <Popover.Panel className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base tracking-normal bg-white shadow-lg ring-1 ring-gray-300 focus:outline-none sm:text-xs">
            {({ close }) => (
              <CalendarCard
                selectedDate={_valueDate}
                closeFocus={close}
                updateDate={onChangeHandler}
              />
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};
