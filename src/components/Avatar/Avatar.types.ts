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
}
