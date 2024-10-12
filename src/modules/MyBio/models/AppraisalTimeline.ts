import { TimelineProps } from "@/components";
import { sampleEmployee } from "@/models";
import { generateRandomEmployee, genEmpName } from "@/models";
export const appraisalActivities: TimelineProps[] = [
  {
    id: "001",
    action: "submitted",
    stage: "previous",
    level: { stage: 1, text: "Owner" },
    author: sampleEmployee,
    date: "23 Aug, 2024",
  },
  {
    id: "002",
    action: "",
    stage: "current",
    level: { stage: 2, text: "Line Manager" },
    author: generateRandomEmployee(genEmpName("male"), "male", "Architecture"),
  },
  {
    id: "003",
    action: "",
    stage: "pending",
    level: { stage: 3, text: "Group Head" },
    author: generateRandomEmployee(genEmpName("male"), "male", "Architecture"),
  },
];
