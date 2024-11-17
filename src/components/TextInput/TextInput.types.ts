import { Address } from "@/models";
export interface TextInputProps {
  style: INPUT_TYPES;
  label: string;
  id: string;
  placeHolder?: string;
  items?: string[];
  span: TEXT_INPUT_SIZE;
  copy?: string | JSX.Element;
  editMode: boolean;
  disabled?: boolean;
  address?: Address;
  defaultValue?: string | boolean;
  required?: boolean;
  value?: string;
  valueDate?: Date;
  showError?: boolean;
  setShowError: Function;
  errorLabel?: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  setValue: Function;
}

export enum TEXT_INPUT_SIZE {
  full = "col-span-full",
  span1 = "sm:col-span-1",
  span2 = "sm:col-span-2",
  span3 = "sm:col-span-3",
  span4 = "sm:col-span-4",
  span5 = "sm:col-span-5",
}

export enum INPUT_TYPES {
  text,
  textarea,
  dropdown,
  date,
  email,
  address,
  number,
  phone,
  password,
  checkBox,
  checkBoxGroup,
  radio,
  combo,
}

export interface InputObject {
  id: string;
  stringValue?: string;
  boolValue?: boolean;
  dateValue?: Date;
  type: INPUT_TYPES;
  required?: boolean;
}

export const inputHelper = (
  input: InputObject,
  inputCollection: InputObject[],
  changeHandler: Function
) => {
  changeHandler(
    inputCollection.map((item) => {
      if (item.id === input.id) {
        return {
          ...item,
          stringValue: input.stringValue,
          dataValue: input.dateValue,
          boolValue: input.boolValue,
        };
      } else {
        return item;
      }
    })
  );
};

export const findInputById = (objects: TextInputProps[], id: string) => {
  return objects.find((item) => item.id === id);
};

export const parseFieldTypes = (type: string) => {
  switch (type) {
    case "text":
      return INPUT_TYPES.text;
    case "checkbox":
      return INPUT_TYPES.checkBox;

    default:
      return INPUT_TYPES.text;
  }
};
