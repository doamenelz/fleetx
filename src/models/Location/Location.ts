import { faker } from "@faker-js/faker";
export interface LocationFleet {
  id: string;
  type: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  category: string;
  notes: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

const category = ["Office", "Saved", "New"];
const type = ["new", "scheduled", "completed", "cancelled", "pending"];
export const createSampleLocation = () => {
  const location = {
    id: faker.string.uuid(),
    type: type[Math.floor(Math.random() * type.length)],
    address: "",
    line1: faker.location.streetAddress(),
    line2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
    category: category[Math.floor(Math.random() * category.length)],
    notes: "",
    coordinates: {
      lat: faker.location.latitude(),
      lon: faker.location.longitude(),
    },
  };
  return location as LocationFleet;
};

export const sampleOfficeLocations = () => {
  return [
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
    createSampleLocation(),
  ];
};
