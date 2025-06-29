import { faker } from "@faker-js/faker";
import { generateVehicleDetails, Vehicle } from "../Vehicle";
import { createSampleLocation, LocationFleet } from "../Location";

//TODO: Create Driver Model
export interface Trip {
  id: string;
  requestedBy: string;
  createdAt: string;
  name: string;
  description: string;
  tripClass: string;
  pickupLocation: LocationFleet;
  dropOffLocation: LocationFleet;
  pickupTime: string;
  pickupDay: string;
  additionalNotes?: string;
  requestedSeats?: number;
  status: string;
  lastUpdatedAt?: string;
  otherDetails?: {
    driver: {
      id: string;
      name: string;
      firstName: string;
      lastName: string;
      phone: string;
      avatar: string;
    };
    vehicle: Vehicle;
  };
  history?: {};
}

const statuses = ["new", "scheduled", "completed", "cancelled", "pending"];
const tripClasses = ["Executive", "Business", "Carpool"];
export const createSampleTrip = () => {
  const trip = {
    id: `${faker.string.alphanumeric({
      length: 9,
      exclude: ["a"],
      casing: "upper",
    })}`,
    name: "Alpha-wave Annual General Meeting",
    description: "Oil leak from the engine block",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: faker.date.past().toString(),
    requestedBy: faker.person.fullName(),
    lastUpdatedAt: faker.date.past().toString(),
    tripClass: tripClasses[Math.floor(Math.random() * tripClasses.length)],
    pickupLocation: createSampleLocation(),
    dropOffLocation: createSampleLocation(),
    pickupDay: faker.date.future().toString(),
    pickupTime: "01:00 PM",
    requestedSeats: faker.number.int({ min: 1, max: 4 }),
    otherDetails: {
      driver: {
        id: `${faker.string.alphanumeric({
          length: 9,
          exclude: ["a"],
          casing: "upper",
        })}`,
        name: faker.person.fullName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        avatar:
          "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      vehicle: generateVehicleDetails("active", "123"),
    },
  };

  return trip as Trip;
};
