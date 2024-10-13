import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { faker } from "@faker-js/faker";
import { generatePerson, Person } from "../Person";
import { VehicleSpecifications } from "./VehicleSpecifications";
import {
  sampleVehicleAssignmentArray,
  VehicleAssignment,
} from "./VehicleAssignment";
import { color } from "framer-motion";
faker.seed(123);

interface PurchaseDetails {
  date: string;
  price: string;
}

export interface Vehicle {
  id: string;
  generalInfo: {
    type: string;
    manufacturer: string;
    name: string;
    model: string;
    year: string;
    odometer: string;
    location: string;
    trim: string;
    fuel: string;
    contractOwnership: string;
    sn: string;
    license: string;
    color: string;
  };
  status: string;
  purchaseDetails?: {};
  operator?: Person;
  features?: {};
  specifications?: VehicleSpecifications;
  weightAndDimensions?: {};
  engine?: {};
  wheelsAndTires?: {};
  fuelAndEnergy?: {};
  otherInformation?: {};
  assignments?: VehicleAssignment[];
}

export const generateVehicleDetails = (status: string, id: string) => {
  return {
    id: id,
    generalInfo: {
      type: faker.vehicle.type(),
      name: faker.vehicle.model(),
      manufacturer: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.date
        .between({
          from: "2010-01-01T00:00:00.000Z",
          to: "2025-01-01T00:00:00.000Z",
        })
        .getFullYear()
        .toString(),
      odometer: "125,555km",
      location: "Lagos, Nigeria",
      trim: "XLE",
      fuel: faker.vehicle.fuel(),
      contractOwnership: "Lease",
      sn: faker.vehicle.vin(),
      license: faker.vehicle.vrm(),
      color: faker.vehicle.color(),
    },
    operator: generatePerson("operator"),
    status: status,

    purchaseDetails: {
      date: formatDate(new Date(faker.date.past()), DATE_OPTIONS.dMY),
      price: `${faker.finance.currency()} ${faker.finance.amount()}`,
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
      genesis: "razor",
    },
    // assignments: sampleVehicleAssignmentArray,
  };
};

export const sampleVehicles: Vehicle[] = [
  generateVehicleDetails("active", "id00101"),
  generateVehicleDetails("active", "id00102"),
  generateVehicleDetails("active", "id00103"),
  generateVehicleDetails("active", "id00104"),
  generateVehicleDetails("active", "id00105"),
  generateVehicleDetails("active", "id00106"),
  generateVehicleDetails("active", "id00107"),
  generateVehicleDetails("active", "id00108"),
  generateVehicleDetails("active", "id00109"),
  generateVehicleDetails("active", "id00110"),
  generateVehicleDetails("active", "id00111"),
  generateVehicleDetails("active", "id00112"),
  generateVehicleDetails("active", "id00113"),
  generateVehicleDetails("active", "id00114"),
  generateVehicleDetails("active", "id00115"),
  generateVehicleDetails("active", "id00116"),
  generateVehicleDetails("active", "id00117"),
  generateVehicleDetails("active", "id00118"),
];
