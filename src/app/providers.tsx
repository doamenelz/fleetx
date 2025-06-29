"use client";

import { RootContext } from "@/context/RootContext";
import {
  PageLoader,
  PrimaryNavigation,
  SecondaryNavigation,
  SidebarLayout,
} from "@/components";
import { useEffect, useState, useRef } from "react";
import { UserStore } from "@/models/UserStore";
import { TemplateLayout } from "@/components/TemplateLayout";

import { apiHandler } from "@/lib/utilities/apiHelper";
import { Toaster } from "@/components/ui/toaster";
import appSettings from "../models/sample/appSettings.json";
import { AppSettings } from "@/models";
import { sampleOfficeLocations } from "@/models/Location";
import { usePathname, useRouter } from "next/navigation";
import LoginPage from "./login/page";
import { checkAuthentication } from "@/models/Shared/AuthHelper";
import { useMounted } from "@/lib/hooks/useMounted";
import { getCompanyProfile } from "@/models/Shared/Configs";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const isMounted = useMounted();
  const [documentTitle, setDocumentTitle] = useState("");
  const [navTitle, setNavTitle] = useState("");
  const [notificationCopy, setNotificationCopy] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [generalConfig, setGeneralConfig] = useState();
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
    const _user = await checkAuthentication();

    if (!_user.isLoggedIn) {
      setStore(_user);
      router.push("/login");
      console.log("I am routing to login...");
    } else {
      setStore(_user);
      getConfigurations();
    }
  }

  const getConfigurations = async () => {
    const settings = appSettings as AppSettings;
    settings.officeLocations = sampleOfficeLocations();
    sessionStorage.setItem("app_settings", JSON.stringify(settings));
    const api = await apiHandler({
      url: `${envVar.baseURL}/configurations`,
      method: "GET",
    });

    console.log("Calling Configurations");
    if (api.success) {
      let response = api.data as any;
      sessionStorage.setItem("configurations", JSON.stringify(response));
    } else {
      //TODO: Show Error Component
      console.log("Getting Config List Failed");
    }
  };

  useEffect(() => {
    getStoreProps();
  }, [pathName]);

  useEffect(() => {
    ref.current = document.getElementById("modal");
    // getStoreProps();

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
        store: store,
        updateStore: setStore,
        envVar: envVar,
        configuration: generalConfig,
      }}
    >
      {isMounted ? (
        <>
          {store === undefined ? (
            <>
              <PageLoader
                size="lg"
                label="Loading.."
              />
            </>
          ) : (
            <>
              {store.isLoggedIn ? (
                <SidebarLayout>{children}</SidebarLayout>
              ) : (
                <LoginPage />
              )}

              <Toaster />
            </>
          )}
        </>
      ) : (
        <PageLoader
          size="lg"
          label="Loader"
        />
      )}
    </RootContext.Provider>
  );
}
