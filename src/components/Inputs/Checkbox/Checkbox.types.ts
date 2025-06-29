import { JSX } from "react";

export interface CheckBoxProps {
  id: string;
  label: string | JSX.Element;
  checked: boolean;
  onChangeHandler: (checked: boolean) => void;
  theme?: {
    checked: string;
    idle: string;
  };
}
