import { generatePerson, Person } from "../Person";
import { faker } from "@faker-js/faker";
export interface VehicleAssignment {
  id: string;
  custodian: Person;
  previousCustodian: Person;
  startDate: string;
  endDate: string;
  odometerStart: string;
  odometerEnd: string;
}

export const sampleVehicleAssignmentArray: VehicleAssignment[] = [
  {
    id: "001",
    startDate: "23 Aug, 2024",
    endDate: "31 Dec, 2024",
    odometerStart: "115,555km",
    odometerEnd: "175,000km",
    custodian: generatePerson("Employee"),
    previousCustodian: generatePerson("Employee"),
  },
  {
    id: "002",
    startDate: "23 Mar, 2024",
    endDate: "22 Aug, 2024",
    odometerStart: "100,000km",
    odometerEnd: "115,550km",
    custodian: generatePerson("Employee"),
    previousCustodian: generatePerson("Employee"),
  },
  {
    id: "003",
    startDate: "01 Jan, 2024",
    endDate: "20 Mar, 2024",
    odometerStart: "75,000km",
    odometerEnd: "99,990km",
    custodian: generatePerson("Employee"),
    previousCustodian: generatePerson("Employee"),
  },
];
