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
  isCurrent: boolean;
}

export const sampleVehicleAssignmentArray: VehicleAssignment[] = [
  {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    startDate: "23 Aug, 2024",
    endDate: "-",
    odometerStart: "115,555km",
    odometerEnd: "175,000km",
    custodian: generatePerson("Employee"),
    previousCustodian: generatePerson("Employee"),
    isCurrent: true,
  },
  {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    startDate: "23 Mar, 2024",
    endDate: "22 Aug, 2024",
    odometerStart: "100,000km",
    odometerEnd: "115,550km",
    custodian: generatePerson("Employee"),
    previousCustodian: generatePerson("Employee"),
    isCurrent: false,
  },
  {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    startDate: "01 Jan, 2024",
    endDate: "20 Mar, 2024",
    odometerStart: "75,000km",
    odometerEnd: "99,990km",
    custodian: generatePerson("Employee"),
    previousCustodian: generatePerson("Employee"),
    isCurrent: false,
  },
];
