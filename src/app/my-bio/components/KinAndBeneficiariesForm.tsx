"use client";

import {
  GRID_TYPE,
  GridLayout,
  InputHandler,
  InputObject,
  SectionHeader,
  findInputById,
} from "@/components";
import { setInputs } from "@/lib/utilities/helperFunctions";
import { Kin } from "@/modules/MyBio/models/Kin";
import { FC, useEffect, useState } from "react";
import { KinBenInfo } from "./KinAndBeneficiariesForm.types";

export const KinAndBeneficiariesForm: FC<{ kin?: Kin }> = ({ kin }) => {
  const [basicInfoInputs, setBasicInfoInputs] = useState<InputObject[]>([]);

  const parsedInput = KinBenInfo(kin);

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
      <SectionHeader title="Kin Information" />
      <GridLayout type={GRID_TYPE.twoCol}>
        {" "}
        <InputHandler
          props={{
            ...findInputById(parsedInput, "firstName")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "lastName")!,
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
            ...findInputById(parsedInput, "relationship")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "address")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "mobile")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "percentage")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "email")!,
            setValue: inputHelper,
          }}
        />
        <InputHandler
          props={{
            ...findInputById(parsedInput, "dateOfBirth")!,
            setValue: inputHelper,
          }}
        />
      </GridLayout>
    </div>
  );
};
