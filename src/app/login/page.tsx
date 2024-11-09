"use client";

import {
  Button,
  CenterCardModal,
  findInputById,
  InputHandler,
  InputObject,
  ModalBackdrop,
  NOTIFICATION_TYPE,
  PageContainer,
  PageLoader,
  SCREEN_WIDTH,
} from "@/components";
import { useContext, useEffect, useState } from "react";
import { LoginInputModel, SignedInObject } from "./loginInputModel";
import { setInputs, showNotification } from "@/lib/utilities/helperFunctions";
import { redirect, useRouter } from "next/navigation";
import { API_HEADERS, apiHandler } from "@/lib/utilities/apiHelper";
import { UserStore } from "@/models/UserStore";
import { RootContext } from "@/context/RootContext";
import { Person } from "@/models/Person";

export default function Page() {
  const [userInfoInput, setUserInfoInput] = useState<InputObject[]>([]);
  const modelInput = LoginInputModel();
  const [showModal, setShowModal] = useState(false);
  const rootContext = useContext(RootContext);
  const checkRequiredLoginFields = () => {
    return userInfoInput.find(
      (input) => input.required === true && input.stringValue!.length < 3
    );
  };
  const inputHelper = (input: InputObject) => {
    setUserInfoInput(
      userInfoInput.map((item) => {
        if (item.id === input.id) {
          return {
            ...item,
            stringValue: input.stringValue,
            boolValue: input.boolValue,
            // dateValue: input.dateValue,
          };
        } else {
          return item;
        }
      })
    );
  };

  const router = useRouter();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowModal(true);
    console.log(rootContext.envVar.baseURL);

    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/auth/login`,
      method: "POST",
      body: JSON.stringify({
        username: userInfoInput.find((input) => input.id === "username")
          ?.stringValue,
        password: userInfoInput.find((input) => input.id === "password")
          ?.stringValue,
      }),
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      console.log(api);
      const apiCompletion = (await api.data.data) as SignedInObject;
      console.log(`Completion is ${apiCompletion}`);

      switch (apiCompletion.profile.class) {
        case "ADMIN":
          if (apiCompletion.profile.status === "active") {
            const userStore: UserStore = {
              isLoggedIn: true,
              user: apiCompletion.profile as Person,
              lastLoginDate:
                apiCompletion.lastLogin ?? new Date().toISOString(),
            };

            localStorage.setItem("userStore", JSON.stringify(userStore));
            await rootContext.updateStore(userStore);
            router.replace("/users");
          } else {
            showNotification(
              NOTIFICATION_TYPE.error,
              "Unable to log in",
              api.errorMessage ?? "",
              rootContext
            );
          }
          break;
        case "agent":
          break;

        default:
          break;
      }

      // setShowModal(false);
    } else {
      setShowModal(false);
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
    setInputs(modelInput, setUserInfoInput);
  }, []);
  return (
    <div className="">
      <div className="flex items-center h-screen justify-center  p-4  bg-[conic-gradient(var(--tw-gradient-stops))] from-black via-brand-black to-brand-black fixed inset-0">
        <div className="bg-white p-4 backdrop-blur-sm rounded-md shadow w-96 ">
          <img src="./fleetShort.svg" className="h-16 w-16 mx-auto" />
          <form
            className=" p-4 w-full space-y-4"
            onSubmit={loginHandler}
            encType="multipart/form-data"
            id="loginForm"
          >
            <InputHandler
              props={{
                ...findInputById(modelInput, "username")!,
                setValue: inputHelper,
              }}
            />
            <InputHandler
              props={{
                ...findInputById(modelInput, "password")!,
                setValue: inputHelper,
              }}
            />
            <Button label="Login" fillWidth type="submit" />
          </form>
        </div>
      </div>
      {showModal && <PageLoader size="md" />}

      {/* <ModalBackdrop selector="modal">
        <CenterCardModal closeControl={setShowModal} openControl={showModal}>
          <>p</>
        </CenterCardModal>
      </ModalBackdrop> */}
    </div>
  );
}
