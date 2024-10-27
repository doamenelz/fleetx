import { faker } from "@faker-js/faker";
import { Address } from "./Address";

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
    notes: string;
    lastUpdated: string;
  };
}

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
