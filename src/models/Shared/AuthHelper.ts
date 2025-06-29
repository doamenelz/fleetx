import { UserStore } from "../UserStore";
import { Constants } from "./Constants";

export const checkAuthentication = async () => {
  console.log("Calling Check Authentication");
  const savedUser = sessionStorage.getItem(Constants.STORE);

  if (savedUser !== null) {
    const user: UserStore = await JSON.parse(savedUser);

    return user;
  } else {
    return {
      isLoggedIn: false,
      lastLoginDate: "",
    } as UserStore;
  }
};
