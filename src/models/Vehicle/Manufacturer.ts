export interface Manufacturer {
  id: string;
  name: string;
  models: {
    id: string;
    name: string;
    class: string[];
    trims: {
      id: string;
      name: string;
      class: string;
    }[];
  }[];
}
