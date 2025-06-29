import { faker } from "@faker-js/faker";
export interface VehicleFault {
  id: string;
  name: string;
  description: string;
  status: string;
  severity: string;
  createdAt: string;
  createdBy: string;
  lastUpdatedAt: string;
  images?: string[];
  additionalNotes?: string;
  vehicleId: string;
  odometer: {
    value: string;
    unit: string;
  };
  faultType: string;
  faultCode: string;
  workOrderId?: string;
}

const statuses = ["new", "scheduled", "completed", "cancelled", "pending"];
export const createSampleVehicleFault = () => {
  return {
    id: `${faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    })}`,
    name: "Engine Oil Leak",
    description: "Oil leak from the engine block",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    severity: "high",
    createdAt: faker.date.past().toString(),
    createdBy: faker.person.fullName(),
    lastUpdatedAt: faker.date.past().toString(),
    images: [faker.image.url(), faker.image.url()],
    additionalNotes: "Check for loose bolts and seals",
    vehicleId: faker.string.uuid(),
    odometer: {
      value: faker.number.int({ min: 1000, max: 200000 }).toString(),
      unit: "km",
    },
    faultType: "Mechanical",
    faultCode: "ENG-001",
    scheduledDate: faker.date.future().toISOString(),
    completedDate: faker.date.future().toString(),
    workOrderId: `${faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    })}`,
  };
};
