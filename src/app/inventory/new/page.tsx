"use client";

import {
  Button,
  BUTTON_SKIN,
  findInputById,
  FormCell,
  FormProgressView,
  FormSection,
  FormSectionLayout,
  InputHandler,
  InputObject,
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  TextInputProps,
} from "@/components";
import { setInputs } from "@/lib/utilities/helperFunctions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DefaultVehicleInputFields } from "../models/defaultVehicleInputFields";
import { FormVehicleGenInfo } from "./components/FormVehicleGeneralInformation";

export default function Page() {
  const loc = usePathname();
  const [defaultFields, setDefaultFields] = useState<TextInputProps[]>();
  const [vendorInfoInput, setVendorInfoInput] = useState<InputObject[]>([]);
  const [showErrors, setShowErrors] = useState(true);

  const inputHelper = (input: InputObject) => {
    setVendorInfoInput(
      vendorInfoInput.map((item) => {
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

  useEffect(() => {
    const _defaultFields: TextInputProps[] = DefaultVehicleInputFields().map(
      (item) => {
        return item;
      }
    );
    setDefaultFields(_defaultFields);
    setInputs(DefaultVehicleInputFields(), setVendorInfoInput);
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
      <div className="pt-1 ">
        {/* <div className="sticky top-12 border-b pb-4 z-10 backdrop-blur-sm bg-white/30">
          <FormProgressView />
        </div> */}
        <SectionHeader
          title="New Vehicle"
          copy="Add a new vehicle to your fleet"
          button={
            <div className="flex items-end justify-end gap-2">
              <Button
                label="Cancel"
                destructive
                onClick={() => {
                  console.log(vendorInfoInput);
                }}
                skin={BUTTON_SKIN.secondaryColor}
              />
              <Button
                label="Create Vehicle"
                type="submit"
                //   disabled={checkFormRequiredFields() ? true : false}
              />
            </div>
          }
        />

        {defaultFields !== undefined && (
          <form className="">
            <FormSectionLayout>
              <>
                <FormVehicleGenInfo
                  defaultFields={defaultFields}
                  inputHelper={inputHelper}
                />
              </>
            </FormSectionLayout>
          </form>
        )}
        {/* <SectionHeader title="Create Vehicle" /> */}
      </div>
    </PageContainer>
  );
}
