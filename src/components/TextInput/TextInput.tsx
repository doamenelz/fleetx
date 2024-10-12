"use client";
import { FC, useRef, useState } from "react";
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

const testForMobile = (value: string) => {
  const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  if (value === "" || regex.test(value)) {
    return true;
  } else {
    return false;
  }
};

export const TextInput: FC<{ props: TextInputProps }> = ({ props }) => {
  const [_value, _setValue] = useState(props.defaultValue);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const inputObject: InputObject = {
      id: props.id,
      stringValue: event.currentTarget?.value,
      type: INPUT_TYPES.text,
      required: props.required,
    };

    switch (props.style) {
      case INPUT_TYPES.number:
        if (testWholeNumbers(event.currentTarget.value)) {
          props.setShowError(false);
          _setValue(event.currentTarget.value);
          props.setValue(inputObject);
        }
        break;
      case INPUT_TYPES.phone:
        if (testWholeNumbers(event.currentTarget.value)) {
          props.setShowError(false);
          _setValue(event.currentTarget.value);
          props.setValue(inputObject);
        }

        break;
      // case INPUT_TYPES.email:
      //   if (emailRegex(event.currentTarget.value)) {
      //     props.setShowError(false);
      //     _setValue(event.currentTarget.value);
      //     props.setValue(inputObject);
      //   }

      //   break;

      default:
        props.setShowError(false);
        _setValue(event.currentTarget.value);
        props.setValue(inputObject);
        break;
    }
  };

  return (
    <div className={props.span}>
      {props.label && <Lbl label={props.label} required={props.required} />}
      <div className=" ">
        <input
          value={_value}
          onChange={onChangeHandler}
          // ref={refValue}
          type={props.type}
          name={props.name}
          id={props.id}
          // pattern={props.pattern}
          // defaultValue={props.defaultValue}
          placeholder={props.placeHolder}
          disabled={props.disabled}
          required={props.required}
          autoComplete={props.autoComplete}
          className={classNames(
            props.disabled === true ? "cursor-not-allowed " : "",
            props.showError ? "border-red-500" : "",
            "block bg-white peer w-full min-w-input border border-slate-300 pl-2 focus:border-indigo-600  py-1.5 text-gray-900 focus:outline-none text-sm leading-loose rounded-md "
          )}
        />
      </div>
      {props.showError && (
        <p className="mt-1 text-xs text-red-600">{props.errorLabel}</p>
      )}
    </div>
  );
};

export const TextArea: FC<{
  label?: string;
  id: string;
  errorLabel?: string;
  type?: string;
  defaultValue?: string;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  span: TEXT_INPUT_SIZE;
  checkValidation?: boolean;
  style: INPUT_TYPES;
  setValue: Function;
}> = (props) => {
  const [value, setValue] = useState("");
  const [showError, setShowError] = useState(false);

  const onChangeHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const inputObject: InputObject = {
      id: props.id,
      stringValue:
        value === ""
          ? event.currentTarget?.value.trim()
          : event.currentTarget?.value,
      type: INPUT_TYPES.text,
      required: props.required,
    };

    // console.log(inputObject);

    setValue(inputObject.stringValue ?? "");
    props.setValue(inputObject);
  };
  return (
    <div className={props.span}>
      {props.label && <Lbl label={props.label} required={props.required} />}

      <div className="relative ">
        <textarea
          onChange={onChangeHandler}
          value={value}
          rows={4}
          name={props.label}
          id={props.id}
          defaultValue={props.defaultValue}
          placeholder={props.placeHolder}
          disabled={props.disabled}
          required={props.required}
          //   autoComplete="given-name"
          className="block peer w-full min-w-input border border-slate-300 pl-2 focus:border-indigo-600  py-1.5 text-gray-900 focus:outline-none sm:text-sm sm:leading-6 rounded-md "
        />
        {/* <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-primary-600"
          aria-hidden="true"
        /> */}
      </div>
      {showError ||
        (props.checkValidation && value === "" && (
          <p className="mt-1 text-xs text-error-600">{props.errorLabel}</p>
        ))}
    </div>
  );
};

export const NumberInput: FC<{
  label?: string;
  id: string;
  errorLabel?: string;
  defaultValue?: string;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  pattern?: string;
  span?: TEXT_INPUT_SIZE;
  setValue: Function;
}> = (props) => {
  const [value, setValue] = useState("");
  let refValue = useRef<HTMLInputElement | null>(null);
  const [showError, setShowError] = useState(false);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    // if (props.required) {
    //   if (refValue.current?.value === "") {
    //     setShowError(false);
    //   } else {
    //     setShowError(true);
    //   }
    // } else {
    //   if (validatePhoneNumber(event.currentTarget.value)) {
    //     setValue(event.currentTarget.value);
    //   } else {
    //     setValue("");
    //   }
    //   setShowError(false);
    // }
    if (testForMobile(event.currentTarget.value)) {
      setValue(event.currentTarget.value);
    }

    // setValue((v) =>
    //   event.currentTarget.validity.valid ? event.currentTarget.value : v
    // );
  };
  return (
    <div className={props.span}>
      <label
        htmlFor={props.label}
        className="block text-sm font-normal leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="relative border rounded-sm">
        <input
          type="text"
          name={props.label}
          id={props.id}
          pattern="\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%"
          defaultValue={props.defaultValue}
          placeholder={props.placeHolder}
          disabled={props.disabled}
          required={props.required}
          value={value}
          onChange={onChangeHandler}
          // onChange={(e) =>
          //   setValue((v) => (e.target.validity.valid ? e.target.value : v))
          // }
          //   autoComplete="given-name"
          className={classNames(
            props.disabled === true ? "cursor-not-allowed " : "",
            "block peer w-full min-w-input border-0 pl-2  py-1.5 text-gray-900 focus:outline-none sm:text-sm sm:leading-6"
          )}
        />
        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-primary-600"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export const DatePickerInput: FC<{
  label?: string;
  id: string;
  errorLabel?: string;
  type?: string;
  defaultValue?: string;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  span?: TEXT_INPUT_SIZE;
}> = (props) => {
  return (
    <div className={props.span}>
      <label
        htmlFor={props.label}
        className="block text-sm font-normal leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={props.label}
          id={props.id}
          defaultValue={props.defaultValue}
          placeholder={props.placeHolder}
          disabled={props.disabled}
          required={props.required}
          //   autoComplete="given-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
