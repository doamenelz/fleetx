import { INPUT_SIZE } from "../Inputs";

export interface DatePickerProps {
  label?: string;
  id: string;
  selectedDate: Date;
  errorLabel?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  span?: INPUT_SIZE;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onChangeHandler: Function;
  showError?: boolean;
}

export enum DATE_TYPES {
  long,
  short,
}
