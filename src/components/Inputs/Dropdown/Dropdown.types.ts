import { INPUT_SIZE } from "../Input.types";

export interface DropdownProps {
  label: string;
  id: string;
  items: string[];
  span?: INPUT_SIZE;
  disabled?: boolean;
  required?: boolean;
  value: string;
  showError?: boolean;
  errorLabel?: string;
  onChangeHandler: (event: string) => void;
}
