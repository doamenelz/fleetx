import { faker } from "@faker-js/faker";
export interface VehicleService {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  createdBy: string;
  lastUpdatedAt: string;
  scheduledDate: string;
  completedDate: string;
  vehicleId: string;
  mileage: string;
  serviceType: string;
  programName?: string;
}

const statuses = ["pending", "scheduled", "completed", "cancelled"];
export const createVehicleService = () => {
  return {
    id: `${faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    })}`,
    name: "Scheduled Oil Change",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: faker.date.past().toString(),
    createdBy: faker.person.fullName(),
    lastUpdatedAt: faker.date.past().toISOString(),
    scheduledDate: faker.date.future().toISOString(),
    completedDate: faker.date.future().toString(),
    vehicleId: faker.string.uuid(),
    mileage: faker.number.int({ min: 1000, max: 200000 }).toString(),
    serviceType: "Maintenance",
    programName: "8000 km Service",
  };
};
