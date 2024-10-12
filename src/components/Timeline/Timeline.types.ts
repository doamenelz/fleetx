import { Employee, sampleEmployee } from "@/models";
import { generateRandomEmployee, genEmpName } from "@/models";

export interface TimelineProps {
  id: string;
  action: "submitted" | "approved" | "declined" | "created" | "";
  stage: "pending" | "current" | "previous";
  date?: string;
  level: { stage: number; text: string };
  comments?: string;
  author: Employee;
}

export const timelineActivities: TimelineProps[] = [
  {
    id: "001",
    action: "submitted",
    stage: "previous",
    level: { stage: 1, text: "Owner" },
    author: sampleEmployee,
    date: "23 May, 2023",
  },
  {
    id: "002",
    action: "approved",
    stage: "previous",
    level: { stage: 2, text: "Line Manager" },
    author: generateRandomEmployee(genEmpName("male"), "male", "Architecture"),
    date: "27 May, 2023",
    comments: "Okay to treat",
  },
  {
    id: "003",
    action: "declined",
    stage: "current",
    level: { stage: 3, text: "Group Head" },
    author: generateRandomEmployee(genEmpName("male"), "male", "Architecture"),
    date: "27 May, 2023",
    comments: "Form requires rework",
  },
  {
    id: "00",
    action: "",
    stage: "pending",
    level: { stage: 4, text: "HR" },
    author: generateRandomEmployee(genEmpName("male"), "male", "Architecture"),
  },
];
