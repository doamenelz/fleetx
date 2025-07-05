import { ICON_POSITION } from "@/components/Button";
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
  icon?: {
    asset: JSX.Element;
    position: ICON_POSITION;
  };
  actionIcon?: JSX.Element;
  onKeyDownAction?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}
