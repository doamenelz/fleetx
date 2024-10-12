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
import { BasicInfo, ContactInfo, OtherInfo } from "./ProfileFormView.types";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { setInputs } from "@/lib/utilities/helperFunctions";

export const OtherInformation: FC<{
  employee?: Employee;
  dismissModal: Dispatch<SetStateAction<boolean>>;
}> = ({ employee, dismissModal }) => {
  const [otherInfoInputs, setOtherInfo] = useState<InputObject[]>([]);

  const parsedInput = OtherInfo(employee!);

  useEffect(() => {
    setInputs(parsedInput, setOtherInfo);
  }, []);

  const inputHelper = (input: InputObject) => {
    setOtherInfo(
      otherInfoInputs.map((item) => {
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
      <SectionHeader title="Edit Other Information" />
      <GridLayout type={GRID_TYPE.twoCol}>
        <InputHandler
          props={{
            ...findInputById(parsedInput, "passportNumber")!,
            defaultValue: employee!.otherInformation?.passport?.number,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "passportIssuedBy")!,
            defaultValue: employee!.otherInformation?.passport?.issuedBy,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "passportStart")!,
            defaultValue: employee!.otherInformation?.passport?.issueDate,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "passportEnd")!,
            defaultValue: employee!.otherInformation?.passport?.expiryDate,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "height")!,
            defaultValue: employee!.medicalInformation?.height,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "weight")!,
            defaultValue: employee!.medicalInformation?.weight,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "genoType")!,
            defaultValue: employee!.medicalInformation?.genoType,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "bloodGroup")!,
            defaultValue: employee!.medicalInformation?.bloodType,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "disability")!,
            defaultValue: employee!.medicalInformation?.disability,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "motivations")!,
            defaultValue: employee!.otherInformation?.interests,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "hobbies")!,
            defaultValue: employee!.otherInformation?.hobbies,
            setValue: inputHelper,
          }}
        />
      </GridLayout>
      <div className="flex gap-2">
        <Button
          label="Submit Request"
          onClick={() => {
            console.log(otherInfoInputs);
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

export const OtherInformationCopy: FC<{ employee?: Employee }> = ({
  employee,
}) => {
  const parsedInput = OtherInfo(employee!);
  return (
    <GridLayout type={GRID_TYPE.twoCol}>
      <TextLabel
        label={findInputById(parsedInput, "passport")?.label ?? ""}
        copy={
          <div>
            <BodyCopy
              text={`#: ${employee?.otherInformation?.passport?.number ?? ""}`}
            />
            <BodyCopy
              isLight
              text={`Iss:  ${
                employee?.otherInformation?.passport?.issuedBy ?? ""
              }`}
            />
            <div className="flex gap-2 items-center">
              <BodyCopy
                isLight
                text={employee?.otherInformation?.passport?.issueDate ?? ""}
              />
              <p>-</p>
              <BodyCopy
                isLight
                text={employee?.otherInformation?.passport?.expiryDate ?? ""}
              />
            </div>
          </div>
        }
      />
      <TextLabel
        label={findInputById(parsedInput, "height")?.label ?? ""}
        copy={employee?.medicalInformation?.height}
      />
      <TextLabel
        label={findInputById(parsedInput, "weight")?.label ?? ""}
        copy={employee?.medicalInformation?.weight}
      />
      <TextLabel
        label={findInputById(parsedInput, "genoType")?.label ?? ""}
        copy={employee?.medicalInformation?.genoType}
      />
      <TextLabel
        label={findInputById(parsedInput, "bloodGroup")?.label ?? ""}
        copy={employee?.medicalInformation?.bloodType}
      />
      <TextLabel
        label={findInputById(parsedInput, "disability")?.label ?? ""}
        copy={employee?.medicalInformation?.disability}
      />
      <TextLabel
        label={findInputById(parsedInput, "motivations")?.label ?? ""}
        copy={employee?.otherInformation?.interests}
      />
      <TextLabel
        label={findInputById(parsedInput, "hobbies")?.label ?? ""}
        copy={employee?.otherInformation?.hobbies}
      />
    </GridLayout>
  );
};
