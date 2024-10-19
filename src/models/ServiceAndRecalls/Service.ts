import { faker, id_ID } from "@faker-js/faker";
import { CustomField } from "../CustomField";
import { sampleVehicleIssues, VehicleIssues } from "../Vehicle";

export interface ServiceDetails {
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

export interface ServiceWorkItems {
  total: number;
  currency: string;
  taxes: string;
  subtotal: number;
  items: {
    id: string;
    key: string;
    value: string;
    qty: number;
    type: "parts" | "labour";
  }[];
}

const sampleServiceWork: ServiceWorkItems = {
  total: 123,
  currency: "$",
  taxes: "10%",
  subtotal: 100,
  items: [
    {
      id: faker.string.alphanumeric({
        length: 9,
        exclude: ["a"],
        casing: "upper",
      }),
      key: "PREMIUM SYN PACKAGE",
      value: "23.45",
      qty: 2,
      type: "parts",
    },
    {
      id: faker.string.alphanumeric({
        length: 9,
        exclude: ["a"],
        casing: "upper",
      }),
      key: "RECYCLING FEE",
      value: "10.56",
      qty: 2,
      type: "labour",
    },
    {
      id: faker.string.alphanumeric({
        length: 9,
        exclude: ["a"],
        casing: "upper",
      }),
      key: "SHOP SUPPLIES",
      value: "14.56",
      qty: 1,
      type: "labour",
    },
    {
      id: faker.string.alphanumeric({
        length: 9,
        exclude: ["a"],
        casing: "upper",
      }),
      key: "OIL FILTER PH2867",
      value: "145.56",
      qty: 2,
      type: "labour",
    },
    {
      id: faker.string.alphanumeric({
        length: 9,
        exclude: ["a"],
        casing: "upper",
      }),
      key: "TIRE PRESSURE INSPECTION",
      value: "35",
      qty: 4,
      type: "labour",
    },
    {
      id: faker.string.alphanumeric({
        length: 9,
        exclude: ["a"],
        casing: "upper",
      }),
      key: "FREE WASHER FLUID TOP-UP",
      value: "0",
      qty: 1,
      type: "labour",
    },
    {
      id: faker.string.alphanumeric({
        length: 9,
        exclude: ["a"],
        casing: "upper",
      }),
      key: "AUTO TRANS SVC SPECIALTY ",
      value: "259.44",
      qty: 2,
      type: "labour",
    },
    {
      id: faker.string.alphanumeric({
        length: 9,
        exclude: ["a"],
        casing: "upper",
      }),
      key: "Workmanship",
      value: "120.00",
      qty: 2,
      type: "labour",
    },
  ],
};
export interface ServiceReminders {
  id: string;
  programName: string;
  vehicleId: string;
  programDescription: string;
  scheduledDate: string;
  repairStartDate: string;
  repairEndDate: string;
  status: string;
  odometer: string;
  schedule: {
    dueDate: string;
    dueAt: string;
  };
  serviceDetails?: CustomField[];
  resolvedIssues?: VehicleIssues[];
  workItems?: ServiceWorkItems;
  workOrderId?: string;
  task: {
    id: string;
    name: string;
  };
}

export const generateService = () => {
  return {
    id: faker.string.alphanumeric({
      length: 5,
      exclude: ["a"],
      casing: "upper",
    }),
    programName: "Quarterly Oil Change",
    programDescription: "Sample service reminder program",
    status: "active",
    vehicleId: "V001",
    scheduledDate: "2022-12-31",
    repairStartDate: "2022-12-31",
    repairEndDate: "2023-01-01",
    odometer: "10000 km",
    schedule: {
      dueDate: "2022-12-31",
      dueAt: "17:00",
    },
    serviceDetails: [
      {
        id: faker.string.alphanumeric({
          length: 9,
          exclude: ["a"],
          casing: "upper",
        }),
        key: "Vendor",
        value: faker.company.name(),
      },
      {
        id: faker.string.alphanumeric({
          length: 9,
          exclude: ["a"],
          casing: "upper",
        }),
        key: "Inspection ID",
        value: faker.string.alphanumeric({
          length: 7,
          exclude: ["a"],
          casing: "upper",
        }),
      },
      {
        id: faker.string.alphanumeric({
          length: 9,
          exclude: ["a"],
          casing: "upper",
        }),
        key: "Notes",
        value: faker.lorem.paragraph(),
      },

      // issueIds: ["I001", "I002"],
      // vendorId: "V001",
      // costs: {
      //   parts: "$234.56",
      //   labor: "$100.86",
      //   total: "$335.62",
      //   other: "$15",
      // },
      // loggedBy: "string",
      // resolvedIssuesId: "string",
      // inspectionReferenceNumber: "string",
      // serviceReminderIds: "string",
    ],
    resolvedIssues: sampleVehicleIssues,
    workItems: sampleServiceWork,
    workOrderId: "string",
    task: {
      id: "string",
      name: "string",
    },
  };
};

export const sampleServiceReminders: ServiceReminders[] = [
  generateService(),
  generateService(),

  generateService(),
  generateService(),
  generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
  // generateService(),
];
