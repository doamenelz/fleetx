import { INPUT_TYPES, TEXT_INPUT_SIZE, TextInputProps } from "@/components";
export const ManufacturerInputs = () => {
  return [
    {
      id: "name",
      label: "Manufacturer's Name",
      span: TEXT_INPUT_SIZE.span1,
      style: INPUT_TYPES.text,
      editMode: true,
      copy: "",
      setValue: () => {},
      setShowError: () => {},
      required: true,
      placeHolder: "e.g., Honda, Tesla",
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
      required: true,
      placeHolder: "e.g., SUV, Sedan",
    },
    {
      id: "model",
      label: "Model",
      span: TEXT_INPUT_SIZE.span1,
      style: INPUT_TYPES.text,
      editMode: true,
      copy: "",
      setValue: () => {},
      setShowError: () => {},
      required: true,
      placeHolder: "e.g., Accord, Civic, Corolla",
    },
  ];
};
