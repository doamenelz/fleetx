import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { faker } from "@faker-js/faker";
import { generatePerson, Person } from "../Person";
import { VehicleSpecifications } from "./VehicleSpecifications";
import {
  sampleVehicleAssignmentArray,
  VehicleAssignment,
} from "./VehicleAssignment";
import { ListTableData } from "@/components";
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
    activeSince: string;
  };
  status: string;
  purchaseDetails?: {};
  operator?: Person;
  features?: any[];
  specifications?: VehicleSpecifications;
  weightAndDimensions: any[];
  engine?: any[];
  wheelsAndTires?: any[];
  fuelAndEnergy?: any[];
  otherInformation?: any[];
  assignments?: VehicleAssignment[];
}

const features = [
  {
    id: "1",
    key: "Safety Features",
    value: [
      "Backup Camera",
      "Automatic High Beams (AHB)",
      "BSM w/RCTA",
      "Star Safety System: Smart Stop Technology, Vehicle Stability Control, Anti-Lock Brakes, Traction Control, Electronic Brake Force Distribution, Brake Assist",
    ],
  },
  {
    id: "2",
    key: "Convenience",
    value: ["Keyless Entry", "Cruise Control"],
  },
  {
    id: "3",
    key: "Interior Features",
    value: ["Dual Zone Automatic Climate Control", "Rear Window Defogger"],
  },
  {
    id: "4",
    key: "Mechanical Features",
    value: [
      "Vehicle Stability Control (VSC)",
      "Active rear sport differential",
      "Electric Power Steering (EPS)",
    ],
  },
];
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
      activeSince: formatDate(
        new Date(
          faker.date.between({
            from: "2010-01-01T00:00:00.000Z",
            to: "2025-01-01T00:00:00.000Z",
          })
        ),
        DATE_OPTIONS.dMY
      ).toString(),
    },
    operator: generatePerson("operator"),
    status: status,

    purchaseDetails: {
      date: formatDate(
        new Date(faker.date.past()),
        DATE_OPTIONS.dMY
      ).toString(),
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
    features: features.map((feature) => {
      return {
        id: feature.id,
        key: feature.key,
        value: feature.value.map((item) => item),
      };
    }),
    weightAndDimensions: [
      {
        id: faker.string.uuid(),
        key: "Length (mm)",
        value: "4694.20",
      },
      {
        id: faker.string.uuid(),
        key: "Height (mm)",
        value: "1414.97",
      },
      {
        id: faker.string.uuid(),
        key: "Width (mm)",
        value: "1802",
      },
      {
        id: faker.string.uuid(),
        key: "Curb weight (kg)",
        value: "1310",
      },
      {
        id: faker.string.uuid(),
        key: "Ground clearance – no-load/maximum permissible weight; (mm)",
        value: "134 / 108.64",
      },
    ],
    engine: [
      {
        id: faker.string.uuid(),
        key: "Engine type",
        value: "2.0-litre inline 4-cylinder",
      },
      {
        id: faker.string.uuid(),
        key: "Two-motor hybrid system",
        value: "1414.97",
      },
      {
        id: faker.string.uuid(),
        key: "Valve train",
        value: "16-Valve DOHC with Dual Variable Timing Control (VTC)",
      },
      {
        id: faker.string.uuid(),
        key: "Emissions rating",
        value: "Tier 3 Bin 30",
      },
    ],
    wheelsAndTires: [
      {
        id: faker.string.uuid(),
        key: "Wheelbase (mm)",
        value: "2735",
      },
      {
        id: faker.string.uuid(),
        key: "Wheel Size",
        value: "16' Steel with covers",
      },
      {
        id: faker.string.uuid(),
        key: "All-season tires",
        value: "P215/55 R16 93H",
      },
      {
        id: faker.string.uuid(),
        key: "Tire repair kit",
        value: "-",
      },
      {
        id: faker.string.uuid(),
        key: "Stabilizer bars – front/rear (mm)",
        value: "26.5/17.0",
      },
      {
        id: faker.string.uuid(),
        key: "Power-assisted, ventilated front disc/solid rear disc brakes",
        value: "-",
      },
      {
        id: faker.string.uuid(),
        key: "Drive Type",
        value: "RWD",
      },
      {
        id: faker.string.uuid(),
        key: "Brake System",
        value: "Hydraulic",
      },
      {
        id: faker.string.uuid(),
        key: "Front Track Width",
        value: "68.1",
      },
      {
        id: faker.string.uuid(),
        key: "Front Tire Type",
        value: "LT245/75R16",
      },
      {
        id: faker.string.uuid(),
        key: "Rear Tire Type",
        value: "LT245/75R16",
      },
    ],
    fuelAndEnergy: [
      {
        id: faker.string.uuid(),
        key: "Continuously variable transmission (City/Hwy/Combined)",
        value: "7.3/5.7/6.6",
      },
      {
        id: faker.string.uuid(),
        key: "Electro-Continuously Variable Transmission (eCVT) (City/Hwy/Combined)",
        value: "-",
      },
      {
        id: faker.string.uuid(),
        key: "Fuel tank capacity (L)",
        value: "46.9",
      },
      {
        id: faker.string.uuid(),
        key: "Recommended fuel",
        value: "Regular",
      },
    ],
    otherInformation: [],

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
