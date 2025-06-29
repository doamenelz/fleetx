import { faker } from "@faker-js/faker";
faker.seed(123);
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email?: string;
  phone?: string;
  department?: string;
  title?: string;
  avatar?: string;
  roles?: { module: string; crudValues?: any }[];
  lastLogin?: string;
  status?: string;
  assignedVehicles?: string[];
  files?: string[];
  profile?: string;
}

const status = ["Active", "Deactivated", "Pending"];
const randomizeStatus = () => {
  return Math.floor(Math.random() * status.length);
};

export const generateUser = () => {
  return {
    id: faker.string.alphanumeric({ length: 8, casing: "upper" }),
    name: faker.person.fullName(),
    firstName: faker.person.firstName(),
    title: faker.person.jobTitle(),
    lastName: faker.person.lastName(),
    avatar: faker.image.avatarGitHub(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: status[randomizeStatus()],
  } as User;
};
