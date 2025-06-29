import { JSX } from "react";

export interface SwitchProps {
  id: string;
  icon?: {
    on: JSX.Element;
    off: JSX.Element;
  };
  srText?: string;
  onChangeHandler: (checked: boolean) => void;
  checked: boolean;
  theme?: {
    checked: string;
    idle: string;
  };
}
