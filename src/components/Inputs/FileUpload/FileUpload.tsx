import clsx from "clsx";
import { FileUploadProps } from "./FileUpload.types";
import { fieldWrapper, INPUT_SIZE } from "../Input.types";
import { Field } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { Lbl } from "../../Typography";
/** FileUpload HTML Input Element. Implementation is limited to single file upload */
export const FileUpload = ({
  label,
  id,
  errorLabel,
  required,
  span = INPUT_SIZE.full,
  name,
  onChangeHandler,
  showError = false,
  file,
  uploadDescription,
  uploadDescriptionSubtitle,
  permittedUploadTypes,
  clearUpload,
  uploadButton,
}: FileUploadProps) => {
  return (
    <div
      className={span}
      key={id}
    >
      <>
        <Field className={fieldWrapper(showError, label)}>
          {label && (
            <Lbl
              label={label}
              required={required}
            />
          )}
          <div className={clsx(file ? "" : "flex justify-center")}>
            <div className="text-center">
              <div
                className={clsx(
                  " w-full text-sm text-gray-600",
                  file ? "text-left" : "text-center"
                )}
              >
                <label
                  htmlFor={id}
                  className={clsx(
                    "relative font-medium bg-white rounded-md cursor-pointer text-primary-600  focus-within:outline-none focus-within:text-primary-900 hover:text-primary-900"
                  )}
                >
                  {uploadButton}
                  {/* <span className={clsx(file && "flex justify-between")}>
                    {file ? file.name : `${uploadDescription}`}{" "}
                    {file && clearUpload && (
                      <button
                        onClick={clearUpload}
                        type="button"
                      >
                        <X className="size-4 text-red-300 hover:text-red-600" />
                      </button>
                    )}
                  </span> */}

                  <input
                    type="file"
                    name={name}
                    id={id}
                    required={required}
                    className="sr-only"
                    accept={permittedUploadTypes}
                    onChange={onChangeHandler}
                  />
                </label>
              </div>
              {!file && (
                <p className="text-xs text-gray-600">
                  {uploadDescriptionSubtitle}
                </p>
              )}
            </div>
          </div>
        </Field>
        {showError && (
          <p className="text-xs font-medium text-red-500">{errorLabel}</p>
        )}
      </>
    </div>
  );
};

export const ImageStyleUploadCard = () => {
  return (
    <>
      <div
        className={clsx(
          "object-cover rounded-md mb-2 size-24 hover:shadow hover:border",
          "bg-gray-100 place-content-center flex justify-center"
        )}
      >
        <span
          className={clsx("items-center font-medium my-auto text-gray-600")}
        >
          <Plus className={"size-10"} />
        </span>
      </div>
    </>
  );
};
