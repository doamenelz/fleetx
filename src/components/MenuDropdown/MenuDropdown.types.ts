import { JSX } from "react";

export interface MenuDropdownProps {
  button?: JSX.Element;
  anchorPosition?:
    | "bottom"
    | "top"
    | "left"
    | "right"
    | "bottom start"
    | "top start"
    | "left start"
    | "right start"
    | "bottom end"
    | "top end"
    | "left end"
    | "right end";
  optionsWidth?: string;
  items: {
    id: string;
    label: string;
    function: () => void;
    icon?: JSX.Element;
  }[];
}
