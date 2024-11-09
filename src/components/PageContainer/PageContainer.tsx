"use client";
import { Lbl, PageLoader, ScrollToTop } from "../../components";
import { FC, Suspense, useContext, useEffect, useState } from "react";
import { PageContainerContext } from "./PageContainerContext";
import { Transition } from "@headlessui/react";
// import { lineWobble } from "ldrs";
import { PageProperties, SCREEN_WIDTH } from "./PageContainer.types";
import { classNames, simulateLoader } from "@/lib/utilities/helperFunctions";
import { FlexLogoFull, FlexLogoFullLight } from "@/assets";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { LoaderCircle } from "lucide-react";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";
import { redirect, usePathname, useRouter } from "next/navigation";
import { getUserStore } from "@/models/UserStore";
import { RootContext } from "@/context/RootContext";

export const setScreenWidth = (width: SCREEN_WIDTH) => {
  switch (width) {
    case SCREEN_WIDTH.regular:
      return "max-w-7xl mx-auto";
    case SCREEN_WIDTH.ultra:
      return "max-w-exd mx-auto";
    case SCREEN_WIDTH.full:
      return "w-full mx-auto";

    default:
      return "max-w-7xl mx-auto";
  }
};

export const PageContainer: FC<PageProperties> = (props) => {
  const moduleContainerContext = useContext(ModuleContainerContext);
  const rootContext = useContext(RootContext);
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    var userStore = getUserStore();
    setIsLoggedIn(userStore.isLoggedIn);
    if (userStore?.isLoggedIn) {
      document.title = `fleetX | ${props.documentTitle}`;
      moduleContainerContext.setShowHeader(props.showHeader);
      moduleContainerContext.setBreadCrumbs(props.breadCrumbs);
      rootContext.updateStore(userStore);
      console.log("pathname changed. i am logged in");
    } else {
      console.log("pathname change, I am not logged in");

      router.replace("/login");
      // window.location.reload();

      // router.replace("/login");
    }
  }, []);

  const _fullWidth = props.fullWidth;
  const _hasPadding = props.hasPadding;

  return (
    <PageContainerContext.Provider
      value={{
        isLoading: props.isLoading,
        updateIsLoading: () => {},
        isLoggedIn: isLoggedIn,
      }}
    >
      {rootContext.store?.isLoggedIn ? (
        <>
          {props.isLoading ? (
            <PageLoader size="sm" label={props.loaderText} />
          ) : (
            <Transition
              appear={true}
              show={true}
              enter="transition-opacity ease-in duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <div
                className={classNames(
                  setScreenWidth(_fullWidth ?? SCREEN_WIDTH.full),
                  _hasPadding ? "px-6 mx-auto" : "mx-auto",
                  props.bgColor ? props.bgColor : "",
                  ""
                )}
              >
                {/* <ScrollToTop /> */}
                {props.children}
              </div>
            </Transition>
          )}
        </>
      ) : (
        <PageLoader size="sm"></PageLoader>
      )}
    </PageContainerContext.Provider>
  );
};
