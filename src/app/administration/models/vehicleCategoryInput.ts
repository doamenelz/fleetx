import { INPUT_TYPES, TEXT_INPUT_SIZE, TextInputProps } from "@/components";
export const VehicleCategoryDefaultFieldsModel = () => {
  return [
    {
      id: "name",
      label: "Name",
      span: TEXT_INPUT_SIZE.span1,
      style: INPUT_TYPES.text,
      editMode: true,
      copy: "",
      setValue: () => {},
      setShowError: () => {},
      // defaultValue: person?.firstName,
      required: true,
      placeHolder: "e.g., Car, Motorbikes, ATV",
    },
    {
      id: "cat",
      label: "Type",
      span: TEXT_INPUT_SIZE.span1,
      style: INPUT_TYPES.text,
      editMode: true,
      copy: "",
      setValue: () => {},
      setShowError: () => {},
      // defaultValue: person?.firstName,
      required: true,
      placeHolder: "e.g., SUV, Sedan",
    },
  ];
};
