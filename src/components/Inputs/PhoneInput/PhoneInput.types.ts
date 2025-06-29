import { INPUT_SIZE } from "../Input.types";

export interface PhoneInputProps {
  label?: string;
  id: string;
  span?: INPUT_SIZE;
  disabled?: boolean;
  required?: boolean;
  value: string;
  showError?: boolean;
  errorLabel?: string;
  defaultValue?: string;
  placeholder?: string;
  onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  countryProps?: {
    countryCodeHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
    countryCodes: string[];
  };

  pattern?: string;
}

export const regexPhoneNumber = (value: string) => {
  const regex = /^[0-9\b]+$/;
  if (value === "" || regex.test(value)) {
    return true;
  } else {
    return false;
  }
};
