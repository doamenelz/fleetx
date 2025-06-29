import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { RadioGroupProps } from "./Radio.types";
import clsx from "clsx";

export const RadioGroupInput = ({
  id,
  checked,
  onChangeHandler,
  items,
  theme = {
    checked: "data-[checked]:bg-primary-900",
    idle: "bg-gray-100",
  },
}: RadioGroupProps) => {
  return (
    <>
      <RadioGroup
        value={checked}
        onChange={onChangeHandler}
        aria-label="radio-group"
        id={id}
      >
        {items?.map((item, index) => (
          <Field
            key={index}
            className="flex items-center gap-2 py-1"
          >
            <Radio
              value={typeof item == "string" ? item : item.key}
              className={clsx(
                "group flex size-5 items-center justify-center rounded-full border border-gray-300",
                theme.checked,
                theme.idle
              )}
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label className={"text-sm"}>{item}</Label>
          </Field>
        ))}
      </RadioGroup>
    </>
  );
};
