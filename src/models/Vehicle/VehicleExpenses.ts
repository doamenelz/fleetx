import { faker } from "@faker-js/faker";
import { generatePerson, Person } from "../Person";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";

export interface VehicleExpenses {
  id: string;
  dateReported: string;
  type: string;
  summary: string;
  reportedBy: Person;
  operator?: Person;
  vendorId: string;
  notes: string;
  status: string; //paid etc
  paymentInformation?: {}; //approval status, payment type
  additionalInformation?: {};
  cost: {
    approvedAmount: string;
    spentAmount: string;
  };
}

const generateExpense = (type: string, status: string, summary: string) => {
  return {
    id: faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    }),
    dateReported: formatDate(
      new Date(faker.date.past({ years: 1 })),
      DATE_OPTIONS.full
    ).toString(),

    type: type.toUpperCase(),
    summary: summary,
    reportedBy: generatePerson("employee"),
    operator: generatePerson("employee"),
    vendorId: faker.company.name(),
    notes: faker.lorem.words(19),
    status: status,
    cost: {
      approvedAmount: "",
      spentAmount: faker.commerce.price({ symbol: "$" }),
    },
    additionalInformation: {},
    paymentInformation: {},
  };
};

export const sampleVehicleExpenses: VehicleExpenses[] = [
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
