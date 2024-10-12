import { faker } from "@faker-js/faker";
faker.seed(123);

export interface Person {
  name: string;
  firstName: string;
  lastName: string;
  id: string;
  role: string;
  avatar: string;
  email: string;
}

export const generatePerson = (role: string) => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),

    role: role,
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
  };
};
