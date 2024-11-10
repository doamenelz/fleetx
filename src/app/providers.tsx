"use client";

import { RootContext } from "@/context/RootContext";
import {
  PageLoader,
  PrimaryNavigation,
  SecondaryNavigation,
  SidebarLayout,
  TopHeaderNavigation,
} from "@/components";
import { useEffect, useState, useRef } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { getUserStore, UserStore } from "@/models/UserStore";
import { TemplateLayout } from "@/components/TemplateLayout";
import { usePathname, useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const router = useRouter();
  const [documentTitle, setDocumentTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [navTitle, setNavTitle] = useState("");
  const [notificationCopy, setNotificationCopy] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [envVar, setEnvVar] = useState<{ baseURL: string }>({
    // baseURL: "http://192.168.2.203:8080",
    baseURL: "http://localhost:8080",
  });
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [notificationHeader, setNotificationHeader] = useState("");
  const [store, setStore] = useState<UserStore>();

  const getBaseURL = () => {
    const _link = [...PrimaryNavigation, ...SecondaryNavigation].find((nav) =>
      location.pathname.includes(nav.link)
    );

    return _link?.label ?? "";
  };

  const ref = useRef<Element | null>(null);

  async function getStoreProps() {
    var userStore = getUserStore();
    setStore(userStore);
    if (!userStore?.isLoggedIn) {
      router.push("/login");
      console.log("Im routing to login");
    }
  }

  useEffect(() => {
    ref.current = document.getElementById("modal");
    setNavTitle(getBaseURL());
    getStoreProps();
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
        store: store,
        updateStore: setStore,
        envVar: envVar,
      }}
    >
      {store === undefined ? (
        <>
          <PageLoader
            size="lg"
            label="Loading..xx"
          />
        </>
      ) : (
        <>
          {/* <p>Hello</p> */}
          {store.isLoggedIn && <SidebarLayout>{children}</SidebarLayout>}

          {!store.isLoggedIn && <TemplateLayout>{children}</TemplateLayout>}
        </>
      )}

      {/* <NextUIProvider>
       
      </NextUIProvider> */}
    </RootContext.Provider>
  );
}
