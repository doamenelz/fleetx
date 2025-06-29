import { JSX } from "react";

export enum AVATAR_SIZES {
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  xxxl,
}

export interface AvatarProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  size?: AVATAR_SIZES;
  hasPadding?: boolean;
  center?: boolean;
  /** Use Tailwind BG Colors */
  bgColor?: string;
}

export interface AvatarCellProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  size?: AVATAR_SIZES;
  bgColor?: string;
  hasPadding?: boolean;
  /** Applies a button theme to the name */
  highlightName?: boolean;
  fullName: string;
  row2?: string;
  row3?: string;
  rowComponent?: JSX.Element;
  dark?: boolean;
}

export interface AvatarStackProps {
  items: { firstName: string; lastName: string; imageUrl?: string }[];
  /** Defaults to 'md' if no value is provided */
  size?: AVATAR_SIZES;
  /** Defaults to '4' if no value is provided */
  count?: number;
  /** Used if an appended cell is applied */
  onClick?: () => void;
}
