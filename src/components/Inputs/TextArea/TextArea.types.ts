import { INPUT_SIZE } from "../Input.types";

export interface TextAreaProps {
  label?: string;
  id: string;
  errorLabel?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  span: INPUT_SIZE;
  value: string;
  rows?: number;
  placeholder?: string;
  onChangeHandler: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  showError?: boolean;
}
