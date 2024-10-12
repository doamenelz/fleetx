"use client";
import { FC, useState, Fragment, useRef } from "react";
import { INPUT_TYPES, InputObject, TEXT_INPUT_SIZE } from "../TextInput";
import { Lbl } from "../Typography";
import { classNames } from "@/lib/utilities/helperFunctions";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const Dropdown: FC<{
  label?: string;
  id: string;
  errorLabel?: string;
  defaultValue?: string;
  disabled?: boolean;
  items: string[];
  setValue: Function;
  value: string;
  span: TEXT_INPUT_SIZE;
  required?: boolean;
  showError?: boolean;
  style: INPUT_TYPES;
}> = (props) => {
  const [_value, _setValue] = useState(props.defaultValue);
  const handleValueChange = (changedValue: string) => {
    const inputObject: InputObject = {
      id: props.id,
      stringValue: changedValue,
      type: INPUT_TYPES.text,
      required: props.required,
    };
    // setValue(props.items.findIndex((index) => index === changedValue) ?? 0);
    _setValue(changedValue);
    props.setValue(inputObject);
  };

  return (
    <div className={classNames(props.span)}>
      {props.label && (
        <Lbl
          label={props.label}
          required={props.required}
        />
      )}

      <div
        className={classNames(
          "relative tracking-tighter border border-slate-300 rounded-md min-w-input focus:border-indigo-600"
        )}
      >
        <Listbox
          value={_value}
          as={"div"}
          onChange={(e) => handleValueChange(e)}
          disabled={props.disabled}
        >
          <ListboxButton
            className={classNames(
              "relative w-full py-1.5 bg-white pl-2 rounded-md pr-10 text-left cursor-default peer focus:outline-none focus-visible:border-indigo-600 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm",
              props.disabled === true ? "cursor-not-allowed" : ""
            )}
          >
            <span className="block text-sm leading-6 truncate">{_value}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          {props.showError && (
            <p className="text-xs text-red-500">{props.errorLabel}</p>
          )}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-50 w-full p-1 mt-1 overflow-auto text-base tracking-normal bg-white rounded-md shadow-lg max-h-60 ring-1 ring-gray-200 focus:outline-none sm:text-sm">
              {props.items.map((item, personIdx) => (
                <ListboxOption
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-indigo-50 text-slate-900" : "text-slate-700"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? "font-medium text-indigo-900"
                            : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </Listbox>
      </div>
    </div>
  );
};
