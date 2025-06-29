import { INPUT_SIZE } from "../Input.types";

export interface EmailInputProps {
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
}

export const regexEmail = (value: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value === "" || regex.test(value)) {
    return true;
  } else {
    return false;
  }
};

// const regexEmail = (email: string) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };
