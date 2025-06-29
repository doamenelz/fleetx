"use client";

import { ManufacturerInputs } from "@/app/administration/models/manageManufacturerInput";
import {
  BackHeader,
  Button,
  BUTTON_SKIN,
  findInputById,
  FormCell,
  FormLayout,
  FormSection,
  FormSectionLayout,
  GRID_TYPE,
  GridLayout,
  InputHandler,
  InputObject,
  ModalHeader,
  PageContainer,
  PageLoader,
  PlainCard,
  SCREEN_WIDTH,
  SectionHeader,
  Spinner,
  STATUS_COLORS,
  StatusBadge,
  Tab,
  Tabs,
  TextInputProps,
} from "@/components";
import { setInputs } from "@/lib/utilities/helperFunctions";
import { Trash } from "lucide-react";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

//TODO: Update the Document Title
export default function Page({ params }: { params: { id: string } }) {
  const loc = usePathname();
  const [defaultFields, setDefaultFields] = useState<TextInputProps[]>([]);

  const [categoryInput, setCategoryInput] = useState<InputObject[]>([]);
  const [name, setName] = useState<InputObject>();

  const inputHelper = (input: InputObject) => {
    setCategoryInput(
      categoryInput.map((item) => {
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
  return (
    <PageContainer
      documentTitle={`Vehicles -`}
      fullWidth={SCREEN_WIDTH.regular}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      // bgColor="bg-slate-50 h-full"
      breadCrumbs={[
        { id: "001", name: "...", href: "" },
        {
          id: "002",
          name: "Manufacturers",
          href: "/administration/inventory/manufacturer",
        },
        { id: "003", name: "New", href: "" },
      ]}
    >
      <div className="my-4 h-full space-y-2">
        <BackHeader
          previousPathName="Back to Manufacturers"
          previousPath="/administration/inventory/manufacturers"
        />
        <div className="max-w-2xl mx-auto">
          {/* <PlainCard>
            <div className="space-y-4">
              <SectionHeader
                title="New Manufacturer"
                copy="Manufacturers with Assets linked to them cannot be deleted"
              />

              <InputHandler
                props={{
                  ...findInputById(ManufacturerInputs(), "name")!,
                  setValue: inputHelper,
                }}
              />

              <Button label="Create" />
            </div>
          </PlainCard> */}
        </div>
        <ModelControlsView />
      </div>
    </PageContainer>
  );
}

const ModelControlsView = () => {
  const [defaultFields, setDefaultFields] = useState<TextInputProps[]>([]);

  const [categoryInput, setCategoryInput] = useState<InputObject[]>([]);
  const [categoryType, categorySetType] = useState<InputObject>();
  const [addedTrims, setAddedTrims] = useState<InputObject[]>([]);
  const [showTypeError, setShowTypeError] = useState(false);
  const inputHelper = (input: InputObject) => {
    setCategoryInput(
      categoryInput.map((item) => {
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

  const typeHelper = (input: InputObject) => {
    categorySetType({
      ...input,
      stringValue: input.stringValue,
    });
  };

  const dismissModalHandler = () => {
    setAddedTrims([]);
  };

  useEffect(() => {
    const _defaultFields: TextInputProps[] = ManufacturerInputs().map(
      (item) => {
        return item;
      }
    );
    setDefaultFields(_defaultFields);
    setInputs(ManufacturerInputs(), setCategoryInput);
  }, []);
  return (
    <>
      {" "}
      <div className="z-10 sticky top-0">
        <ModalHeader title="Honda" />
      </div>
      <form className="p-4 space-y-4 relative">
        <FormSectionLayout>
          <FormSection
            label="Add Models"
            copy="Add Trims"
          >
            <FormCell>
              <InputHandler
                props={{
                  ...findInputById(ManufacturerInputs(), "model")!,
                  setValue: typeHelper,
                }}
              />
            </FormCell>
          </FormSection>
        </FormSectionLayout>
        <Button
          label="Add Trim"
          skin={BUTTON_SKIN.secondary}
          onClick={() => {
            const validateEntry = addedTrims.find(
              (entry) => entry.stringValue === categoryType?.stringValue
            );

            if (validateEntry || validateEntry !== undefined) {
              setShowTypeError(false);
              setAddedTrims([...addedTrims, categoryType!]);
            } else if (validateEntry === "") {
              // categorySetType({ ...categoryType!, stringValue: "" });
            } else {
              setShowTypeError(false);
            }
          }}
        />

        {addedTrims.length >= 1 && (
          <div className="border p-4 space-y-2 mt-4">
            <p className="text-[10px] font-semibold text-gray-400">
              Added Trims
            </p>
            <ul>
              {addedTrims.map((item, index) => (
                <p
                  key={index}
                  className="w-full text-xs font-medium flex items-center justify-between p-2 border-b ring-gray-200"
                >
                  {item.stringValue}
                  <span>
                    <button
                      onClick={() => {
                        setAddedTrims(
                          addedTrims.filter((trim) => trim.id !== item.id)
                        );
                      }}
                    >
                      <Trash className="size-4 hover:text-red-600" />
                    </button>
                  </span>
                </p>
              ))}
            </ul>
          </div>
        )}
        <div className="fixed bottom-8 right-12">
          <Button
            label="Create Model"
            disabled={addedTrims.length >= 1 ? false : true}
          />
        </div>
      </form>
    </>
  );
};

//max-h-[calc(100vh_-_260px)]
