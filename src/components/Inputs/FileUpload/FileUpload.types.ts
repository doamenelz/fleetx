import { INPUT_SIZE } from "../Input.types";

export interface FileUploadProps {
  label?: string;
  id: string;
  span?: INPUT_SIZE;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  file: File | null;
  showError?: boolean;
  errorLabel?: string;
  defaultValue?: string;
  uploadDescription: string;
  uploadDescriptionSubtitle?: string;
  permittedUploadTypes: string;
  uploadButton?: JSX.Element;
  clearUpload?: () => void;
  onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
}
