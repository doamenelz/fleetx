import {
  Button,
  BUTTON_SKIN,
  ComboBoxInput,
  findInputById,
  FormCell,
  FormSection,
  InputHandler,
  TextInputProps,
} from "@/components";
import { PlusIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
export const FormVehicleGenInfo: FC<{
  defaultFields: TextInputProps[];
  inputHelper: Function;
}> = ({ defaultFields, inputHelper }) => {
  return (
    <>
      <FormSection label="General Information">
        <>
          <FormCell>
            <div>
              <InputHandler
                props={{
                  ...findInputById(defaultFields!, "manufacturer")!,
                  setValue: inputHelper,
                  showError: false,
                  // setShowError: () => checkRequiredLoginFields,
                  errorLabel: "First Name is required",
                }}
              />
              <button className="flex gap-2 pt-1 pl-2 text-brand-indiGlow hover:text-brand-persianBlue">
                Add New{" "}
                <span>
                  <PlusIcon className="size-4" />
                </span>
              </button>
            </div>
          </FormCell>
          <FormCell>
            <div>
              <InputHandler
                props={{
                  ...findInputById(defaultFields!, "model")!,
                  setValue: inputHelper,
                  showError: false,
                  // setShowError: () => checkRequiredLoginFields,
                  errorLabel: "First Name is required",
                }}
              />
              <button className="flex gap-2 pt-1 pl-2 text-brand-indiGlow hover:text-brand-persianBlue">
                Add New{" "}
                <span>
                  <PlusIcon className="size-4" />
                </span>
              </button>
            </div>
          </FormCell>
          <FormCell>
            <div>
              <InputHandler
                props={{
                  ...findInputById(defaultFields!, "trim")!,
                  setValue: inputHelper,
                  showError: false,
                  // setShowError: () => checkRequiredLoginFields,
                  errorLabel: "First Name is required",
                }}
              />
              <button className="flex gap-2 pt-1 pl-2 text-brand-indiGlow hover:text-brand-persianBlue">
                Add New{" "}
                <span>
                  <PlusIcon className="size-4" />
                </span>
              </button>
            </div>
          </FormCell>
          <FormCell>
            <div>
              <InputHandler
                props={{
                  ...findInputById(defaultFields!, "type")!,
                  setValue: inputHelper,
                  showError: false,
                  // setShowError: () => checkRequiredLoginFields,
                  errorLabel: "First Name is required",
                }}
              />
              <button className="flex text-xs gap-2 pt-1 pl-2 text-brand-indiGlow hover:text-brand-persianBlue">
                Add New{" "}
                <span>
                  <PlusIcon className="size-4" />
                </span>
              </button>
            </div>
          </FormCell>
          <FormCell>
            <InputHandler
              props={{
                ...findInputById(defaultFields!, "year")!,
                setValue: inputHelper,
                //   showError: validateRequiredField(
                //     "email",
                //     defaultFields
                //   )
                //     ? true
                //     : false,
              }}
            />
          </FormCell>
          <FormCell>
            <InputHandler
              props={{
                ...findInputById(defaultFields!, "name")!,
                setValue: inputHelper,
              }}
            />
          </FormCell>
          <FormCell>
            <InputHandler
              props={{
                ...findInputById(defaultFields!, "licenseNumber")!,
                setValue: inputHelper,
              }}
            />
          </FormCell>
          <FormCell>
            <InputHandler
              props={{
                ...findInputById(defaultFields!, "vin")!,
                setValue: inputHelper,
              }}
            />
          </FormCell>

          <FormCell>
            <div>
              <InputHandler
                props={{
                  ...findInputById(defaultFields!, "color")!,
                  setValue: inputHelper,
                  showError: false,
                  // setShowError: () => checkRequiredLoginFields,
                  errorLabel: "First Name is required",
                }}
              />
              <button className="flex gap-2 pt-1 pl-2 text-brand-indiGlow hover:text-brand-persianBlue">
                Add New{" "}
                <span>
                  <PlusIcon className="size-4" />
                </span>
              </button>
            </div>
          </FormCell>
          <FormCell>
            <InputHandler
              props={{
                ...findInputById(defaultFields!, "energyType")!,
                setValue: inputHelper,
              }}
            />
          </FormCell>
          <FormCell>
            <ComboBoxInput
              props={{ ...findInputById(defaultFields!, "energyType")! }}
            />
          </FormCell>
          <FormCell>
            <InputHandler
              props={{
                ...findInputById(defaultFields!, "baseMileage")!,
                setValue: inputHelper,
              }}
            />
          </FormCell>
        </>
      </FormSection>
    </>
  );
};
