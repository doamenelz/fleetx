import { Employee } from "@/models";

export interface JobHistoryEvent {
  id: string;
  activity: string;
  date: string;
  role: string;
  lineManager: Employee;
  attachment: string;
}
