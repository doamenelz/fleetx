export enum BUTTON_SKIN {
  primary,
  secondary,
  secondaryColor,
  link,
  linkColor,
}

export enum BUTTON_SIZES {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export enum ICON_POSITION {
  leading,
  trailing,
}

export interface ButtonProps {
  size?: BUTTON_SIZES.sm | BUTTON_SIZES.md | BUTTON_SIZES.lg;
  skin?:
    | BUTTON_SKIN.primary
    | BUTTON_SKIN.secondary
    | BUTTON_SKIN.secondaryColor
    | BUTTON_SKIN.link
    | BUTTON_SKIN.linkColor;
  /** Use from the IconList provided in assets/Icon. These icons require a "size" prop, and an "icon" prop */
  label: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  fillWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  componentType?: "button" | "link";
  link?: string;
  destructive?: boolean;
  icon?: { position: ICON_POSITION; asset: JSX.Element };
}
