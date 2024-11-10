import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { faker } from "@faker-js/faker";
import { FileDocument } from "./Document";
faker.seed(123);

export interface Person {
  name: string;
  firstName: string;
  lastName: string;
  id: string;
  role: string;
  avatar: string;
  email: string;
  phone?: string;
  lastLogin?: string;
  status?: string;
  class: string;
  licenseInformation?: {
    number: string;
    class: string;
    expirationDate: string;
  };
  files?: FileDocument[];
}

const roles = ["Technician", "Employee", "Back Office"];
const random = () => {
  return Math.floor(Math.random() * roles.length);
};

const userClass = ["Technician", "Employee", "Back Office"];
const randomizeUserClass = () => {
  return Math.floor(Math.random() * roles.length);
};

const status = ["Active", "Deactivated", "Pending"];
const randomizeStatus = () => {
  return Math.floor(Math.random() * status.length);
};

const licenseClass = ["General", "Class A", "General 2", "General 1"];
const randomizeLicenseClass = () => {
  return Math.floor(Math.random() * licenseClass.length);
};

export const generatePerson = (role: string) => {
  return {
    id: faker.string.alphanumeric({ length: 8, casing: "upper" }),
    name: faker.person.fullName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    class: userClass[randomizeUserClass()],
    role: roles[random()],
    avatar: faker.image.avatarGitHub(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: status[randomizeStatus()],
    lastLogin: formatDate(
      new Date(
        faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: "2024-11-01T00:00:00.000Z",
        })
      ),
      DATE_OPTIONS.dMHrs
    ),
    licenseInformation: {
      number: faker.string.alphanumeric({ length: 14, casing: "upper" }),
      class: licenseClass[randomizeLicenseClass()],
      expirationDate: formatDate(
        new Date(
          faker.date.between({
            from: "2024-01-01T00:00:00.000Z",
            to: "2028-01-01T00:00:00.000Z",
          })
        ),
        DATE_OPTIONS.dMY
      ),
    },
  };
};
