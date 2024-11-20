import {
  Button,
  BUTTON_SKIN,
  ComboBoxInput,
  findInputById,
  FormCell,
  FormSection,
  InputHandler,
  InputObject,
  TextInputProps,
} from "@/components";
import { Manufacturer } from "@/models/Vehicle/Manufacturer";
import { PlusIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
export const FormVehicleGenInfo: FC<{
  defaultFields: TextInputProps[];
  inputHelper: Function;
  step: string;
  manufacturers: Manufacturer[];
  selectedManufacturer?: string;
  selectedModel?: string;
  selectedTrim?: string;
  colors: string[];
  defaultValueHelper: Function;
  energyTypes: { id: string; name: string; unit: string }[] | undefined;
}> = ({
  defaultFields,
  inputHelper,
  step,
  manufacturers,
  selectedManufacturer,
  selectedModel,
  selectedTrim,
  colors,
  energyTypes,
  defaultValueHelper,
}) => {
  return (
    <>
      <FormSection label="General Information">
        <>
          {step === "01" && ( //select a manufacturer
            <FormCell>
              <div>
                <InputHandler
                  props={{
                    ...findInputById(defaultFields!, "manufacturer")!,
                    setValue: inputHelper,
                    showError: false,
                    items: manufacturers.map(
                      (manufacturer) => manufacturer.name
                    ),
                    // defaultValue: selectedManufacturer,
                    errorLabel: "Please select a Manufacturer",
                    disabled: step !== "01" ? true : false,
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
          )}
          {step === "02" && ( //select a model
            <FormCell>
              <div>
                <InputHandler
                  props={{
                    ...findInputById(defaultFields!, "model")!,
                    setValue: inputHelper,
                    items: manufacturers
                      .find((man) => man.name === selectedManufacturer)
                      ?.models.map((model) => model.name),
                    // defaultValue: selectedModel,
                    showError: false,
                    errorLabel: "",
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
          )}
          {step === "03" && ( //select a trim
            <FormCell>
              <div>
                <InputHandler
                  props={{
                    ...findInputById(defaultFields!, "trim")!,
                    setValue: inputHelper,
                    showError: false,
                    // setShowError: () => checkRequiredLoginFields,
                    errorLabel: "",
                    items: manufacturers
                      .find((man) => man.name === selectedManufacturer)
                      ?.models.find((model) => model.name === selectedModel)
                      ?.trims.map((trim) => trim.name),
                    // defaultValue: selectedTrim,
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
          )}

          {step === "04" && ( //other Information
            <>
              <FormCell>
                <div>
                  <InputHandler
                    props={{
                      ...findInputById(defaultFields!, "type")!,
                      setValue: inputHelper,
                      showError: false,
                      disabled: true,
                      defaultValue: manufacturers
                        .find((man) => man.name === selectedManufacturer)
                        ?.models.find((model) => model.name === selectedModel)
                        ?.trims.find((trim) => trim.name === selectedTrim)
                        ?.class,
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
                    ...findInputById(defaultFields!, "year")!,
                    setValue: inputHelper,
                    defaultValue: defaultValueHelper("year"),
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(defaultFields!, "name")!,
                    setValue: inputHelper,
                    defaultValue: defaultValueHelper("name"),
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(defaultFields!, "licenseNumber")!,
                    setValue: inputHelper,
                    defaultValue: defaultValueHelper("licenseNumber"),
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(defaultFields!, "vin")!,
                    setValue: inputHelper,
                    defaultValue: defaultValueHelper("vin"),
                  }}
                />
              </FormCell>
              <FormCell>
                <div>
                  <InputHandler
                    props={{
                      ...findInputById(defaultFields!, "color")!,
                      setValue: inputHelper,
                      items: colors,
                      defaultValue: defaultValueHelper("color"),
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
                    items: energyTypes?.map((energy) => energy.name),
                    defaultValue: defaultValueHelper("energyType"),
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(defaultFields!, "baseMileage")!,
                    setValue: inputHelper,
                    defaultValue: defaultValueHelper("baseMileage"),
                  }}
                />
              </FormCell>
            </>
          )}
        </>
      </FormSection>
    </>
  );
};
