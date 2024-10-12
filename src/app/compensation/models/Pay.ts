import { faker } from "@faker-js/faker";
export interface Pay {
  id: string;
  total: number;
  deduction: number;
  tax: number;
  net: number;
  currency: string;
  title: string;
  month: string;
  year: string;
  paymentDate: string;
  bankName?: string;
  bankAccount?: string;
  pensionAccount?: string;
  pensionProvider?: string;
  taxNumber?: string;
  nhfNumber?: string;
  taxBreakDown?: {
    // "Income Tax": number;
    // "State Tax": number;
    // "Employee Insurance": number;
  };
  deductionBreakDown?: {
    "Pension Contribution": number;
    "P.A.Y.E": number;
    NHF: number;
  };
  earningBreakdown?: {
    Basic: number;
    "Transport Allowance": number;
    "Vacation Allowance": number;
    "Overtime Allowance": number;
  };
}

export interface AnnualPay {
  id: string;
  totalNet: number;
  currency: string;
  totalAllowance: number;
  totalDeduction: number;
  allowances: {};
  deduction: {};
}

export const sampleAnnualPay: AnnualPay = {
  id: "sampleAnnualPay",
  totalNet: 2890341.0,
  currency: "NGN",
  totalAllowance: 3509414.76,
  totalDeduction: 619073.56,
  allowances: {
    Basic: 1456789.0,
    Housing: 800000.0,
    Transport: 500000.0,
    LeaveAllowance: 145678.9,
    Bonus: 485547.77,
  },
  deduction: {
    Pension: 220543.12,
    "P.A.Y.E": 398530.44,
  },
};

export const samplePay: Pay[] = [
  {
    id: "001",
    total: 280000,
    deduction: 80000,
    tax: 35000,
    net: 200000,
    currency: "NGN",
    title: "January Salary 2021",
    paymentDate: "24 Jan, 2021",
    month: "Jan",
    year: "2021",
    bankName: "Heritage Bank Plc",
    bankAccount: `${faker.finance.accountNumber(9)}`,
    pensionAccount: `${faker.finance.accountNumber(6)}`,
    pensionProvider: "StanBic Pensions",
    taxNumber: `${faker.finance.accountNumber(12)}`,
    nhfNumber: `${faker.finance.accountNumber(16)}`,
    taxBreakDown: {
      "Income Tax": 10000.56,
      "State Tax": 15500,
      "Employee Insurance": 9500,
    },
    deductionBreakDown: {
      "Pension Contribution": 25000,
      "P.A.Y.E": 15000,
      NHF: 10000,
    },
    earningBreakdown: {
      Basic: 200000,
      "Transport Allowance": 25000,
      "Vacation Allowance": 20000,
      "Overtime Allowance": 40000,
    },
  },
  {
    id: "002",
    total: 280000,
    deduction: 45000,
    tax: 35000,
    net: 200000,
    currency: "NGN",
    title: "February Salary 2021",
    paymentDate: "24 Feb, 2021",
    month: "Feb",
    year: "2021",
  },
  {
    id: "003",
    total: 380000,
    deduction: 45000,
    tax: 35000,
    net: 300000,
    currency: "NGN",
    title: "March Salary 2021",
    paymentDate: "24 Jan, 2021",
    month: "Mar",
    year: "2021",
  },
  {
    id: "004",
    total: 280000,
    deduction: 45000,
    tax: 35000,
    net: 200000,
    currency: "NGN",
    title: "April Salary 2021",
    paymentDate: "24 Apr, 2021",
    month: "Apr",
    year: "2021",
  },
  {
    id: "005",
    total: 280000,
    deduction: 45000,
    tax: 35000,
    net: 200000,
    currency: "NGN",
    title: "May Salary 2021",
    paymentDate: "24 May, 2021",
    month: "May",
    year: "2021",
  },
  {
    id: "00u",
    total: 280000,
    deduction: 45000,
    tax: 35000,
    net: 200000,
    currency: "NGN",
    title: "June Salary 2021",
    paymentDate: "24 Jun, 2021",
    month: "Jun",
    year: "2021",
  },
  {
    id: "00x",
    total: 480000,
    deduction: 45000,
    tax: 55000,
    net: 380000,
    currency: "NGN",
    title: "July Salary 2021",
    paymentDate: "24 Jul, 2021",
    month: "Jul",
    year: "2021",
  },
];
