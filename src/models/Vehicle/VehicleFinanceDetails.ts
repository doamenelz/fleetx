export interface VehicleFinanceDetails {
  id: string;
  vehicleNumber: string;
  purchaseCost: string;
  financeType: string;
  monthlyPayment: string;
  outstandingPayment: string;
  startDate: string;
  endDate: string;
  borrowRate: string;
  mileagePerYear: string;
  notes: string;
  contractNumber: string;
  saleDetails?: {};
}
