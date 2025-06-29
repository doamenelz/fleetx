import { INPUT_SIZE } from "../Input.types";

export interface ComboBoxProps {
  label?: string;
  id: string;
  items: string[];
  span?: INPUT_SIZE;
  disabled?: boolean;
  required?: boolean;
  value: string;
  showError?: boolean;
  errorLabel?: string;
  defaultValue?: string;
  onChangeHandler: (event: string) => void;
}
