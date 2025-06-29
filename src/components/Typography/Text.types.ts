import { JSX } from "react";

export interface TextProps {
  label?: string;
  labelStyle?: string;
  copy?: string | JSX.Element;
  isLight?: boolean;
  required?: boolean;
  direction?: "flex" | "column";
  labelComponent?: JSX.Element;
  copyStyle?: string;
  /** Defaults to Left when no value is provided */
  textAlign?: "text-right" | "text-center" | "text-left";
}
