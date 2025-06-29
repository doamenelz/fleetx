"use client";

import { Lbl } from "../../Typography";
import { fieldWrapper, INPUT_SIZE, inputWrapper } from "../Input.types";
import { Field } from "@headlessui/react";
import { PhoneInputProps } from "./PhoneInput.types";
import { ChevronDownIcon } from "lucide-react";

export const PhoneInput = ({
  id,
  label,
  onChangeHandler,
  disabled = false,
  showError = false,
  span = INPUT_SIZE.full,
  errorLabel,
  required,
  placeholder,
  value,
  countryProps,
}: PhoneInputProps) => {
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
        <div className="flex">
          <div className="grid shrink-0 grid-cols-1 focus-within:relative">
            <select
              id="country"
              name="country"
              autoComplete="country"
              aria-label="Country"
              onChange={countryProps?.countryCodeHandler}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md pr-7 text-xs text-gray-500 placeholder:text-gray-400 focus:outline-none focus:-outline-offset-2 focus:text-primary-900 sm:text-sm/6"
            >
              {countryProps?.countryCodes.map((countryCode, index) => (
                <option key={index}>{countryCode}</option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-3 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
          <input
            value={value}
            onChange={onChangeHandler}
            type={"text"}
            name={id}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            // pattern="/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;"
            //   autoComplete={autoComplete}
            className={inputWrapper(disabled, showError)}
          />
        </div>
      </Field>
      {showError && (
        <p className="text-xs font-medium text-red-500">{errorLabel}</p>
      )}
    </div>
  );
};
