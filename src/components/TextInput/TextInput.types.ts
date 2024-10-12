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
  defaultValue?: string;
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
}

export interface InputObject {
  id: string;
  stringValue?: string;
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
