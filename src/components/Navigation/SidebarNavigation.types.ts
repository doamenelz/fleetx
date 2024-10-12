export type NavSearchAction = {
  id: string;
  label: string;
  url: string;
  icon: JSX.Element;
};

export interface NavigationProps {
  label: string;
  link: string;
  id: string;
  category?: "company" | "personal" | "admin" | "executive";
  description?: string;
  children?: NavigationProps[];
  icon?: JSX.Element;
  fillIcon?: JSX.Element;
  notificationCount?: number;
  sideBarIsOpen?: boolean;
  searchActions?: NavSearchAction[];
  dark?: boolean;
}
