import { Person } from "./Person";

export enum USER_TYPE {
  citizen,
  agent,
  admin,
  donor,
}
export interface UserConfig {
  isLoggedIn: boolean;
  type: "citizen" | "agent" | "admin" | "donor";
  id: string;

  user?: Person;
}

export interface UserStore {
  isLoggedIn: boolean;
  user?: Person;
  type?: USER_TYPE;
  lastLoginDate: string;
}

export const getUserStore = (): UserStore => {
  const savedUser = localStorage.getItem("userStore");

  if (savedUser !== null) {
    const user: UserStore = JSON.parse(savedUser);
    return user;
  } else {
    return {
      isLoggedIn: false,
      lastLoginDate: "",
    } as UserStore;
  }
};
