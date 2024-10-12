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
} from "@/components";
import { BasicInfo } from "./ProfileFormView.types";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { setInputs } from "@/lib/utilities/helperFunctions";

//TODO: Add Avatar Upload
//TODO: Add Supporting Documentation

export const EditBasicInformationList: FC<{
  employee?: Employee;
  dismissModal: Dispatch<SetStateAction<boolean>>;
}> = ({ employee, dismissModal }) => {
  const [basicInfoInputs, setBasicInfoInputs] = useState<InputObject[]>([]);

  const parsedInput = BasicInfo(employee!);

  useEffect(() => {
    setInputs(parsedInput, setBasicInfoInputs);
  }, []);

  const inputHelper = (input: InputObject) => {
    setBasicInfoInputs(
      basicInfoInputs.map((item) => {
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
      <SectionHeader title="Edit Basic Information" />
      <GridLayout type={GRID_TYPE.twoCol}>
        <InputHandler
          props={{
            ...findInputById(parsedInput, "title")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "firstName")!,
            placeHolder: employee!.bioData.firstName,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "lastName")!,
            placeHolder: employee!.bioData.lastName,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "otherNames")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "maidenName")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "gender")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "dateOfBirth")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "placeOfBirth")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "maritalStatus")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "marriageDate")!,
            value: employee?.bioData.marriageDate,
            placeHolder: employee?.bioData.marriageDate ?? "",

            setValue: inputHelper,
            defaultValue: employee?.bioData.marriageDate,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "religion")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "stateOfOrigin")!,
            setValue: inputHelper,
          }}
        />

        <InputHandler
          props={{
            ...findInputById(parsedInput, "nationality")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "lga")!,
            setValue: inputHelper,
          }}
        />
      </GridLayout>
      <div className="flex gap-2">
        <Button
          label="Submit Request"
          onClick={() => {
            console.log(basicInfoInputs);
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

export const BasicInformationCopy: FC<{ employee?: Employee }> = ({
  employee,
}) => {
  const parsedInput = BasicInfo(employee!);
  return (
    <GridLayout type={GRID_TYPE.twoCol}>
      <TextLabel
        label={findInputById(parsedInput, "title")?.label ?? ""}
        copy={employee?.bioData.title}
      />
      <TextLabel
        label={findInputById(parsedInput, "firstName")?.label ?? ""}
        copy={employee?.bioData.firstName}
      />
      <TextLabel
        label={findInputById(parsedInput, "lastName")?.label ?? ""}
        copy={employee?.bioData.lastName}
      />
      <TextLabel
        label={findInputById(parsedInput, "otherNames")?.label ?? ""}
        copy={employee?.bioData.otherNames}
      />
      <TextLabel
        label={findInputById(parsedInput, "maidenName")?.label ?? ""}
        copy={employee?.bioData.maidenName}
      />
      <TextLabel
        label={findInputById(parsedInput, "gender")?.label ?? ""}
        copy={employee?.bioData.gender}
      />
      <TextLabel
        label={findInputById(parsedInput, "dateOfBirth")?.label ?? ""}
        copy={formatDate(
          new Date(employee?.bioData.dateOfBirth!),
          DATE_OPTIONS.dMY
        )}
      />
      <TextLabel
        label={findInputById(parsedInput, "placeOfBirth")?.label ?? ""}
        copy={employee?.bioData.placeOfBirth}
      />
      <TextLabel
        label={findInputById(parsedInput, "maritalStatus")?.label ?? ""}
        copy={employee?.bioData.maritalStatus}
      />
      <TextLabel
        label={findInputById(parsedInput, "marriageDate")?.label ?? ""}
        copy={employee?.bioData.marriageDate}
      />
      <TextLabel
        label={findInputById(parsedInput, "religion")?.label ?? ""}
        copy={employee?.bioData.religion}
      />
      <TextLabel
        label={findInputById(parsedInput, "stateOfOrigin")?.label ?? ""}
        copy={employee?.contactDetails?.stateOfOrigin}
      />
      <TextLabel
        label={findInputById(parsedInput, "nationality")?.label ?? ""}
        copy={employee?.contactDetails?.nationality}
      />
      <TextLabel
        label={findInputById(parsedInput, "lga")?.label ?? ""}
        copy={employee?.contactDetails?.lga}
      />
    </GridLayout>
  );
};
