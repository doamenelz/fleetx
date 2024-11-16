"use client";
import { FC, Fragment, useRef, useState } from "react";
import {
  TEXT_INPUT_SIZE,
  INPUT_TYPES,
  InputObject,
  TextInputProps,
} from "./TextInput.types";
import { classNames } from "@/lib/utilities/helperFunctions";
import { Lbl } from "../Typography";
import {
  emailRegex,
  testWholeNumbers,
  validatePhoneNumber,
} from "@/lib/utilities/regex";
import {
  Checkbox,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Field,
  Label,
} from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];
export const ComboBoxInput: FC<{ props: TextInputProps }> = ({ props }) => {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
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
        value={selectedPerson}
        onChange={(person) => {
          setQuery("");
          setSelectedPerson(person);
        }}
      >
        <div className="relative">
          <ComboboxInput
            aria-label="Assignee"
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
            className={classNames(
              props.disabled === true ? "cursor-not-allowed " : "",
              props.showError ? "border-red-500" : "",
              "block w-full border-0 py-1 font-medium text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-xs focus:outline-none"
            )}
          />
          {/* <ComboboxInput
            className={classNames(
              props.disabled === true ? "cursor-not-allowed " : "",
              props.showError ? "border-red-500" : "",
              "block w-full border-0 py-1 font-medium text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-xs focus:outline-none"
            )}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setQuery("")}
            // displayValue={(person) => person?.name}
          /> */}
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
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="cursor-default select-none py-2 pl-3 pr-9 text-xs text-gray-900 data-[focus]:bg-brand-indiGlow data-[focus]:text-white data-[focus]:outline-none bg-white"
              >
                {person.name}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </Field>
  );
};
