import { INPUT_TYPES, TEXT_INPUT_SIZE } from "@/components";
import { Person } from "@/models/Person";
import { autocomplete } from "@nextui-org/react";
export const LoginInputModel = () => {
  return [
    {
      id: "username",
      label: "User Name",
      span: TEXT_INPUT_SIZE.span1,
      style: INPUT_TYPES.text,
      editMode: true,
      copy: "",
      setValue: () => {},
      setShowError: () => {},
      defaultValue: "admin@email.com",
      required: true,
      placeHolder: "Enter your username",
      autocomplete: "username",
    },
    {
      id: "password",
      label: "Password",
      span: TEXT_INPUT_SIZE.span1,
      style: INPUT_TYPES.password,
      type: "password",
      editMode: true,
      copy: "",
      setValue: () => {},
      setShowError: () => {},
      defaultValue: "safacei890",
      required: true,
      placeholder: "Enter your password",
      autocomplete: "current-password",
    },
  ];
};

export interface SignedInObject {
  lastLogin?: string;
  profile: Person;
  id: string;
}
