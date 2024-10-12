import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { faker } from "@faker-js/faker";
import { generatePerson, Person } from "./Person";
faker.seed(123);

interface PurchaseDetails {
  date: string;
  price: string;
}
export interface Vehicle {
  id: string;
  type: string;
  name: string;
  license: string;
  status: string;
  purchaseDetails?: PurchaseDetails;
  operator: Person;
  specifications?: {
    make: string;
    type?: string;
    subType?: string;
    model: string;
    year?: number;
    color?: string;
    mileage?: number;
    fuelType?: string;
    transmission?: string;
    vin?: string;
    engine?: {
      cylinders: number;
      displacement: number;
      fuelEfficiency: number;
    };
  };
}

export const generateVehicleDetails = (status: string) => {
  return {
    id: faker.string.uuid(),
    type: faker.vehicle.type(),
    name: faker.vehicle.model(),
    license: faker.vehicle.vin(),
    status: status,
    operator: generatePerson("operator"),
    purchaseDetails: {
      date: formatDate(new Date(faker.date.past()), DATE_OPTIONS.dMY),
      price: faker.finance.amount(),
    },
    specifications: {
      make: faker.vehicle.manufacturer(),
      type: faker.vehicle.type(),
      subType: faker.vehicle.vehicle(),
      model: faker.vehicle.model(),
      year: faker.date
        .between({ from: 2015, to: new Date().getFullYear() })
        .getFullYear(),
      color: faker.vehicle.color(),
      mileage: faker.number.int({ min: 0, max: 100000 }),
    },
  };
};

export const sampleVehicles: Vehicle[] = [
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
  generateVehicleDetails("active"),
];
