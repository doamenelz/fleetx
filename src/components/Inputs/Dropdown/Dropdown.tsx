"use client";
import {
  Field,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

import { Check, ChevronDownIcon } from "lucide-react";
import { Lbl } from "../../Typography";
import { DropdownProps } from "./Dropdown.types";
import {
  dropOptionsContainer,
  fieldWrapper,
  INPUT_SIZE,
  inputWrapper,
} from "../Input.types";
export const Dropdown = ({
  label,
  id,
  errorLabel,
  disabled = false,
  items,
  value,
  span = INPUT_SIZE.full,
  required,
  showError = false,
  onChangeHandler,
}: DropdownProps) => {
  return (
    <div
      className={span}
      key={id}
    >
      <Field className={fieldWrapper(showError, label)}>
        {label && (
          <Lbl
            label={label}
            required={required}
          />
        )}

        <Listbox
          value={value}
          as={"div"}
          onChange={onChangeHandler}
          disabled={disabled}
        >
          <ListboxButton
            className={clsx(
              inputWrapper(disabled, showError),
              "text-left relative items-center"
            )}
          >
            {value}
            <ChevronDownIcon
              className="group pointer-events-none absolute text-gray-400 top-2.5 right-2 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className={dropOptionsContainer()}
          >
            {items.map((item, index) => (
              <ListboxOption
                key={index}
                value={item}
                className="cursor-default group flex items-center justify-between select-none rounded py-2 px-3 text-xs text-gray-900 data-[focus]:bg-primary-900 data-[focus]:text-white data-[focus]:outline-none bg-white"
              >
                {item}
                <Check className="invisible size-4  group-data-[selected]:visible" />

                {/* <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-900 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                  <Check
                    aria-hidden="true"
                    className="size-4 text-primary-600"
                  />
                </span> */}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </Field>

      {showError && (
        <p className="text-xs font-medium text-red-500">{errorLabel}</p>
      )}
    </div>
  );
};

/** w-[var(--input-width)] */
