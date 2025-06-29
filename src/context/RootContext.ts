import React from "react";
import { Company } from "@/models/Company";
import { UserStore } from "@/models/UserStore";
import { User } from "@/models/Shared/User";
export const RootContext = React.createContext<{
  company?: Company;
  documentTitle: string;
  updateDocumentTitle: Function;
  navTitle: string;
  updateNavTitle: Function;
  showNotification: boolean;
  toggleNotification: Function;
  notificationType?: "success" | "error";
  notificationHeader: string;
  notificationCopy?: string;
  setNotificationHeader: Function;
  setNotificationCopy?: Function;
  setNotificationType: Function;
  store?: UserStore;
  updateStore: Function;
  envVar: { baseURL: string };
  configuration: any;
  // user?: User;
  // setUser: (user: User) => void;
  // browserStore: StoredItems;
  // updateStore: Function;
}>({
  documentTitle: "Login",
  navTitle: "Login",
  updateNavTitle: () => {},
  updateDocumentTitle: () => {},
  showNotification: false,
  notificationType: "success",
  toggleNotification: () => {},
  notificationHeader: "",
  setNotificationHeader: () => {},
  notificationCopy: "",
  setNotificationType: () => {},
  updateStore: () => {},
  envVar: { baseURL: "" },
  store: { isLoggedIn: false, lastLoginDate: "" },
  configuration: "",
  // setUser: () => {},
});
