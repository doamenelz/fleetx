export interface VendorClass {
  type: string;
  classes: { id: string; description: string }[];
}

export interface EnergyType {}

export interface VehicleCategories {
  name: string;
  class: string[];
  canEdit: boolean;
}
