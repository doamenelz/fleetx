import { INPUT_SIZE } from "../Input.types";

export interface BasicTextInputProps {
  label?: string;
  id: string;
  span?: INPUT_SIZE;
  disabled?: boolean;
  required?: boolean;
  value: string;
  showError?: boolean;
  errorLabel?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}
