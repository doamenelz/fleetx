import { TimelineProps } from "@/components";
import { Employee, sampleEmployee } from "@/models";
import { generateRandomEmployee, genEmpName } from "@/models";
export interface ConfirmationPendingAction {
  id: string;
  employee: Employee;
  proposedDate: string;
  initiatedDate: string;
  status: "Ongoing" | "Completed" | "";
  path: TimelineProps[];
}

export const confirmationPendingActions: ConfirmationPendingAction[] = [
  {
    id: "01",
    employee: sampleEmployee,
    proposedDate: "23 Aug, 2023",
    initiatedDate: "23 Aug, 2024",
    status: "Ongoing",
    path: [
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
        author: generateRandomEmployee(
          genEmpName("male"),
          "male",
          "Architecture"
        ),
      },
      {
        id: "003",
        action: "",
        stage: "pending",
        level: { stage: 3, text: "Group Head" },
        author: generateRandomEmployee(
          genEmpName("male"),
          "male",
          "Architecture"
        ),
      },
    ],
  },
  {
    id: "02",
    employee: generateRandomEmployee(
      genEmpName("male"),
      "male",
      "Architecture"
    ),
    proposedDate: "18 Jan, 2024",
    initiatedDate: "21 Mar, 2024",
    status: "Ongoing",
    path: [],
  },
];
