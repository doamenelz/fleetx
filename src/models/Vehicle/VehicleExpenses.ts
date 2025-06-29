import { faker } from "@faker-js/faker";
import { generatePerson, Person } from "../Person";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { Odometer } from "../Shared/OdometerReading";
import { Decision } from "../Shared/Decision";

export interface VehicleExpenseSummary {
  summary: {
    total: string;
    fuel: string;
    service: string;
    others: string;
  };
  data: VehicleExpenseEntry[];
}
export interface VehicleExpenseEntry {
  id: string;
  vehicleId: string;
  type: string;
  summary: string;
  reportedBy: string;
  assignedOwner?: string;
  assignedTeam?: string;
  operator?: string;
  vendorId?: string;
  log?: {
    createdBy: string;
    createdAt: string;
    lastUpdatedAt: string;
    lastUpdatedBy: string;
  };
  notes?: string;
  expenseDate: string;
  odometer: Odometer;
  fuel?: number;
  status: string; //paid etc
  paymentInformation?: {}; //approval status, payment type
  additionalInformation?: {};
  cost: {
    approvedAmount?: number;
    // spentAmount?: string;
    reportedAmount: number;
  };
  decision?: Decision[];
}

export enum EXPENSE_TYPES {
  FUEL = "fuel",
  SERVICE = "service",
  OTHERS = "others",
}
const generateExpense = (type: string, status: string, summary: string) => {
  return {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    vehicleId: "VEH1000009",
    type: type.toUpperCase(),
    summary: summary,
    reportedBy: generatePerson("employee").id,

    operator: generatePerson("employee").id,
    vendorId: faker.company.name(),
    notes: faker.lorem.words(19),
    expenseDate: new Date(faker.date.past({ years: 1 })).toISOString(),
    odometer: {
      value: 1000,
      unit: "km",
    },
    status: status,
    paymentInformation: {},
    additionalInformation: {},
    cost: {
      approvedAmount: faker.datatype.number({ min: 50, max: 500 }),
      reportedAmount: faker.datatype.number({ min: 50, max: 500 }),
    },
  };
};

export const sampleVehicleExpenses: VehicleExpenseEntry[] = [
  generateExpense("fuel", "pending", "Fuel Refill"),
  generateExpense("fuel", "pending", "Gas Refuel"),
  generateExpense("fuel", "paid", "Gas Refill"),
  generateExpense("service", "paid", "8,000km Oil Check"),
  generateExpense("subscription", "declined", "407 Toll Renewal"),
  generateExpense("fuel", "declined", "Gas Refill"),
  generateExpense("parts", "paid", "Cleaning Materials"),
  generateExpense("parts", "paid", "Winter Tires"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),

  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
  // generateExpense("fuel", "paid"),
];
