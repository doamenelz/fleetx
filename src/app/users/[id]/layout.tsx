"use client";
import { usePathname } from "next/navigation";
import ReactDOM from "react-dom";
import {
  Avatar,
  AVATAR_SIZES,
  Button,
  PageContainer,
  SCREEN_WIDTH,
  Spinner,
  Tabs,
  BUTTON_SKIN,
  IconDropdown,
  ICON_POSITION,
  ModalBackdrop,
  SlideOutWrapper,
  CenterCardModal,
  NOTIFICATION_TYPE,
  SectionHeader,
  ModalHeader,
  IconButton,
} from "@/components";
import { useContext, useEffect, useState } from "react";
import {
  showNotification,
  simulateLoader,
} from "@/lib/utilities/helperFunctions";
import { useRouter } from "next/navigation";
import { ModuleContainerContext } from "@/context/ModuleContainerContext";

import { BreadCrumb } from "@/components";
import { Person } from "@/models/Person";
import { sampleUsers } from "../page";
import {
  ChevronDown,
  CircleX,
  Icon,
  UserCog,
  UserPen,
  UserRoundCheck,
  UserRoundMinus,
  X,
} from "lucide-react";
import { EditUserFormView } from "../components/EditUserFormView";
import { RootContext } from "@/context/RootContext";
import { API_HEADERS, apiHandler } from "@/lib/utilities/apiHelper";
import { UserContext } from "./userContext";
const tabs = (loc: string) => {
  return [
    {
      name: "General",
      href: `/users/${loc.split("/")[2]}`,
      id: "1",
    },
    {
      name: "Files",
      href: `/users/${loc.split("/")[2]}/files`,
      id: "2",
    },
  ];
};

export const userPageBreadcrumbs = (loc: string, id: string) => {
  var _breadCrumbs: BreadCrumb[] = [
    { id: "001", name: loc.split("/")[2], href: "" },
  ];

  _breadCrumbs.push(tabs(loc).find((breadC) => breadC.id === id)!);
  return _breadCrumbs;
};

