import { Person } from "@/models/Person";
import React from "react";
export const UserContext = React.createContext<{
  details?: Person;
  setUser: Function;
}>({
  setUser: () => {},
});
