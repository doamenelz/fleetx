import { Person } from "../Person";

export interface VehicleEnergy {
  id: string;
  odometer: string;
  totalCost: string;
  totalVolume: string;
  costPerUnit: string;
  refillLocationId: string;
  notes: string;
  paymentMethod: string;
  reportedBy: Person;
}
