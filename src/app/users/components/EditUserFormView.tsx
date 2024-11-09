"use client";
import {
  Avatar,
  AVATAR_SIZES,
  Button,
  BUTTON_SKIN,
  findInputById,
  FormCell,
  FormSection,
  FormSectionLayout,
  INPUT_TYPES,
  InputHandler,
  InputObject,
  SectionHeader,
  TEXT_INPUT_SIZE,
} from "@/components";
import { setInputs } from "@/lib/utilities/helperFunctions";
import { generatePerson } from "@/models/Person";
import { useEffect, useState } from "react";
import { UserInputModel } from "../models/userInputModel";
import { UserCircle } from "lucide-react";

export const EditUserFormView = () => {
  const employee = generatePerson("employee");
  const parsedInput = UserInputModel(employee);
  const [userInfoInput, setUserInfoInput] = useState<InputObject[]>([]);

  const roles: {
    id: string;
    label: string;
    defaultValue: boolean;
    copy?: string;
  }[] = [
    {
      id: "employee",
      label: "Employee",
      defaultValue: false,
      copy: "Allows the User to request vehicles, access the Web Portal, and use the Mobile App",
    },
    {
      id: "technician",
      label: "Technician",
      defaultValue: false,
      copy: "Allows the user create and complete Work Orders",
    },
    { id: "operator", label: "Operator", defaultValue: true },
  ];

  const inputHelper = (input: InputObject) => {
    setUserInfoInput(
      userInfoInput.map((item) => {
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
    const _roles = roles.map((role) => {
      return {
        ...role,
        style: INPUT_TYPES.checkBox,
        span: TEXT_INPUT_SIZE.span1,
        editMode: true,
        placeHolder: "",
        disabled: false,
        setShowError: () => {},
        required: false,
        setValue: inputHelper,
      };
    });
    setInputs([...parsedInput, ..._roles], setUserInfoInput);
  }, []);

  return (
    <form className="px-4 pb-4">
      <FormSectionLayout>
        <>
          <FormSection label="Basic Information">
            <>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "firstName")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "middleName")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "lastName")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "email")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "phone")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell span="full">
                <div className="space-y-2">
                  {/* <label
                      htmlFor="photo"
                      className="block text-sm/6 font-medium text-white"
                    >
                      Photo
                    </label> */}
                  {employee.avatar === "" || employee.avatar === undefined ? (
                    <div className="mt-2 flex items-center gap-x-3">
                      <UserCircle
                        aria-hidden="true"
                        className="h-12 w-12 text-gray-500"
                      />
                    </div>
                  ) : (
                    <Avatar
                      imageUrl={employee.avatar}
                      firstName={employee.firstName}
                      lastName={employee.lastName}
                      size={AVATAR_SIZES.xl}
                    />
                  )}
                  <Button
                    label="Change Image"
                    skin={BUTTON_SKIN.secondary}
                  />
                </div>
              </FormCell>
            </>
          </FormSection>
          <FormSection label="License Information">
            <>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "licenseNumber")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "licenseClass")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "licenseStart")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "licenseEnd")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
            </>
          </FormSection>
          <FormSection label="Roles Configuration">
            <>
              {roles.map((role) => (
                <FormCell
                  key={role.id}
                  span="full"
                >
                  <InputHandler
                    props={{
                      style: INPUT_TYPES.checkBox,
                      span: TEXT_INPUT_SIZE.full,
                      editMode: true,
                      copy: "",
                      placeHolder: "",
                      disabled: false,
                      setShowError: () => {},
                      required: false,
                      setValue: inputHelper,
                      ...role,
                    }}
                  />
                </FormCell>
              ))}
            </>
          </FormSection>
          <FormSection label="Other Information">
            <>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "staffID")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
              <FormCell>
                <InputHandler
                  props={{
                    ...findInputById(parsedInput, "jobTitle")!,
                    setValue: inputHelper,
                  }}
                />
              </FormCell>
            </>
          </FormSection>
        </>
      </FormSectionLayout>
      <div className="flex items-end justify-end gap-2">
        <Button
          label="Cancel"
          destructive
          onClick={() => {
            console.log(userInfoInput);
          }}
          skin={BUTTON_SKIN.secondaryColor}
        />
        <Button label="Save Changes" />
      </div>
    </form>
  );
};
