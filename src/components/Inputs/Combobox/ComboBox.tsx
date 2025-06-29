"use client";
import { useState } from "react";
import { Lbl } from "../../Typography";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ComboBoxProps } from "./ComboBox.types";
import { fieldWrapper, INPUT_SIZE, inputWrapper } from "../Input.types";
import clsx from "clsx";
import { Check } from "lucide-react";

/** Basic Dropdown style element that allows the user search from the dropdown list */
export const ComboBoxInput = ({
  id,
  label,
  onChangeHandler,
  disabled = false,
  showError = false,
  span = INPUT_SIZE.full,
  errorLabel,
  required,
  items,
  defaultValue,
}: ComboBoxProps) => {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items?.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div
      className={clsx("space-y-0", span)}
      key={id}
    >
      <Field className={fieldWrapper(showError, label)}>
        {label && (
          <Lbl
            label={label}
            required={required}
          />
        )}
        <Combobox
          as="div"
          // value={selectedItem}
          defaultValue={defaultValue}
          onClose={() => setQuery("")}
          onChange={onChangeHandler}
        >
          <div className="relative">
            <ComboboxInput
              aria-label={label}
              displayValue={(item) => item as string}
              onChange={(event) => setQuery(event.target.value)}
              className={inputWrapper(disabled, showError)}
            />
            <ComboboxButton className="absolute inset-y-0 right-2 flex items-center rounded-r-md focus:outline-none">
              <ChevronUpDownIcon
                className="size-4 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>

            <ComboboxOptions
              anchor="bottom start"
              className="border p-1 bg-white empty:invisible w-[var(--input-width)] rounded"
            >
              {filteredItems?.map((item, index) => (
                <ComboboxOption
                  key={index}
                  value={item}
                  className="cursor-default group flex items-center justify-between rounded select-none py-2 px-3 text-xs text-gray-900 data-[focus]:bg-primary-900 data-[focus]:text-white data-[focus]:outline-none bg-white"
                >
                  {item}
                  <Check className="invisible size-4  group-data-[selected]:visible" />
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </div>
        </Combobox>
      </Field>
      {showError && (
        <p className="text-xs font-medium text-red-500">{errorLabel}</p>
      )}
    </div>
  );
};
