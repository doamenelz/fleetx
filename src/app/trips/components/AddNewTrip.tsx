import {
  BasicTextInput,
  Button,
  BUTTON_SKIN,
  ComboBoxInput,
  DatePicker,
  Dropdown,
  FormCell,
  FormSection,
  GRID_TYPE,
  GridLayout,
  ICON_POSITION,
  INPUT_SIZE,
  SectionHeader,
  TextArea,
  TimePicker,
} from "@/components";
import { useToast } from "../../../hooks/use-toast";
import { AppSettings, Trip } from "@/models";
import { FC, useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Trash } from "lucide-react";
import { LocationFleet } from "@/models/Location";

//TODO: Add the API call to get the trip types
//TODO: Replace APPSettings with Office Locations
export const AddNewTrip: FC<{
  dismiss: () => void;
  trip?: Trip;
}> = ({ dismiss, trip }) => {
  const appSettings: AppSettings | null = sessionStorage.getItem("app_settings")
    ? JSON.parse(sessionStorage.getItem("app_settings") as string)
    : null;
  const tripClassOptions = appSettings?.trip.class ?? [];
  const officeLocationOptions = appSettings?.officeLocations ?? [];

  const [name, setName] = useState(trip ? trip.name : "");
  const [description, setDescription] = useState(trip ? trip.description : "");
  const [pickUpLocation, setPickupLocation] = useState(
    trip ? trip.pickupLocation : appSettings?.officeLocations[0]
  );
  const [pickUpTime, setPickupTime] = useState(
    trip ? trip.pickupTime : "12:00AM"
  );
  const [dropOffLocation, setDropOffLocation] = useState(
    trip ? trip.dropOffLocation : appSettings?.officeLocations[0]
  );
  const [requestedSeats, setRequestedSeats] = useState(
    trip ? trip.requestedSeats : "1"
  );

  const [tripClass, setTripClass] = useState(
    trip ? trip.tripClass : appSettings?.trip.class[0]
  );

  const [validateForm, setValidateForm] = useState(false);

  /**
   * Pickup Location - Start
   */
  const locationCategory = ["Office", "New"];
  const [pickUpLocationCategory, setPickUpLocationCategory] = useState(
    locationCategory[0]
  );
  const [officePickUpLocation, setOfficePickUpLocation] = useState(
    trip
      ? trip.pickupLocation.category === "Office"
        ? trip.pickupLocation
        : appSettings?.officeLocations[0]
      : appSettings?.officeLocations[0]
  );

  const [pickupLine1, setPickupLine1] = useState(
    trip
      ? trip.pickupLocation.category === "Saved" ||
        trip.pickupLocation.category === "New"
        ? trip.pickupLocation.line1
        : ""
      : ""
  );
  const [pickupLine2, setPickupLine2] = useState(
    trip
      ? trip.pickupLocation.category === "Saved" ||
        trip.pickupLocation.category === "New"
        ? trip.pickupLocation.line2
        : ""
      : ""
  );
  const [pickupCity, setPickupCity] = useState(
    trip
      ? trip.pickupLocation.category === "Saved" ||
        trip.pickupLocation.category === "New"
        ? trip.pickupLocation.city
        : ""
      : ""
  );
  const [pickupState, setPickupState] = useState(
    trip
      ? trip.pickupLocation.category === "Saved" ||
        trip.pickupLocation.category === "New"
        ? trip.pickupLocation.state
        : ""
      : ""
  );
  const [pickupzipCode, setPickupzipCode] = useState(
    trip
      ? trip.pickupLocation.category === "Saved" ||
        trip.pickupLocation.category === "New"
        ? trip.pickupLocation.zipCode
        : ""
      : ""
  );
  const [pickupDay, setPickUpDay] = useState(
    trip ? new Date(trip.pickupDay) : new Date()
  );
  /**
   * Pickup Location - End
   */

  /**
   * Drop Off Location Start
   */
  const [dropOffLocationCategory, setDropOffLocationCategory] = useState(
    locationCategory[0]
  );
  const [officeDropOffLocation, setOfficeDropOffLocation] = useState(
    trip
      ? trip.dropOffLocation.category === "Office"
        ? trip.dropOffLocation
        : appSettings?.officeLocations[0]
      : appSettings?.officeLocations[0]
  );

  const [dropOffLine1, setDropOffLine1] = useState(
    trip
      ? trip.dropOffLocation.category === "Saved" ||
        trip.dropOffLocation.category === "New"
        ? trip.dropOffLocation.line1
        : ""
      : ""
  );
  const [dropOffLine2, setDropOffLine2] = useState(
    trip
      ? trip.dropOffLocation.category === "Saved" ||
        trip.dropOffLocation.category === "New"
        ? trip.dropOffLocation.line2
        : ""
      : ""
  );
  const [dropOffCity, setDropOffCity] = useState(
    trip
      ? trip.dropOffLocation.category === "Saved" ||
        trip.dropOffLocation.category === "New"
        ? trip.dropOffLocation.city
        : ""
      : ""
  );
  const [dropOffState, setDropOffState] = useState(
    trip
      ? trip.dropOffLocation.category === "Saved" ||
        trip.dropOffLocation.category === "New"
        ? trip.dropOffLocation.state
        : ""
      : ""
  );
  const [dropOffZipCode, setDropOffZipCode] = useState(
    trip
      ? trip.dropOffLocation.category === "Saved" ||
        trip.dropOffLocation.category === "New"
        ? trip.dropOffLocation.zipCode
        : ""
      : ""
  );

  const { toast } = useToast();
  useEffect(() => {}, []);

  const validationRules = () => {
    const nameFailed = validateForm && name.length <= 5 ? true : false;
    const descriptionFailed =
      validateForm && description.length <= 10 ? true : false;
    // const odometerFailed = validateForm && odometer.length <= 0 ? true : false;
    return [nameFailed, descriptionFailed];
  };
  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateForm(true);
    if (!validationRules().includes(true)) {
      console.log("Okay to submit");
    }
  };

  return (
    <form
      className=""
      onSubmit={formHandler}
    >
      <SectionHeader
        title={"Log a New trip"}
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

      <div className="px-8">
        <FormSection
          label="Basic Details"
          hasBottomBorder
        >
          <>
            <FormCell>
              <BasicTextInput
                label="Name"
                id="name"
                placeholder="Enter a name for your Trip"
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
                label="Class"
                required={true}
                id="tripClass"
                value={tripClass ?? ""}
                items={tripClassOptions}
                onChangeHandler={(event: string) => {
                  setTripClass(event);
                }}
              />
            </FormCell>
            <FormCell>
              <TextArea
                placeholder="Describe the trip you the vehicle is experiencing"
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
              <BasicTextInput
                type="number"
                label="Requested # of Seats"
                required={true}
                id="odometer"
                placeholder="Enter the odometer reading"
                value={requestedSeats?.toString() ?? "1"}
                onChangeHandler={(event: React.FormEvent<HTMLInputElement>) => {
                  setRequestedSeats(event.currentTarget.value);
                }}
                errorLabel="Provide a valid value"
                showError={validationRules()[2]}
              />
            </FormCell>
          </>
        </FormSection>
        <FormSection
          hasBottomBorder
          label="Pickup Details"
        >
          <>
            <FormCell>
              <Dropdown
                label="Pick Up Category"
                required={true}
                id="pickUpLocationCategory"
                value={pickUpLocationCategory}
                items={locationCategory}
                onChangeHandler={setPickUpLocationCategory}
              />
            </FormCell>
            {pickUpLocationCategory === "Office" && (
              <>
                <FormCell>
                  <ComboBoxInput
                    label="Pickup Location"
                    id="office-pickup-location"
                    value={officePickUpLocation?.line1 ?? ""}
                    defaultValue={officePickUpLocation?.line1 ?? ""}
                    items={officeLocationOptions.map((loc) => loc.line1)}
                    onChangeHandler={(event: string) => {
                      setOfficePickUpLocation(
                        officeLocationOptions.find((loc) => loc.line1 === event)
                      );
                    }}
                  />
                </FormCell>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <FormCell>
                      <DatePicker
                        label="PickUp Day"
                        id="name"
                        required={true}
                        selectedDate={pickupDay}
                        onChangeHandler={setPickUpDay}
                        errorLabel="Minimum of 6 characters"
                        showError={validationRules()[0]}
                      />
                    </FormCell>
                  </div>
                  <FormCell>
                    <TimePicker
                      label="Time"
                      id="name"
                      time={pickUpTime}
                      onChangeHandler={setPickupTime}
                    />
                  </FormCell>
                </div>
              </>
            )}
            {pickUpLocationCategory === "New" && (
              <>
                <FormCell>
                  <BasicTextInput
                    label="Line 1"
                    id="pickupLine1"
                    value={pickupLine1}
                    defaultValue={pickupLine1}
                    required
                    placeholder="Enter your street address"
                    onChangeHandler={(
                      event: React.FormEvent<HTMLInputElement>
                    ) => {
                      setPickupLine1(event.currentTarget.value);
                    }}
                  />
                </FormCell>
                <FormCell>
                  <BasicTextInput
                    label="Line 2"
                    id="pickupLine"
                    value={pickupLine2 ?? ""}
                    defaultValue={pickupLine2}
                    placeholder="Unit, Suite"
                    onChangeHandler={(
                      event: React.FormEvent<HTMLInputElement>
                    ) => {
                      setPickupLine2(event.currentTarget.value);
                    }}
                  />
                </FormCell>
                <GridLayout type={GRID_TYPE.twoCol}>
                  <FormCell>
                    <BasicTextInput
                      label="City"
                      id="pickupCity"
                      value={pickupCity}
                      required
                      defaultValue={pickupCity}
                      placeholder="Enter your City"
                      onChangeHandler={(
                        event: React.FormEvent<HTMLInputElement>
                      ) => {
                        setPickupCity(event.currentTarget.value);
                      }}
                    />
                  </FormCell>
                  <FormCell>
                    <BasicTextInput
                      label="Zip (Postal) Code"
                      id="zipCode"
                      value={pickupzipCode ?? ""}
                      defaultValue={pickupzipCode}
                      placeholder="AAA 123"
                      onChangeHandler={(
                        event: React.FormEvent<HTMLInputElement>
                      ) => {
                        setPickupzipCode(event.currentTarget.value);
                      }}
                    />
                  </FormCell>
                </GridLayout>
                <GridLayout type={GRID_TYPE.twoCol}>
                  <FormCell>
                    <BasicTextInput
                      label="State"
                      id="pickupState"
                      value={pickupState}
                      defaultValue={pickupState}
                      placeholder="Enter your street address"
                      onChangeHandler={(
                        event: React.FormEvent<HTMLInputElement>
                      ) => {
                        setPickupState(event.currentTarget.value);
                      }}
                    />
                  </FormCell>

                  <FormCell>
                    <ComboBoxInput
                      label="Country"
                      id="severity"
                      value={pickUpLocation?.line1 ?? ""}
                      defaultValue={pickUpLocation?.line1 ?? ""}
                      items={officeLocationOptions.map((loc) => loc.line1)}
                      onChangeHandler={(event: string) => {
                        setPickupLocation(
                          officeLocationOptions.find(
                            (loc) => loc.line1 === event
                          )
                        );
                      }}
                    />
                  </FormCell>
                </GridLayout>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <FormCell>
                      <DatePicker
                        label="PickUp Day"
                        id="name"
                        required={true}
                        selectedDate={pickupDay}
                        onChangeHandler={setPickUpDay}
                        errorLabel="Minimum of 6 characters"
                        showError={validationRules()[0]}
                      />
                    </FormCell>
                  </div>
                  <FormCell>
                    <TimePicker
                      label="Time"
                      id="name"
                      time={pickUpTime}
                      onChangeHandler={setPickupTime}
                    />
                  </FormCell>
                </div>
              </>
            )}
          </>
        </FormSection>
        <FormSection label="Drop Off Details">
          <>
            <FormCell>
              <Dropdown
                label="Drop off Category"
                required={true}
                id="dropOffLocationCategory"
                value={dropOffLocationCategory}
                items={locationCategory}
                onChangeHandler={setDropOffLocationCategory}
              />
            </FormCell>
            {dropOffLocationCategory === "Office" && (
              <>
                <FormCell>
                  <ComboBoxInput
                    label="Drop Off Location"
                    id="office-drop-location"
                    value={officeDropOffLocation?.line1 ?? ""}
                    defaultValue={officeDropOffLocation?.line1 ?? ""}
                    items={officeLocationOptions.map((loc) => loc.line1)}
                    onChangeHandler={(event: string) => {
                      setOfficeDropOffLocation(
                        officeLocationOptions.find((loc) => loc.line1 === event)
                      );
                    }}
                  />
                </FormCell>
              </>
            )}
            {dropOffLocationCategory === "New" && (
              <>
                <FormCell>
                  <BasicTextInput
                    label="Line 1"
                    id="pickupLine1"
                    value={dropOffLine1}
                    defaultValue={dropOffLine1}
                    required
                    placeholder="Enter your street address"
                    onChangeHandler={(
                      event: React.FormEvent<HTMLInputElement>
                    ) => {
                      setDropOffLine1(event.currentTarget.value);
                    }}
                  />
                </FormCell>
                <FormCell>
                  <BasicTextInput
                    label="Line 2"
                    id="pickupLine"
                    value={dropOffLine2 ?? ""}
                    defaultValue={dropOffLine2}
                    placeholder="Unit, Suite"
                    onChangeHandler={(
                      event: React.FormEvent<HTMLInputElement>
                    ) => {
                      setDropOffLine2(event.currentTarget.value);
                    }}
                  />
                </FormCell>
                <GridLayout type={GRID_TYPE.twoCol}>
                  <FormCell>
                    <BasicTextInput
                      label="City"
                      id="pickupCity"
                      value={dropOffCity}
                      required
                      defaultValue={dropOffCity}
                      placeholder="Enter your City"
                      onChangeHandler={(
                        event: React.FormEvent<HTMLInputElement>
                      ) => {
                        setDropOffCity(event.currentTarget.value);
                      }}
                    />
                  </FormCell>
                  <FormCell>
                    <BasicTextInput
                      label="Zip (Postal) Code"
                      id="zipCode"
                      value={dropOffZipCode ?? ""}
                      defaultValue={dropOffZipCode}
                      placeholder="AAA 123"
                      onChangeHandler={(
                        event: React.FormEvent<HTMLInputElement>
                      ) => {
                        setDropOffZipCode(event.currentTarget.value);
                      }}
                    />
                  </FormCell>
                </GridLayout>
                <GridLayout type={GRID_TYPE.twoCol}>
                  <FormCell>
                    <BasicTextInput
                      label="State"
                      id="pickupState"
                      value={dropOffState}
                      defaultValue={dropOffState}
                      placeholder="Enter your street address"
                      onChangeHandler={(
                        event: React.FormEvent<HTMLInputElement>
                      ) => {
                        setDropOffState(event.currentTarget.value);
                      }}
                    />
                  </FormCell>

                  <FormCell>
                    <ComboBoxInput
                      label="Country"
                      id="severity"
                      value={dropOffLocation?.line1 ?? ""}
                      defaultValue={dropOffLocation?.line1 ?? ""}
                      items={officeLocationOptions.map((loc) => loc.line1)}
                      onChangeHandler={(event: string) => {
                        setDropOffLocation(
                          officeLocationOptions.find(
                            (loc) => loc.line1 === event
                          )
                        );
                      }}
                    />
                  </FormCell>
                </GridLayout>
              </>
            )}
          </>
        </FormSection>
      </div>
    </form>
  );
};
