import { Lbl } from "../../Typography";
import { fieldWrapper, INPUT_SIZE, inputWrapper } from "../Input.types";
import { TextAreaProps } from "./TextArea.types";
import { Field } from "@headlessui/react";

export const TextArea = ({
  id,
  label,
  onChangeHandler,
  disabled = false,
  showError = false,
  span = INPUT_SIZE.full,
  errorLabel,
  required,
  placeholder,
  rows = 4,
  value,
}: TextAreaProps) => {
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

        <div className="relative ">
          <textarea
            onChange={onChangeHandler}
            value={value}
            rows={rows}
            name={label}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
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
