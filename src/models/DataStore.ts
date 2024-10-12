import React from "react";
import { Company } from "./Company";

export const Store = React.createContext<{
  baseUrl: string;
  company?: Company;
  apiKey: string;
  code?: string;
  showNotification: boolean;
  setShowNotification: Function;
  notificationStatus?: boolean;
  setNotificationStatus: Function;
  notificationCopy?: string;
  setNotificationCopy?: Function;
  notificationHeader: string;
  setNotificationHeader: Function;
  setCompany: Function;
}>({
  baseUrl: "",
  apiKey: "",
  showNotification: false,
  notificationStatus: false,
  setShowNotification: () => {},
  notificationCopy: "",
  setNotificationStatus: () => {},
  setNotificationCopy: () => {},
  setCompany: () => {},
  notificationHeader: "",
  setNotificationHeader: () => {},
});
