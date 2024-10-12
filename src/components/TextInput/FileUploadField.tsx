import { FC, useContext, useRef, useState } from "react";
import { TEXT_INPUT_SIZE } from ".";
import { classNames } from "@/lib/utilities/helperFunctions";
import { RootContext } from "@/context/RootContext";
export const FileUploadField: FC<{
  label?: string;
  id: string;
  errorLabel?: string;
  type?: string;
  defaultValue?: string;
  placeHolder?: string;
  disabled?: boolean;
  required?: boolean;
  pattern?: string;
  span?: TEXT_INPUT_SIZE;
  checkValidation?: boolean;
  name: string;
  handleChange: Function;
}> = (props) => {
  const store = useContext(RootContext);
  let refValue = useRef<HTMLInputElement | null>(null);
  const [showError, setShowError] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      if (event.currentTarget.files[0].size > 1 * 1000 * 1024) {
        store.setNotificationType("success");
        store.setNotificationHeader("Could not upload your file");
        store.setNotificationCopy!("Maximum size of 1MB is allowed");
        store.toggleNotification(true);
        return false;
      }
    }
    setFile(event.currentTarget.files![0]);
    props.handleChange(event.currentTarget.files![0]);
  };

  return (
    <div className={props.span}>
      <label
        htmlFor={props.id}
        className="block text-sm font-normal leading-6 text-gray-900"
      >
        {props.label}
        {props.required && <span className="text-error-600">*</span>}
      </label>
      <div className="mt-2">
        <div className="w-full ">
          <div
            className={classNames(
              file
                ? ""
                : "flex justify-center px-6 py-2 border border-dashed rounded-lg border-gray-900/25"
            )}
          >
            <div className="text-center">
              <div className="flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor={props.id}
                  className="relative font-semibold bg-white rounded-md cursor-pointer text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                >
                  <span>{file ? file.name : `Upload ${props.label}`}</span>
                  <input
                    type="file"
                    name={props.name}
                    id={props.id}
                    required={props.required}
                    className="sr-only"
                    accept=".pdf"
                    // onChange={onChangeHandler}
                  />
                </label>
              </div>
              {!file && (
                <p className="text-xs leading-5 text-gray-600">
                  PDF only | 1MB max
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
