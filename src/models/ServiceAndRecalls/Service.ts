export interface ServiceDetails {
  id: string;
  vehicleId: string;
  scheduledDate: string;
  repairStartDate: string;
  repairEndDate: string;
  status: string;
  odometer: string;
  notes: string;
  issueIds: string[];
  vendorId: string;
  costs: {
    parts: string;
    labor: string;
    total: string;
    other: string;
  };
  loggedBy: string;
  resolvedIssuesId: string;
  inspectionReferenceNumber: string;
  serviceReminderIds: string;
}

export interface ServiceReminders {
  id: string;
  programName: string;
  programDescription: string;
  status: string;
  schedule: {
    dueDate: string;
    dueAt: string;
  };
  serviceDetails: ServiceDetails;
  workOrderId: string;
  task: {
    id: string;
    name: string;
  };
}
