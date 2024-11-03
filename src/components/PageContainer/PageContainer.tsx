"use client";
import { Lbl, PageLoader, ScrollToTop } from "../../components";
import { FC, Suspense, useContext, useEffect } from "react";
import { PageContainerContext } from "./PageContainerContext";
import { Transition } from "@headlessui/react";
// import { lineWobble } from "ldrs";
import { PageProperties, SCREEN_WIDTH } from "./PageContainer.types";
import { classNames } from "@/lib/utilities/helperFunctions";
import { FlexLogoFull, FlexLogoFullLight } from "@/assets";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { LoaderCircle } from "lucide-react";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";

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
  useEffect(() => {
    document.title = `fleetX | ${props.documentTitle}`;
    moduleContainerContext.setShowHeader(props.showHeader);
    moduleContainerContext.setBreadCrumbs(props.breadCrumbs);
  }, []);

  const _fullWidth = props.fullWidth;
  const _hasPadding = props.hasPadding;

  return (
    <Suspense fallback={<p>....loading</p>}>
      <PageContainerContext.Provider
        value={{
          isLoading: props.isLoading,
          updateIsLoading: () => {},
        }}
      >
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
              <ScrollToTop />
              {props.children}
            </div>
          </Transition>
        )}
      </PageContainerContext.Provider>
    </Suspense>
  );
};
