import { Person } from "../Person";

export interface VehicleIssues {
  id: string;
  type: string; //issues or faults
  summary: string;
  status: string;
  reportedBy: string;
  reportedDate: Person;
  assignedTo: Person;
  priority: string;
  additionalNotes: string;
}
