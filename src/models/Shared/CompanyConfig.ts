export interface CompanyConfiguration {
  id: string;
  fuel: CodeShort;
  mileage: CodeShort;
  currency: CodeShort;
}

interface CodeShort {
  label: string;
  code: string;
}
