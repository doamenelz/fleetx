import { Address } from "@/models";

export interface TextProps {
  label: string;
  copy?: string | JSX.Element;
  isLight?: boolean;
  required?: boolean;
  direction?: "flex" | "column";
  labelComponent?: JSX.Element;
  /** Defaults to Left when no value is provided */
  textAlign?: "text-right" | "text-center";
}
