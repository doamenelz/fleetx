"use client";
import { FC, Fragment, useRef, useState } from "react";
import { INPUT_TYPES, InputObject, TextInputProps } from "./TextInput.types";
import { classNames } from "@/lib/utilities/helperFunctions";
import { Lbl } from "../Typography";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const ComboBoxInput: FC<{ props: TextInputProps }> = ({ props }) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(props.defaultValue);

  const onChangeHandler = (event: string) => {
    const inputObject: InputObject = {
      id: props.id,
      stringValue: event,
      type: INPUT_TYPES.combo,
      required: props.required,
    };
    props.setValue(inputObject);
  };
  const filteredItems =
    query === ""
      ? props.items
      : props.items?.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Field
      className={classNames(
        " rounded-md px-3 pb-1.5 pt-2.5  ring-1 ring-inset ring-gray-200 focus-within:ring-1 focus-within:ring-brand-persianBlue",
        props.span,
        props.showError == true ? "ring-red-500" : "ring-gray-200"
      )}
    >
      {props.label && (
        <Lbl
          label={props.label}
          required={props.required}
          isLight={true}
        />
      )}
      <Combobox
        as="div"
        // value={selectedItem}
        defaultValue={props.defaultValue}
        onClose={() => setQuery("")}
        onChange={onChangeHandler}
        // onChange={(item) => {
        //   setQuery("");
        //   setSelectedItem(item as string | undefined);
        //   onChangeHandler()
        // }}
      >
        <div className="relative">
          <ComboboxInput
            aria-label="Assignee"
            displayValue={(item) => item as string}
            onChange={(event) => setQuery(event.target.value)}
            className={classNames(
              props.disabled === true ? "cursor-not-allowed " : "",
              props.showError ? "border-red-500" : "",
              "block w-full border-0 py-1 font-medium text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-xs focus:outline-none"
            )}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="size-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>

          <ComboboxOptions
            anchor="bottom start"
            className="border empty:invisible w-[var(--input-width)]"
          >
            {filteredItems?.map((item, index) => (
              <ComboboxOption
                key={index}
                value={item}
                className="cursor-default select-none py-2 pl-3 pr-9 text-xs text-gray-900 data-[focus]:bg-brand-indiGlow data-[focus]:text-white data-[focus]:outline-none bg-white"
              >
                {item}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </Field>
  );
};
