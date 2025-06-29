export interface Decision {
  reviewerId: string;
  decisionDate: string;
  decision: string;
  notes?: string;
  level?: string;
  approvedAmount?: number;
}

export enum DECISION {
  APPROVED = "approved",
  DECLINED = "declined",
  UPDATE_REQUIRED = "update_required",
}
