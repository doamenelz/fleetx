import { samplePay } from "./Pay";
export interface PieChartData {
  name: string;
  value: number;
  label?: string;
  color: string;
}

export const samplePieChartData: PieChartData[] = [
  { name: "Deductions", value: samplePay[0].deduction, color: "#fdb022" },
  { name: "Net Pay", value: samplePay[0].net, color: "#12B76A" },
];

export const samplePieChartAnnualPayData: PieChartData[] = [
  { name: "Deductions", value: 619073.56, color: "#fdb022" },
  { name: "Net Pay", value: 2890341, color: "#12B76A" },
];
