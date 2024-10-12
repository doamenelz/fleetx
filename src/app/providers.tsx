"use client";

import { RootContext } from "@/context/RootContext";
import {
  PrimaryNavigation,
  SecondaryNavigation,
  SidebarLayout,
  TopHeaderNavigation,
} from "@/components";
import { useEffect, useState, useRef } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [documentTitle, setDocumentTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [navTitle, setNavTitle] = useState("");
  const [notificationCopy, setNotificationCopy] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [notificationHeader, setNotificationHeader] = useState("");

  const getBaseURL = () => {
    const _link = [...PrimaryNavigation, ...SecondaryNavigation].find((nav) =>
      location.pathname.includes(nav.link)
    );

    return _link?.label ?? "";
  };

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
    setNavTitle(getBaseURL());
  }, []);
  return (
    <RootContext.Provider
      value={{
        documentTitle: documentTitle,
        updateDocumentTitle: setDocumentTitle,
        navTitle: navTitle,
        updateNavTitle: setNavTitle,
        setNotificationHeader: setNotificationHeader,
        notificationHeader: notificationHeader,
        notificationCopy: notificationCopy,
        setNotificationCopy: setNotificationCopy,
        notificationType: notificationType,
        showNotification: showNotification,
        toggleNotification: setShowNotification,
        setNotificationType: setNotificationType,
      }}
    >
      <TopHeaderNavigation>{children}</TopHeaderNavigation>
    </RootContext.Provider>
  );
}
