import { Checkbox, Field, Label } from "@headlessui/react";
import { CheckBoxProps } from "./Checkbox.types";
import clsx from "clsx";

export const BasicCheckbox = ({
  id,
  checked,
  onChangeHandler,
  label,
  theme = {
    checked: "data-[checked]:bg-primary-900",
    idle: "bg-gray-200",
  },
}: CheckBoxProps) => {
  return (
    <Field
      className="flex items-center gap-2"
      id={id}
    >
      <Checkbox
        checked={checked}
        onChange={onChangeHandler}
        className={clsx(
          "group block size-5 rounded border bg-white border-gray-300",
          theme.checked,
          theme.idle
        )}
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      <Label className={"text-sm"}>{label}</Label>
    </Field>
  );
};
