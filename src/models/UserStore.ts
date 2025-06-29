import { constants } from "buffer";
import { Person } from "./Person";
import { User } from "./Shared";
import { Constants } from "./Shared/Constants";

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
  user?: User;
  type?: USER_TYPE;
  lastLoginDate: string;
}
