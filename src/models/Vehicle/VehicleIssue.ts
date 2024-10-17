import { generatePerson, Person } from "../Person";

export interface VehicleIssues {
  id: string;
  summary: string;
  status: string;
  reportedBy: Person;
  reportedDate: string;
  assignedTo: Person;
  priority: string;
  additionalNotes: string;
}

export const sampleVehicleIssues: VehicleIssues[] = [
  {
    id: "VI01ES",
    summary: "Engine Overheating",
    status: "open",
    reportedDate: "23 Jul, 2024",
    reportedBy: generatePerson("employer"),
    assignedTo: generatePerson("technician"),
    priority: "Low",
    additionalNotes: "Engine needs to be replaced",
  },
  {
    id: "VI01ES45",
    summary: "Steering vibrates at high speeds",
    status: "High",
    reportedDate: "18 Jul, 2024",
    reportedBy: generatePerson("employer"),
    assignedTo: generatePerson("technician"),
    priority: "High",
    additionalNotes: "Power Steering needs realignment",
  },
];
