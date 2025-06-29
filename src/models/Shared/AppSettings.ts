import { LocationFleet } from "../Location";

export interface AppSettings {
  fault: {
    severity: string[];
    types: string[];
  };
  trip: {
    class: string[];
  };
  officeLocations: LocationFleet[];
}

export const getConfigurations = (category: string) => {
  const data = sessionStorage.getItem("configurations");
  const parsedData = data ? JSON.parse(data) : null;
  let config: any;
  parsedData?.forEach((item: any) => {
    if (item.type === category) {
      config = item;
    }
  });

  return config;
};

export interface FAULT_CONFIG {
  type: string;
  severity: string[];
  types: string[];
}
