import { INPUT_TYPES, TEXT_INPUT_SIZE } from "@/components";
export const VehicleCategoryDefaultFieldsModel = () => {
  return [
    {
      id: "categoryName",
      label: "Name",
      span: TEXT_INPUT_SIZE.span1,
      style: INPUT_TYPES.text,
      editMode: true,
      copy: "",
      setValue: () => {},
      setShowError: () => {},
      defaultValue: "",
      required: true,
      placeHolder: "e.g., Car, Motorbikes, ATV",
    },
    {
      id: "type",
      label: "Type",
      span: TEXT_INPUT_SIZE.span1,
      style: INPUT_TYPES.text,
      editMode: true,
      copy: "",
      setValue: () => {},
      setShowError: () => {},
      defaultValue: "",
      required: true,
      placeHolder: "e.g., Sedan, Hatchback, SUV",
    },
  ];
};
