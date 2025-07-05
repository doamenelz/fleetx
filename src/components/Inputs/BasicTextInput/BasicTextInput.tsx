"use client";

import { Lbl } from "../../Typography";
import { BasicTextInputProps } from "./BasicTextInput.types";
import { fieldWrapper, INPUT_SIZE, inputWrapper } from "../Input.types";
import { Field } from "@headlessui/react";
import clsx from "clsx";
import { ICON_POSITION } from "@/components/Button";

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

export const BasicTextInputWithIcon = ({
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
  icon,
  actionIcon,
  type = "text",
  onKeyDownAction,
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
        <div
          className={clsx(
            inputWrapper(disabled, showError),
            "flex items-center gap-1"
          )}
        >
          {icon && icon.position === ICON_POSITION.leading && icon.asset}
          <input
            value={value}
            onChange={onChangeHandler}
            type={type}
            name={id}
            id={id}
            onKeyDown={onKeyDownAction}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            //   autoComplete={autoComplete}
            className="focus:outline  focus:outline-0 placeholder:text-gray-400 placeholder:text-xs placeholder:font-light"
          />
          {icon && icon.position === ICON_POSITION.trailing && icon.asset}
          {actionIcon}
        </div>
      </Field>
      {showError && (
        <p className="text-xs font-medium text-red-500">{errorLabel}</p>
      )}
    </div>
  );
};
