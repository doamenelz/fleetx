import React from "react";
import { Company } from "@/models/Company";
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
});
