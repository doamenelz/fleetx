import { faker } from "@faker-js/faker";
export interface VehicleFinanceDetails {
  id: string;
  ownerType: string;
  vehicleNumber: string;
  purchaseCost: string;
  financeType: string;
  monthlyPayment: string;
  paymentSchedule: string;
  outstandingPayment: string;
  loanPrincipal?: string;
  downPayment?: string;
  startDate: string;
  endDate: string;
  borrowRate: string;
  mileagePerYear: string;
  thisYearMileage: string;
  notes: string;
  contractNumber: string;
  saleDetails?: {};
  insurance: string;
  lastOdometer: string;
  lastUpdated: string;
  estimatedValue?: string;
  depreciationRate?: string;
  depreciationMileage?: string;
  depreciationDuration?: string;
}

export const sampleFinance: VehicleFinanceDetails = {
  id: faker.string.alphanumeric({
    length: 9,
    exclude: ["a"],
    casing: "upper",
  }),
  ownerType: "used",
  vehicleNumber: faker.vehicle.vrm(),
  purchaseCost: "$25,543.67",
  financeType: "lease",
  loanPrincipal: "$25,543.67",
  downPayment: "$2,000.00",
  monthlyPayment: "$245 / month",
  paymentSchedule: "monthly",
  outstandingPayment: "$8,523.55",
  startDate: "23 Aug, 2020",
  endDate: "23 Aug, 2027",
  borrowRate: "5% APR",
  mileagePerYear: "15,000 km",
  thisYearMileage: "12,943 km",
  notes: faker.lorem.paragraph(),
  contractNumber: faker.string.alphanumeric({
    length: 6,
    exclude: ["a"],
    casing: "upper",
  }),
  saleDetails: {},
  insurance: "$3,454 /year | $150 /month",
  lastOdometer: "125,000 km",
  lastUpdated: "23 Aug, 2024",
  estimatedValue: "$11,456.66",
  depreciationRate: "14.5%",
  depreciationDuration: "5 years",
  depreciationMileage: "120,000km",
};
