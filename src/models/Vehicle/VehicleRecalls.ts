import { Recall } from "../ServiceAndRecalls/Recall";

export interface VehicleRecalls {
  id: string;
  recalls: Recall;
  status: string;
  lastUpdatedDate: string;
}
