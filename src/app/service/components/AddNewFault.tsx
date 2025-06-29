import {
  BasicTextInput,
  Button,
  BUTTON_SKIN,
  Dropdown,
  FileUpload,
  FormCell,
  FormSection,
  ICON_POSITION,
  ImageCard,
  ImageStyleUploadCard,
  INPUT_SIZE,
  Lbl,
  PageLoader,
  SectionHeader,
  TextArea,
} from "@/components";
import { useToast } from "../../../hooks/use-toast";
import {
  FAULT_CONFIG,
  getConfigurations,
  Vehicle,
  VehicleFault,
} from "@/models";
import { FC, useContext, useState } from "react";
import { ArrowRight, Trash } from "lucide-react";
import { API_HEADERS, apiHandler } from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";
import { HomeContext } from "@/context/HomeContext";
import { Constants } from "@/models/Shared/Constants";

//TODO: Parse Images from Edit Mode
export const AddNewFault: FC<{
  vehicles: Vehicle[];
  dismiss: () => void;
  fault?: VehicleFault;
}> = ({ vehicles, dismiss, fault }) => {
  const rootContext = useContext(RootContext);
  const homeContext = useContext(HomeContext);

  const faultConfigurations: FAULT_CONFIG = getConfigurations(Constants.FAULT);

  const [name, setName] = useState(fault ? fault.name : "");
  const [description, setDescription] = useState(
    fault ? fault.description : ""
  );
  const [severity, setSeverity] = useState(
    fault ? fault.severity : faultConfigurations.severity[0]
  );
  const [odometer, setOdometer] = useState(fault ? fault.odometer.value : "");
  const [additionalNotes, setAdditionalNotes] = useState(
    fault ? fault.additionalNotes ?? "" : ""
  );
  const [faultType, setFaultType] = useState(
    fault ? fault.faultType : faultConfigurations.types[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState(vehicles[0].name);
  const [images, setImages] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [validateForm, setValidateForm] = useState(false);

  const maxSize = 0.25 * 1024 * 1024;
  const { toast } = useToast();

  const validationRules = () => {
    const nameFailed = validateForm && name.length <= 5 ? true : false;
    const descriptionFailed =
      validateForm && description.length <= 10 ? true : false;
    const odometerFailed = validateForm && odometer.length <= 0 ? true : false;
    return [nameFailed, descriptionFailed, odometerFailed];
  };
  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateForm(true);

    if (name.length > 6 && description.length > 10 && Number(odometer) > 1) {
      setIsLoading(true);

      if (fault) {
        const faultData = {
          name: name,
          description: description,
          severity: severity,
          odometer: {
            value: odometer,
            unit: "km",
          },
          faultType: faultType,
          updatedBy: rootContext.store?.user?.id ?? "",
          additionalNotes: additionalNotes,
          vehicleId: vehicles.find((v) => v.name === vehicle)?.id ?? "",
        };
        const api = await apiHandler({
          url: `${rootContext.envVar.baseURL}/faults/${fault.id}`,
          method: "PATCH",
          body: JSON.stringify(faultData),
          headers: API_HEADERS.baseHeaders,
        });
        if (api.success) {
          setIsLoading(false);
          toast({
            title: "Fault Logged Successfully",
            description: "The fault has been updated successfully.",
            className: "text-green-700",
          });
          homeContext.getFaults();
          dismiss();
        } else {
          setIsLoading(false);
          toast({
            title: "Error Logging Fault",
            description: api.errorMessage,
            className: "text-red-700",
          });
        }
      } else {
        const faultData = {
          name: name,
          description: description,
          severity: severity,
          odometer: {
            value: odometer,
            unit: "km",
          },
          faultType: faultType,
          createdBy: rootContext.store?.user?.id ?? "",
          additionalNotes: additionalNotes,
          vehicleId: vehicles.find((v) => v.name === vehicle)?.id ?? "",
        };
        const api = await apiHandler({
          url: `${rootContext.envVar.baseURL}/faults`,
          method: "POST",
          body: JSON.stringify(faultData),
          headers: API_HEADERS.baseHeaders,
        });

        if (api.success) {
          setIsLoading(false);
          toast({
            title: "Fault Logged Successfully",
            description: "The fault has been logged successfully.",
            className: "text-green-700",
          });
          homeContext.getFaults();
          dismiss();
        } else {
          setIsLoading(false);
          toast({
            title: "Error Logging Fault",
            description: api.errorMessage,
            className: "text-red-700",
          });
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={formHandler}>
        <SectionHeader
          title={"Log a New Fault"}
          button={
            <div className="flex gap-2">
              <Button
                type="button"
                label="Cancel"
                skin={BUTTON_SKIN.secondaryColor}
                onClick={dismiss}
              />
              <Button
                label="Submit"
                type="submit"
                onClick={() => formHandler}
                icon={{
                  asset: <ArrowRight className="size-4" />,
                  position: ICON_POSITION.trailing,
                }}
              />
            </div>
          }
        />
        <FormSection
          label="Basic Information"
          copy=""
          hasBottomBorder={true}
        >
          <>
            <FormCell>
              <BasicTextInput
                label="Name"
                id="name"
                placeholder="Enter Fault Name"
                required={true}
                value={name}
                onChangeHandler={(event: React.FormEvent<HTMLInputElement>) => {
                  setName(event.currentTarget.value);
                }}
                errorLabel="Minimum of 6 characters"
                showError={validationRules()[0]}
              />
            </FormCell>
            <FormCell>
              <Dropdown
                label="Type"
                required={true}
                id="faultType"
                value={faultType}
                items={faultConfigurations.types}
                onChangeHandler={(event: string) => {
                  setFaultType(event);
                }}
              />
            </FormCell>
            <FormCell span="full">
              <TextArea
                placeholder="Describe the fault you the vehicle is experiencing"
                label="Description"
                id="description"
                required={true}
                value={description}
                span={INPUT_SIZE.full}
                onChangeHandler={(
                  event: React.FormEvent<HTMLTextAreaElement>
                ) => {
                  setDescription(event.currentTarget.value);
                }}
                errorLabel="Minimum of 10 characters"
                showError={validationRules()[1]}
              />
            </FormCell>
            <FormCell>
              <Dropdown
                label="Severity"
                id="severity"
                value={severity}
                items={faultConfigurations.severity}
                onChangeHandler={(event: string) => {
                  setSeverity(event);
                }}
              />
            </FormCell>
            <FormCell>
              <BasicTextInput
                type="number"
                label="Odometer Reading (km)"
                required={true}
                id="odometer"
                placeholder="Enter the odometer reading"
                value={odometer}
                onChangeHandler={(event: React.FormEvent<HTMLInputElement>) => {
                  setOdometer(event.currentTarget.value);
                }}
                errorLabel="Provide a valid value"
                showError={validationRules()[2]}
              />
            </FormCell>

            <FormCell>
              <Dropdown
                label="Vehicle"
                id="vehicle"
                required={true}
                value={vehicle}
                items={vehicles.map((vehicle) => vehicle.name)}
                onChangeHandler={(event: string) => {
                  setVehicle(event);
                }}
              />
            </FormCell>
          </>
        </FormSection>
        <FormSection label="Additional Information">
          <>
            <FormCell span="full">
              <TextArea
                placeholder="Include any additional notes or comments"
                label="Additional Notes"
                id="additional_notes"
                span={INPUT_SIZE.full}
                value={additionalNotes}
                onChangeHandler={(
                  event: React.FormEvent<HTMLTextAreaElement>
                ) => {
                  setAdditionalNotes(event.currentTarget.value);
                }}
              />
            </FormCell>
            <FormCell span="full">
              <>
                <Lbl label="Images" />
                <div className="flex align-baseline items-start gap-4 pb-6">
                  {images.map((image, index) => (
                    <div className="group pt-1 space-y-0 rounded-md">
                      <ImageCard
                        imageUrl={URL.createObjectURL(image)}
                        key={index}
                        style="object-cover group-hover:border group-hover:border-primary-700 rounded-md mb-2 size-24"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImages(
                            images.filter((image) => image !== images[index])
                          );
                        }}
                        className="items-center px-2 py-1.5 font-medium hover:bg-red-100 bg-gray-100 rounded-sm hover:text-red-700 w-full group-hover:flex justify-between hidden"
                      >
                        Delete
                        <span>
                          <Trash className="size-3" />
                        </span>
                      </button>
                    </div>
                  ))}
                  {images.length < 4 && (
                    <FileUpload
                      uploadButton={<ImageStyleUploadCard />}
                      uploadDescription="Upload Images"
                      permittedUploadTypes=".jpg, .jpeg"
                      label=" "
                      id="image_upload"
                      file={file}
                      onChangeHandler={(
                        event: React.FormEvent<HTMLInputElement>
                      ) => {
                        if (
                          event.currentTarget.files &&
                          event.currentTarget.files.length >= 1 &&
                          !images.some(
                            (image) =>
                              event.currentTarget.files &&
                              image === event.currentTarget.files[0]
                          )
                        ) {
                          if (event.currentTarget.files[0].size > maxSize) {
                            toast({
                              className: "text-red-700",
                              title: "Unable to Attach File",
                              description: "The selected file is > 2MB",
                            });
                          } else {
                            setImages([
                              ...images,
                              event.currentTarget.files[0],
                            ]);
                            event.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </>
            </FormCell>
          </>
        </FormSection>
      </form>

      {isLoading && (
        <PageLoader
          showBackground
          label="Submitting Fault"
        />
      )}
    </>
  );
};
