import { faker } from "@faker-js/faker";
import { generatePerson, Person } from "../Person";

export interface VehicleAudit {
  id: string;

  eventType: string;
  oldValue: string;
  newValue: string;
  message: string;
  createdAt: string;
  user: Person;
}

export const sampleAudit: VehicleAudit[] = [
  {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    eventType: "SPEC_CHANGE",
    oldValue: "",
    newValue: "",
    message: "",
    createdAt: "string",
    user: generatePerson("employee"),
  },
];
