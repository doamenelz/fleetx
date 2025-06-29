import { APICompletion } from "@/lib/utilities/apiHelper";
import { Vehicle } from "@/models";
import React from "react";
export const HomeContext = React.createContext<{
  userVehicles: Vehicle[];
  setUserVehicles: (vehicles: Vehicle[]) => void;
  getFaults: () => void;
  faultCompletion?: APICompletion;
  getTrips: () => void;
  tripCompletion?: APICompletion;
}>({
  userVehicles: [],
  setUserVehicles: () => {},
  getFaults: () => {},
  getTrips: () => {},
});
