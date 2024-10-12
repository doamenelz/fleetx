import {
  Employee,
  genEmpName,
  generateRandomEmployee,
  sampleEmployee,
  sampleEmployeeList,
} from "@/models";
import { faker } from "@faker-js/faker";

export interface TimeOffDetails {
  id: string;
  name: string;
  type: string;
  startDate: string;
  numberOfDays: number;
  endDate: string;
  resumption: string;
  approvalStatus: string;
  reliefOfficer?: Employee;
  employee: Employee;
}

export const sampleTimeOffDetailsArray: TimeOffDetails[] = [
  {
    id: "1",
    type: "annual-leave",
    name: "Annual Leave",
    startDate: "2024-07-02T00:00:00.000Z",
    numberOfDays: 1,
    endDate: "2024-07-03T00:00:00.000Z",
    resumption: "2024-07-03T00:00:00.000Z",
    approvalStatus: "Approved",
    reliefOfficer: sampleEmployeeList[1],
    employee: sampleEmployee,
  },
  {
    id: "2",
    type: "compassionate",
    name: "Compassionate Leave",
    startDate: "2024-08-02T00:00:00.000Z",
    numberOfDays: 1,
    endDate: "2024-08-03T00:00:00.000Z",
    resumption: "2024-08-03T00:00:00.000Z",
    approvalStatus: "Pending",
    employee: sampleEmployee,
  },
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const generateTimeOff = (sex: "male" | "female") => {
  return {
    id: faker.string.alphanumeric({ length: 5 }),
    type: "annual-leave",
    name: "Annual Leave",
    numberOfDays: 1,
    resumption: `${faker.date.between({
      from: `${currentYear}-${("0" + currentMonth).slice(-2)}-29T00:00:00.000Z`,
      to: `${currentYear}-${("0" + currentMonth).slice(-2)}-30T00:00:00.000Z`,
    })}`,
    startDate: `${faker.date.between({
      from: `${currentYear}-${("0" + currentMonth).slice(-2)}-07T00:00:00.000Z`,
      to: `${currentYear}-${("0" + currentMonth).slice(-2)}-15T00:00:00.000Z`,
    })}`,
    endDate: `${faker.date.between({
      from: `${currentYear}-${("0" + currentMonth).slice(-2)}-28T00:00:00.000Z`,
      to: `${currentYear}-${("0" + currentMonth).slice(-2)}-28T00:00:00.000Z`,
    })}`,
    approvalStatus: "Approved",
    employee: generateRandomEmployee(
      genEmpName(sex),
      sex,
      teams[Math.floor(Math.random() * (2 - 0)) + 1]
    ),
  };
};

const teams: string[] = ["IT", "Architecture", "Genesis"];

export const sampleCalendarEmployee: TimeOffDetails[] = [
  generateTimeOff("female"),
  generateTimeOff("male"),
  generateTimeOff("male"),
  generateTimeOff("female"),
  generateTimeOff("female"),
  generateTimeOff("male"),
  generateTimeOff("female"),
  generateTimeOff("male"),
  generateTimeOff("female"),
  generateTimeOff("female"),
  generateTimeOff("male"),
  generateTimeOff("female"),
  generateTimeOff("male"),
  generateTimeOff("male"),
];
