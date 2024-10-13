export interface Location {
  id: string;
  type: string;
  address: string;
  category: string;
  notes: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
