import { BreadCrumb } from "../BreadCrumbs";

export enum SCREEN_WIDTH {
  ultra,
  full,
  regular,
}
export interface PageProperties {
  children: React.ReactNode;
  isLoading: boolean;
  documentTitle: string;
  fullWidth?: SCREEN_WIDTH;
  hasPadding?: boolean;
  bgColor?: string;
  showFooter?: boolean;
  loaderText?: string;
  breadCrumbs?: BreadCrumb[];
  showHeader?: boolean;
}