export default function UserDetailsLayout({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  //   const loc = location.pathname.split("/");
  const loc = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [modalType, setModalType] = useState<
    "edit_user" | "activate_user" | "deactivate_user" | "reset_password"
  >("activate_user");
  const [selectedUser, setSelectedUser] = useState<Person>();

  const [selectedTab, setSelectedTab] = useState<string>(loc);
  const rootContext = useContext(RootContext);

  const getUserInformation = async () => {
    console.log(rootContext.envVar.baseURL);

    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/users/${loc.split("/")[2]}`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    console.log(loc.split("/")[2]);

    if (api.success) {
      console.log(api);
      const apiCompletion = (await api.data.user) as Person;
      console.log(`Completion is ${apiCompletion.avatar}`);
      setSelectedUser(apiCompletion);

      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("Failed");
      showNotification(
        NOTIFICATION_TYPE.error,
        "Something went wrong",
        api.errorMessage ?? "",
        rootContext
      );
    }
  };
  useEffect(() => {
    setSelectedTab(loc);
    getUserInformation();
  }, [loc]);

  const tabHandler = (tabId: string) => {
    setSelectedTab(tabId);
  };

  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <PageContainer
      documentTitle={`Users - ${loc.split("/")[2]}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={userPageBreadcrumbs(loc, "1")}
    >
      {isLoading ? (
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting User Details.." }} />
        </div>
      ) : (
        <UserContext.Provider
          value={{
            setUser: setSelectedUser,
            details: selectedUser,
          }}
        >
          <div className="sticky top-12 w-full bg-white z-10">
            <div className="flex justify-between items-center gap-4 py-3 pl-3 pr-4 bg-gradient-to-r from-gray-25 via-gray-50  to-brand-tan">
              <div className="flex items-center gap-4">
                <Avatar
                  firstName={selectedUser?.firstName ?? ""}
                  lastName={selectedUser?.lastName ?? ""}
                  size={AVATAR_SIZES.xl}
                  imageUrl={selectedUser?.avatar}
                />
                <div className="py-4">
                  <p className="items-center flex gap-2 font-semibold text-gray-900 text-2xl">
                    {selectedUser?.name}{" "}
                  </p>
                  <p className="text-xs text-slate-700">#{selectedUser?.id}</p>
                </div>
              </div>

              <IconDropdown
                items={[
                  {
                    id: "1",
                    label: "Edit User",
                    function: () => {
                      setModalType("edit_user");
                      showModalHandler();
                    },
                    icon: <UserPen className="w-3 h-3" />,
                  },
                  {
                    id: "2",
                    label:
                      selectedUser?.status === "Active"
                        ? "Deactivate User"
                        : "Activate User",
                    function: () => {
                      selectedUser?.status === "Active"
                        ? setModalType("deactivate_user")
                        : setModalType("activate_user");

                      showModalHandler();
                    },
                    icon:
                      selectedUser?.status === "Active" ? (
                        <UserRoundMinus className="w-3 h-3" />
                      ) : (
                        <UserRoundCheck className="w-3 h-3" />
                      ),
                  },
                  {
                    id: "3",
                    label: "Reset User Password",
                    function: () => {
                      setModalType("reset_password");
                      showModalHandler();
                    },
                    icon: <UserCog className="w-3 h-3" />,
                  },
                ]}
                button={
                  <Button
                    label="Manage User"
                    icon={{
                      position: ICON_POSITION.trailing,
                      asset: <ChevronDown className="w-4 h-4" />,
                    }}
                  />
                }
              />
            </div>

            <Tabs
              tabs={tabs(loc)}
              tabHandler={tabHandler}
              selectedTab={selectedTab}
            >
              <></>
            </Tabs>
          </div>
          {children}
        </UserContext.Provider>
      )}
      <>
        <ModalBackdrop selector="modal">
          {(modalType === "activate_user" ||
            modalType === "deactivate_user") && (
            <CenterCardModal
              closeControl={showModalHandler}
              openControl={showModal}
              size="dialog"
            >
              <div className="">
                <div className="sm:flex sm:items-start">
                  {modalType === "deactivate_user" ? (
                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success-100 sm:mx-0 sm:h-10 sm:w-10">
                      <UserRoundMinus className="size-6" />
                    </div>
                  ) : (
                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success-100 sm:mx-0 sm:h-10 sm:w-10">
                      <UserRoundCheck className="size-6" />
                    </div>
                  )}
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <p className="font-medium">
                      {modalType === "deactivate_user"
                        ? `Deactivate ${selectedUser?.name}'s Profile`
                        : `Activate ${selectedUser?.name}'s Profile`}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {`Are you sure you want to ${
                          selectedUser?.status === "Active"
                            ? "Deactivate"
                            : "Activate"
                        } this account?.`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex gap-2 sm:flex-row-reverse">
                  {modalType === "deactivate_user" ? (
                    <Button label={"Deactivate User"} destructive />
                  ) : (
                    <Button label={"Activate User"} />
                  )}

                  <Button
                    label="Cancel"
                    skin={BUTTON_SKIN.secondary}
                    onClick={() => setShowModal(false)}
                  />
                </div>
              </div>
            </CenterCardModal>
          )}

          {modalType === "reset_password" && (
            <CenterCardModal
              closeControl={showModalHandler}
              openControl={showModal}
              size="dialog"
            >
              <div className="">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success-100 sm:mx-0 sm:h-10 sm:w-10">
                    <UserCog className="size-6" />
                  </div>

                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <p className="font-medium">
                      {`Reset Password ${selectedUser?.name}'s Password`}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {`An email will be sent to ${selectedUser?.email} with the reset instructions`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex gap-2 sm:flex-row-reverse">
                  <Button label={"Reset Password"} />

                  <Button
                    label="Cancel"
                    skin={BUTTON_SKIN.secondary}
                    onClick={() => setShowModal(false)}
                  />
                </div>
              </div>
            </CenterCardModal>
          )}

          {modalType === "edit_user" && (
            <SlideOutWrapper
              closeControl={showModalHandler}
              openControl={showModal}
              size="max"
            >
              <div className="">
                <ModalHeader
                  title={`Edit User`}
                  copy={selectedUser?.id}
                  button={
                    <IconButton
                      onClick={() => {
                        setShowModal(false);
                      }}
                      skin=""
                      icon={
                        <X className="h-8 w-8 p-2 hover:bg-gray-100 hover:text-gray-800 rounded-full bg-white/20 backdrop-blur-sm text-white" />
                      }
                    />
                  }
                />
                <EditUserFormView user={selectedUser!} />
              </div>
            </SlideOutWrapper>
          )}
        </ModalBackdrop>
      </>
    </PageContainer>
  );
}
