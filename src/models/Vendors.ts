import { faker } from "@faker-js/faker";
import { Address } from "./Address";
import { VendorClass } from "./Configurations";
import { FileDocument } from "./Document";

export enum VENDOR_CLASS {
  FUEL,
  PARTS,
  SERVICE,
}

export const VENDOR_CLASSES = [
  {
    type: VENDOR_CLASS.FUEL,
    id: "FUEL",
    description: "Fuel",
  },
];

export const getVendorClass = () => {
  const _config = sessionStorage.getItem("configurations");

  if (_config !== null) {
    const parseConfig = JSON.parse(_config);
    const parsedVendorClass = parseConfig.find(
      (item: { type: string }) => item.type === "VENDOR_CLASSES"
    ) as VendorClass;
    return parsedVendorClass;
  }

  //TODO: Call API if Configuration hasn't loaded
};

export interface Vendor {
  id: string;
  name: string;
  contacts: {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    role?: string;
  }[];
  address: Address;
  phone: string;
  email: string;
  website: string;
  notes?: string;
  serviceClasses: string[];
  status: string;
  recommendation?: {
    rating: string;
    notes?: string;
    lastUpdated?: string;
  };
  files?: FileDocument[];
}

const ratings = ["good", "average", "poor"];
const random = () => {
  return Math.floor(Math.random() * ratings.length);
};

const generateVendor = (serviceClasses: string[]) => {
  return {
    id: faker.string.alphanumeric({
      length: 6,
      exclude: ["a"],
      casing: "upper",
    }),
    name: faker.company.name(),
    contacts: Array.from({ length: 3 }, () => ({
      id: faker.datatype.uuid(),
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      role: faker.person.jobTitle(),
    })),
    address: {
      lineOne: faker.location.streetAddress(),
      lineTwo: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
    status: "active",
    phone: faker.phone.number(),
    email: faker.internet.email(),
    website: faker.internet.domainName(),
    notes: faker.lorem.paragraph(),
    serviceClasses: serviceClasses,
    recommendation: {
      rating: ratings[random()],
      notes: faker.lorem.paragraph(),
    },
  };
};

export const sampleVendors: Vendor[] = [
  generateVendor(["fuel", "parts"]),
  generateVendor(["fuel", "parts", "service", "acquisition"]),
  generateVendor(["fuel", "service"]),
  generateVendor(["service", "parts"]),
  generateVendor(["parts", "service"]),
  generateVendor(["fuel", "service"]),
  generateVendor(["fuel", "service"]),
  generateVendor(["fuel", "service"]),
  generateVendor(["fuel", "service"]),
];
