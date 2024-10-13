export interface Parts {
  id: string;
  number: string;
  unitCost: string;
  description: string;
  manufacturer: {
    name: string;
    partNumber: string;
  };
  category: string;
}
