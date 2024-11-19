import { Vehicle } from "@/models";
import React from "react";
export const VehicleDetailsContext = React.createContext<{
  vehicle?: Vehicle;
  setVehicle: Function;
}>({ setVehicle: () => {} });
