import { Person } from "../Person";

export interface VehicleExpenses {
  id: string;
  dateReported: string;
  type: string;
  summary: string;
  reportedBy: Person;
  custodian: Person;
  vendor: string;
  cost: {
    approvedAmount: string;
    spendAmount: string;
  };
}
