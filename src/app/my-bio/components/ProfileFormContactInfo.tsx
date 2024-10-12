"use client";

import { Employee } from "@/models";
import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  SectionHeader,
  InputHandler,
  findInputById,
  TextLabel,
  GRID_TYPE,
  GridLayout,
  Button,
  BUTTON_SKIN,
  InputObject,
  BodyCopy,
  AddressCopy,
} from "@/components";
import { BasicInfo, ContactInfo } from "./ProfileFormView.types";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { setInputs } from "@/lib/utilities/helperFunctions";

export const EditContactInformation: FC<{
  employee?: Employee;
  dismissModal: Dispatch<SetStateAction<boolean>>;
}> = ({ employee, dismissModal }) => {
  const [contactInputs, setContactInputs] = useState<InputObject[]>([]);

  const parsedInput = ContactInfo(employee!);

  useEffect(() => {
    setInputs(parsedInput, setContactInputs);
  }, []);

  const inputHelper = (input: InputObject) => {
    setContactInputs(
      contactInputs.map((item) => {
        if (item.id === input.id) {
          return {
            ...item,
            stringValue: input.stringValue,
            // dateValue: input.dateValue,
          };
        } else {
          return item;
        }
      })
    );
  };
  return (
    <div className="p-4 space-y-6 linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241)) h-full">
      <SectionHeader title="Edit Contact Information" />
      <GridLayout type={GRID_TYPE.twoCol}>
        <InputHandler
          props={{
            ...findInputById(parsedInput, "personalMobile")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "personalEmail")!,
            placeHolder: employee!.bioData.firstName,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "officeEmail")!,
            placeHolder: employee!.bioData.lastName,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "officeExtension")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "residentialAddress")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "residentialAddressCity")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "residentialAddressState")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "residentialAddressCountry")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "permanentAddress")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "permanentAddressCity")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "permanentAddressState")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "permanentAddressCountry")!,
            setValue: inputHelper,
          }}
        />
      </GridLayout>
      <div className="flex gap-2">
        <Button
          label="Submit Request"
          onClick={() => {
            console.log(contactInputs);
          }}
          skin={BUTTON_SKIN.primary}
        />
        <Button
          label="Cancel"
          onClick={() => dismissModal(false)}
          skin={BUTTON_SKIN.secondaryColor}
          destructive
        />
      </div>
    </div>
  );
};

export const ContactInformationCopy: FC<{ employee?: Employee }> = ({
  employee,
}) => {
  const parsedInput = ContactInfo(employee!);
  return (
    <GridLayout type={GRID_TYPE.twoCol}>
      <TextLabel
        label={findInputById(parsedInput, "personalMobile")?.label ?? ""}
        copy={employee?.contactDetails?.phoneNumber}
      />
      <TextLabel
        label={findInputById(parsedInput, "personalEmail")?.label ?? ""}
        copy={employee?.contactDetails?.emailAddress}
      />
      <TextLabel
        label={findInputById(parsedInput, "officeEmail")?.label ?? ""}
        copy={employee?.contactDetails?.officialEmail}
      />
      <TextLabel
        label={findInputById(parsedInput, "officeExtension")?.label ?? ""}
        copy={employee?.contactDetails?.officeExtension}
      />
      <TextLabel
        label={findInputById(parsedInput, "residentialAddress")?.label ?? ""}
        copy={
          employee?.contactDetails?.residentialAddress ? (
            <AddressCopy
              address={employee?.contactDetails?.residentialAddress}
            />
          ) : (
            ""
          )
        }
      />
      <TextLabel
        label={findInputById(parsedInput, "permanentAddress")?.label ?? ""}
        copy={
          employee?.contactDetails?.permanentAddress ? (
            <AddressCopy address={employee?.contactDetails?.permanentAddress} />
          ) : (
            ""
          )
        }
      />
    </GridLayout>
  );
};
