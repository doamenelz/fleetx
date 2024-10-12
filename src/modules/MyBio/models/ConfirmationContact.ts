import { Address } from "@/models";

export interface ConfirmationContact {
  id: string;
  fullName: string;
  address: Address;
  type: "ref" | "guarantor";
  email?: string;
  mobileNumber?: string;
  employer?: string;
  jobPosition?: string;
  relationship?: string;
  relationshipDuration?: string;
}
