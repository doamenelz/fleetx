export interface VehicleReminders {
  id: string;
  status: string;
  startDate: string;
  dueDate: string;
  startTime: string;
  endTime: string;
  notes: string;
  type: string; //jEvents | Service&Repairs,Renewals,Inspection,Payments,Others
  reminderId: string;
}

export const sampleVehicleReminders: VehicleReminders[] = [
  {
    id: "01",
    status: "completed",
    startDate: "25 Aug, 2024",
    dueDate: "25 Aug, 2024",
    startTime: "10 AM",
    endTime: "12:45 AM",
    notes: "string",
    type: "payment",
    reminderId: "Insurance Monthly Payment",
  },
  {
    id: "02",
    status: "Scheduled",
    startDate: "string",
    dueDate: "string",
    startTime: "string",
    endTime: "string",
    notes: "string",
    type: "service",
    reminderId: "8,000km Oil Change",
  },
  // {
  //   id: "03",
  //   status: "Scheduled",
  //   startDate: "string",
  //   dueDate: "string",
  //   startTime: "string",
  //   endTime: "string",
  //   notes: "string",
  //   type: "renewals",
  //   reminderId: "407ETR Renewal",
  // },
  // {
  //   id: "04",
  //   status: "Overdue",
  //   startDate: "string",
  //   dueDate: "string",
  //   startTime: "string",
  //   endTime: "string",
  //   notes: "string",
  //   type: "inspection",
  //   reminderId: "Emission Test Inspection",
  // },
];
