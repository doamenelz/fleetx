"use client";

import {
  BasicTextInput,
  Button,
  EmailInput,
  NOTIFICATION_TYPE,
  PageLoader,
} from "@/components";
import { useContext, useState } from "react";
import { SignedInObject } from "./loginInputModel";
import { showNotification } from "@/lib/utilities/helperFunctions";
import { useRouter } from "next/navigation";
import { API_HEADERS, apiHandler } from "@/lib/utilities/apiHelper";
import { UserStore } from "@/models/UserStore";
import { RootContext } from "@/context/RootContext";
import { User } from "@/models";
import { Constants } from "@/models/Shared/Constants";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [password, setPassword] = useState("kajola");
  const [username, setUsername] = useState("june@email.com");
  const [showModal, setShowModal] = useState(false);
  const rootContext = useContext(RootContext);
  const { toast } = useToast();

  const router = useRouter();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowModal(true);

    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/auth/login`,
      method: "POST",
      body: JSON.stringify({
        username: "june@email.com", //username,
        password: "kajola", //password,
      }),
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      const apiCompletion = (await api.data) as SignedInObject;
      const store = {
        isLoggedIn: true,
        user: apiCompletion.profile as User,
        lastLoginDate: apiCompletion.lastLogin ?? new Date().toISOString(),
      } as UserStore;
      sessionStorage.setItem(Constants.STORE, JSON.stringify(store));
      router.push("/home");
      setShowModal(false);
    } else {
      setShowModal(false);
      toast({
        title: "Login Failed",
        description: api.errorMessage,
        className: "text-red-700",
      });
    }
  };
  return (
    <div className="">
      <div className="flex items-center h-screen justify-center  p-4  bg-[conic-gradient(var(--tw-gradient-stops))] from-black via-brand-black to-brand-black fixed inset-0">
        <div className="bg-white p-4 backdrop-blur-sm rounded-md shadow w-96 ">
          <img
            src="./fleetShort.svg"
            className="h-16 w-16 mx-auto"
          />
          <form
            className=" p-4 w-full space-y-4 text-xs"
            onSubmit={loginHandler}
            encType="multipart/form-data"
            id="loginForm"
          >
            <EmailInput
              label="Username"
              id="username"
              required
              placeholder="Enter your Email"
              value={username}
              onChangeHandler={(event: React.FormEvent<HTMLInputElement>) => {
                setUsername(event.currentTarget.value);
              }}
            />
            <BasicTextInput
              label="Password"
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChangeHandler={(event: React.FormEvent<HTMLInputElement>) => {
                setPassword(event.currentTarget.value);
              }}
            />
            <Button
              label="Login"
              fillWidth
              type="submit"
            />
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
