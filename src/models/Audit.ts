import { faker } from "@faker-js/faker";
import { generatePerson, Person } from "./Person";

export interface Audit {
  id: string;
  eventType: string;
  oldValue?: string;
  newValue?: string;
  message: string;
  createdAt: string;
  status: string;
  user?: Person;
  vehicleId?: string;
  metaData?: {};
}

export const sampleVehicleAudit: Audit[] = [
  {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    eventType: "SPEC_CHANGE",
    oldValue: "4694.20",
    newValue: "1452.34",
    message: "Length (mm) was changed by user",
    createdAt: "23 Aug, 2024 at 10:15am",
    user: generatePerson("employee"),
    status: "success",
  },
  {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    eventType: "SPEC_CHANGE",
    oldValue: "1414.6",
    newValue: "1415.6",
    message: "Height (mm) was changed by user",
    createdAt: "23 Aug, 2024 at 10:15am",
    user: generatePerson("employee"),
    status: "success",
  },
  {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    eventType: "OPERATOR_CHANGE",
    oldValue: "Janet Ford",
    newValue: "Dean Kuphal",
    message: "The Operator was changed by user",
    createdAt: "25 Aug, 2024 at 15:12pm",
    user: generatePerson("employee"),
    status: "success",
  },
];
