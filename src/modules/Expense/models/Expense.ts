import { Employee } from "@/models";

export interface Expense {
  id: string;
  type: string;
  purpose: string;
  requestDate: string;
  status: string;
  statusDescription: string;
  details?: {
    requestor: Employee;
    department: string;
    stage: "pending" | "processed";
    advanced: string;
    currency: string;
    retirement: string;
  };
}
