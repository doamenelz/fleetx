"use client";

import { Lbl } from "../../Typography";
import { BasicTextInputProps } from "./BasicTextInput.types";
import { fieldWrapper, INPUT_SIZE, inputWrapper } from "../Input.types";
import { Field } from "@headlessui/react";

//TODO: Create Password Input
export const BasicTextInput = ({
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
  type = "text",
}: BasicTextInputProps) => {
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
        <div className="">
          <input
            value={value}
            onChange={onChangeHandler}
            type={type}
            name={id}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
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
