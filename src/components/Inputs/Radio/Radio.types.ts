import { JSX } from "react";

export interface RadioGroupProps {
  id: string;
  onChangeHandler: (checked: string) => void;
  items: string[] | JSX.Element[];
  checked: string;
  theme?: {
    checked: string;
    idle: string;
  };
}
