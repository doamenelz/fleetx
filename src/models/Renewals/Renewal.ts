import { CreateModifyEntry } from "../Shared";

export interface Renewal {
  id: string;
  vehicleId: string;
  log: CreateModifyEntry;
  name: string;
  dueDate: string;
  status: string;
  cost?: any;
  frequency: string; //monthly, bi-weekly, quarterly, annually
}

export enum renewal_status {
  new = "new",
  completed = "completed",
  cancelled = "cancelled",
}
