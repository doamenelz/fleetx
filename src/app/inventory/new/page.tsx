"use client";

import {
  Button,
  BUTTON_SKIN,
  findInputById,
  FormCell,
  FormProgressStep,
  FormProgressView,
  FormSection,
  FormSectionLayout,
  INPUT_TYPES,
  InputHandler,
  InputObject,
  NOTIFICATION_TYPE,
  PageContainer,
  PageLoader,
  SCREEN_WIDTH,
  SectionHeader,
  TextInputProps,
} from "@/components";
import { setInputs, showNotification } from "@/lib/utilities/helperFunctions";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { DefaultVehicleInputFields } from "../models/defaultVehicleInputFields";
import { FormVehicleGenInfo } from "./components/FormVehicleGeneralInformation";
import { Manufacturer } from "@/models/Vehicle/Manufacturer";
import { RootContext } from "@/context/RootContext";
import { API_HEADERS, apiHandler } from "@/lib/utilities/apiHelper";

export default function Page() {
  const loc = usePathname();
  const rootContext = useContext(RootContext);
  const [showModal, setShowModal] = useState(false);
  const formSteps: FormProgressStep[] = [
    {
      id: "01",
      label: "Manufacturer",
      description: "-",
      status: "current",
      action: () => {},
    },
    {
      id: "02",
      label: "Selected Model",
      description: "-",
      status: "upcoming",
      action: () => {},
    },
    {
      id: "03",
      label: "Selected Trim",
      description: "-",
      status: "upcoming",
      action: () => {},
    },
    {
      id: "04",
      label: "Other Information",
      description: "",
      status: "upcoming",
      action: () => {},
    },
  ];
  const [defaultFields, setDefaultFields] = useState<TextInputProps[]>();
  const [vehicleInput, setVehicleInput] = useState<InputObject[]>([]);
  const [showErrors, setShowErrors] = useState(true);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [energyTypes, setEnergyTypes] =
    useState<{ id: string; name: string; unit: string }[]>();
  const [currentStep, setCurrentStep] = useState(0);
  const [allSteps, setAllSteps] = useState<FormProgressStep[]>(formSteps);

  const inputHelper = (input: InputObject) => {
    console.log("Input helper called");
    setVehicleInput(
      vehicleInput.map((item) => {
        if (item.id === input.id) {
          return {
            ...item,
            stringValue: input.stringValue,
            boolValue: input.boolValue,
            // dateValue: input.dateValue,
          };
        } else {
          return item;
        }
      })
    );
  };

  const getManufacturer = () => {
    const _config = sessionStorage.getItem("configurations");
    if (_config !== null) {
      const parseConfig = JSON.parse(_config);
      const parsedManufacturers = parseConfig.find(
        (item: { type: string }) => item.type === "VEHICLE_MANUFACTURERS"
      ) as { type: string; manufacturers: Manufacturer[] };
      console.log(parsedManufacturers);
      setManufacturers(parsedManufacturers.manufacturers);
    }
  };

  const getColors = () => {
    const _config = sessionStorage.getItem("configurations");
    if (_config !== null) {
      const parseConfig = JSON.parse(_config);
      const parsedColors = parseConfig.find(
        (item: { type: string }) => item.type === "COLORS"
      ) as { type: string; colors: string[] };
      console.log(parsedColors);
      setColors(parsedColors.colors);
    }
  };

  const getEnergyTypes = () => {
    const _config = sessionStorage.getItem("configurations");
    if (_config !== null) {
      const parseConfig = JSON.parse(_config);
      const parsedEnergyTypes = parseConfig.find(
        (item: { type: string }) => item.type === "ENERGY_TYPES"
      ) as {
        type: string;
        types: { id: string; name: string; unit: string }[];
      };
      console.log(parsedEnergyTypes);
      setEnergyTypes(parsedEnergyTypes.types);
    }
  };

  const enableNextButton = () => {
    switch (currentStep) {
      case 0:
        const _selectedMan = vehicleInput.find(
          (input) => input.id === "manufacturer"
        )?.stringValue;
        return _selectedMan !== undefined ? false : true;
      case 1:
        const _selectedModel = vehicleInput.find(
          (input) => input.id === "model"
        )?.stringValue;
        return _selectedModel !== undefined ? false : true;
      case 2:
        const _selectedTrim = vehicleInput.find(
          (input) => input.id === "trim"
        )?.stringValue;
        return _selectedTrim !== undefined ? false : true;
      case 3:
        return false;

      default:
        return true;
    }
  };
  const parsePreviousStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        setAllSteps([
          {
            ...allSteps[0],
            status: "current",
            description: "-",
          },
          {
            ...allSteps[1],
            status: "upcoming",
            description: "-",
          },
          {
            ...allSteps[2],
            status: "upcoming",
          },
          {
            ...allSteps[3],
            status: "upcoming",
          },
        ]);

        inputHelper({
          id: "model",
          stringValue: undefined,
          type: INPUT_TYPES.combo,
        });
        inputHelper({
          id: "manufacturer",
          stringValue: undefined,
          type: INPUT_TYPES.combo,
        });
        setCurrentStep(currentStep + -1);

        break;
      case 2:
        setAllSteps([
          {
            ...allSteps[0],
          },
          {
            ...allSteps[1],
            status: "current",
            description: "-",
          },
          {
            ...allSteps[2],
            status: "upcoming",
            description: "-",
          },
          {
            ...allSteps[3],
            status: "upcoming",
          },
        ]);

        inputHelper({
          id: "trim",
          stringValue: undefined,
          type: INPUT_TYPES.combo,
        });
        inputHelper({
          id: "model",
          stringValue: undefined,
          type: INPUT_TYPES.combo,
        });
        setCurrentStep(currentStep + -1);

        break;

      default:
        setAllSteps([
          {
            ...allSteps[0],
          },
          {
            ...allSteps[1],
          },
          {
            ...allSteps[2],
            status: "current",
            description: "-",
          },
          {
            ...allSteps[3],
            status: "upcoming",
          },
        ]);

        inputHelper({
          id: "trim",
          stringValue: undefined,
          type: INPUT_TYPES.combo,
        });

        setCurrentStep(currentStep + -1);

        break;
    }
  };

  const parseStepsAction = async (currentStep: number) => {
    switch (currentStep) {
      case 0:
        const _selectedMan = vehicleInput.find(
          (input) => input.id === "manufacturer"
        );

        console.log(_selectedMan);

        if (_selectedMan !== undefined) {
          setAllSteps([
            {
              ...allSteps[0],
              status: "complete",
              description: _selectedMan.stringValue!,
            },
            {
              ...allSteps[1],
              status: "current",
            },
            {
              ...allSteps[2],
            },
            {
              ...allSteps[3],
            },
          ]);

          setCurrentStep((currentStep += 1));
        } else {
          //TODO: Handle
          //show error to manufacturer field
        }
        break;
      case 1:
        const _selectedModel = vehicleInput.find(
          (input) => input.id === "model"
        )?.stringValue;

        if (_selectedModel !== undefined) {
          setAllSteps([
            {
              ...allSteps[0],
            },
            {
              ...allSteps[1],
              status: "complete",
              description: _selectedModel,
            },
            {
              ...allSteps[2],
              status: "current",
            },
            {
              ...allSteps[3],
            },
          ]);
          setCurrentStep((currentStep += 1));
        } else {
          //TODO: Handle Error
        }
        break;
      case 2:
        const _selectedTrim = vehicleInput.find((input) => input.id === "trim");

        if (_selectedTrim !== undefined) {
          setAllSteps([
            {
              ...allSteps[0],
            },
            {
              ...allSteps[1],
            },
            {
              ...allSteps[2],
              status: "complete",
              description: _selectedTrim.stringValue!,
            },
            {
              ...allSteps[3],
              status: "current",
            },
          ]);

          setCurrentStep((currentStep += 1));
          inputHelper({
            id: "type",
            stringValue: "Sedan",
            type: INPUT_TYPES.text,
          });
        } else {
          //TODO: Handle
        }

        break;

      default:
        setAllSteps(
          allSteps.map((step) => {
            if (step.id === allSteps[0].id) {
              return {
                ...step,
                status: "complete",
                description: "selectedManufacturer",
              };
            } else {
              return step;
            }
          })
        );
        setCurrentStep((currentStep += 1));
        break;
    }
  };

  const nextStep = (currentStep: number) => {
    //Check if its the last step then
    if (currentStep !== 3) {
      parseStepsAction(currentStep);
    } else {
      //perform steps to verify and submit the form
    }
    console.log(vehicleInput);
  };

  const previousStep = (currentStep: number) => {
    parsePreviousStep(currentStep);
  };

  const submitVehicle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(true);

    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/inventory`,
      method: "POST",
      body: JSON.stringify({
        username: userInfoInput.find((input) => input.id === "username")
          ?.stringValue,
        password: userInfoInput.find((input) => input.id === "password")
          ?.stringValue,
      }),
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      console.log(api);
      const apiCompletion = (await api.data.message) as string;
      console.log(`Completion is ${apiCompletion}`);

      // setShowModal(false);
    } else {
      setShowModal(false);
      console.log("Failed");
      showNotification(
        NOTIFICATION_TYPE.error,
        "Something went wrong",
        api.errorMessage ?? "",
        rootContext
      );
    }
  };

  useEffect(() => {
    const _defaultFields: TextInputProps[] = DefaultVehicleInputFields().map(
      (item) => {
        return item;
      }
    );
    setDefaultFields(_defaultFields);
    getManufacturer();
    getColors();
    getEnergyTypes();
    setInputs(DefaultVehicleInputFields(), setVehicleInput);
    //   getFields();
  }, []);
  return (
    <PageContainer
      documentTitle="Inventory - New Vehicle"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showFooter={false}
      showHeader={false}
      breadCrumbs={[
        {
          name: "Create Vehicle",
          href: "",
          id: "1",
        },
      ]}
    >
      <form
        className="pt-1 "
        onSubmit={submitVehicle}
        encType="multipart/form-data"
        id="createVehicleForm"
      >
        <div className="sticky top-12 space-y-1 border-b pb-4 z-10 backdrop-blur-sm bg-white/30">
          <SectionHeader
            title="New Vehicle"
            copy="Add a new vehicle to your fleet"
            button={
              <div className="flex items-end justify-end gap-2">
                <Button
                  label="Cancel"
                  destructive
                  onClick={() => {
                    console.log(vehicleInput);
                  }}
                  skin={BUTTON_SKIN.secondaryColor}
                />
                {currentStep !== 0 && (
                  <Button
                    label="Previous"
                    onClick={() => previousStep(currentStep)}
                    skin={BUTTON_SKIN.secondaryColor}
                  />
                )}

                <Button
                  label="Next"
                  // type="submit"
                  onClick={() => nextStep(currentStep)}
                  disabled={enableNextButton()}
                  //   disabled={checkFormRequiredFields() ? true : false}
                />
                <Button
                  label="Create Vehicle"
                  type="submit"
                  // onClick={() => nextStep(currentStep)}
                  // disabled={enableNextButton()}
                  //   disabled={checkFormRequiredFields() ? true : false}
                />
              </div>
            }
          />
          <FormProgressView steps={allSteps} />
        </div>

        {defaultFields !== undefined && (
          <>
            <FormSectionLayout>
              <>
                <FormVehicleGenInfo
                  defaultFields={defaultFields}
                  inputHelper={inputHelper}
                  step={allSteps[currentStep].id}
                  manufacturers={manufacturers}
                  selectedManufacturer={allSteps[0].description}
                  selectedModel={allSteps[1].description}
                  selectedTrim={allSteps[2].description}
                  colors={colors}
                  energyTypes={energyTypes}
                />
              </>
            </FormSectionLayout>
          </>
        )}
        {/* <SectionHeader title="Create Vehicle" /> */}
      </form>
      {showModal && <PageLoader size="md" label="Creating Vehicle..." />}
    </PageContainer>
  );
}
