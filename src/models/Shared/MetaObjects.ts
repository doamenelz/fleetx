import { User } from "./User";

export interface CreateModifyEntry {
  createdBy: string | User;
  createdAt: string;
  lastUpdatedAt?: string;
  lastUpdatedBy?: string | User;
}
