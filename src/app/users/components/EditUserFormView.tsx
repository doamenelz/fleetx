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
  parseFieldTypes,
  Spinner,
  TEXT_INPUT_SIZE,
  TextInputProps,
} from "@/components";
import { setInputs } from "@/lib/utilities/helperFunctions";
import { FC, useContext, useEffect, useState } from "react";
import { UserInputModel } from "../models/userInputModel";
import { UserCircle } from "lucide-react";
import { RootContext } from "@/context/RootContext";
import { API_HEADERS, apiHandler } from "@/lib/utilities/apiHelper";
import { CustomFormSection, checkIfUserHasRole, Person } from "@/models";
import { emailRegex } from "@/lib/utilities/regex";

export const EditUserFormView: FC<{ user: Person }> = ({ user }) => {
  const rootContext = useContext(RootContext);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [defaultFields, setDefaultFields] = useState<TextInputProps[]>();
  const [otherInformationFields, setOtherInformationFields] =
    useState<TextInputProps[]>();
  const [roleSectionFields, setRoleSectionFields] =
    useState<TextInputProps[]>();
  const [userInfoInput, setUserInfoInput] = useState<InputObject[]>([]);
  const [showErrors, setShowErrors] = useState(true);

  const checkFormRequiredFields = () => {
    return userInfoInput.find(
      (input) => input.required === true && input.stringValue!.length < 3
    );
  };

  const checkGenericRequiredFields = () => {};

  const validateRequiredField = (
    id: string,
    textProps: TextInputProps[] | undefined
  ) => {
    if (showErrors) {
      const _input = userInfoInput.find((input) => input.id === id);

      const _textProp = textProps?.find((prop) => prop.id === id);

      switch (_textProp?.type) {
        case "text":
          if (_input?.required && _input.stringValue === "") {
            return true;
          } else {
            return false;
          }

        case "email":
          if (
            _input?.required &&
            (_input.stringValue === "" || emailRegex(_input.stringValue!))
          ) {
            return true;
          } else {
            return false;
          }

        // case "checkbox":
        //   if (_input?.required && _input.boolValue === "") {
        //     return true;
        //   } else {
        //     return false;
        //   }

        case "password":
          if (
            _input?.required &&
            (_input.stringValue === "" || _input.stringValue!.length < 5)
          ) {
            return true;
          } else {
            return false;
          }

        default:
          return false;
      }
    } else {
      return false;
    }
  };

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

  const getRolesFormFields = async () => {
    console.log(rootContext.envVar.baseURL);

    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/configurations/forms/USER_ROLES`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      console.log(api);
      const apiCompletion = (await api.data.form) as CustomFormSection;
      console.log(`Completion is ${apiCompletion.type}`);

      const _roles = apiCompletion.sections[0].fields.map((role) => {
        return {
          ...role,
          style: INPUT_TYPES.checkBox,
          copy: role.description,
          span: TEXT_INPUT_SIZE.span1,
          defaultValue: checkIfUserHasRole(role.id, user.role),
          // defaultValue: true,
          editMode: true,
          placeHolder: "",
          disabled: false,
          setShowError: () => {},
          required: false,
          setValue: inputHelper,
        };
      });
      setRoleSectionFields(_roles);
      return { isSuccess: true, fields: _roles };
    } else {
      return { isSuccess: false };
    }
  };

  const getOtherInformation = async () => {
    console.log(rootContext.envVar.baseURL);

    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/configurations/forms/EDIT_USER`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    if (api.success) {
      console.log(api);
      const apiCompletion = (await api.data.form) as CustomFormSection;
      console.log(`Completion is ${apiCompletion.type}`);

      const _fields = apiCompletion.sections[0].fields.map((field) => {
        return {
          ...field,
          style: parseFieldTypes(field.inputType),
          copy: field.description,
          span: TEXT_INPUT_SIZE.span1,
          defaultValue: user.customProperties?.find(
            (val) => val.id === field.id
          )?.value,
          editMode: true,
          placeHolder: "",
          disabled: false,
          setShowError: () => {},
          required: field.isRequired,
          setValue: inputHelper,
        };
      });
      // setInputs([..._roles, ...parsedInput], setUserInfoInput);
      setOtherInformationFields(_fields);
      return { isSuccess: true, fields: _fields };
    } else {
      return { isSuccess: false };
    }
  };

  const getFields = async () => {
    const roles = await getRolesFormFields();
    const otherInfo = await getOtherInformation();

    if (roles.isSuccess && otherInfo.isSuccess) {
      const _defaultFields: TextInputProps[] = UserInputModel(user).map(
        (item) => {
          return item;
        }
      );
      setDefaultFields(_defaultFields);
      setRoleSectionFields(roles.fields);
      setOtherInformationFields(otherInfo.fields);
      setInputs(
        [...UserInputModel(user), ...roles.fields!, ...otherInfo.fields!],
        setUserInfoInput
      );
      setFetchComplete(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setFetchComplete(false);
    }
  };

  useEffect(() => {
    getFields();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting User Details.." }} />
        </div>
      ) : (
        <>
          {fetchComplete ? (
            <form
              className="px-4 pb-4"
              // onSubmit={checkRequiredLoginFields}
              encType="multipart/form-data"
              id="loginForm"
            >
              <FormSectionLayout>
                <>
                  <FormSection label="Basic Information">
                    <>
                      <FormCell>
                        <InputHandler
                          props={{
                            ...findInputById(defaultFields!, "firstName")!,
                            setValue: inputHelper,
                            showError: false,
                            // setShowError: () => checkRequiredLoginFields,
                            errorLabel: "First Name is required",
                          }}
                        />
                      </FormCell>
                      <FormCell>
                        <InputHandler
                          props={{
                            ...findInputById(defaultFields!, "middleName")!,
                            setValue: inputHelper,
                          }}
                        />
                      </FormCell>
                      <FormCell>
                        <InputHandler
                          props={{
                            ...findInputById(defaultFields!, "lastName")!,
                            setValue: inputHelper,
                            showError: validateRequiredField(
                              "email",
                              defaultFields
                            )
                              ? true
                              : false,
                          }}
                        />
                      </FormCell>
                      <FormCell>
                        <InputHandler
                          props={{
                            ...findInputById(defaultFields!, "email")!,
                            setValue: inputHelper,
                            showError: validateRequiredField(
                              "email",
                              defaultFields
                            )
                              ? true
                              : false,
                          }}
                        />
                      </FormCell>
                      <FormCell>
                        <InputHandler
                          props={{
                            ...findInputById(defaultFields!, "phone")!,
                            setValue: inputHelper,
                            showError: validateRequiredField(
                              "phone",
                              defaultFields
                            )
                              ? true
                              : false,
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
                          {user.avatar === "" || user.avatar === undefined ? (
                            <div className="mt-2 flex items-center gap-x-3">
                              <UserCircle
                                aria-hidden="true"
                                className="h-12 w-12 text-gray-500"
                              />
                            </div>
                          ) : (
                            <Avatar
                              imageUrl={user.avatar}
                              firstName={user.firstName}
                              lastName={user.lastName}
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
                            ...findInputById(defaultFields!, "licenseNumber")!,
                            setValue: inputHelper,
                          }}
                        />
                      </FormCell>
                      <FormCell>
                        <InputHandler
                          props={{
                            ...findInputById(defaultFields!, "licenseClass")!,
                            setValue: inputHelper,
                          }}
                        />
                      </FormCell>
                      <FormCell>
                        <InputHandler
                          props={{
                            ...findInputById(defaultFields!, "licenseStart")!,
                            setValue: inputHelper,
                          }}
                        />
                      </FormCell>
                      <FormCell>
                        <InputHandler
                          props={{
                            ...findInputById(defaultFields!, "licenseEnd")!,
                            setValue: inputHelper,
                          }}
                        />
                      </FormCell>
                    </>
                  </FormSection>
                  {roleSectionFields!.length >= 1 && (
                    <FormSection label="Roles Configuration">
                      <>
                        {roleSectionFields!.map((role) => (
                          <FormCell
                            key={role.id}
                            span="full"
                          >
                            <InputHandler
                              props={{
                                placeHolder: "",
                                disabled: false,
                                required: false,

                                ...role,
                                setValue: inputHelper,
                              }}
                            />
                          </FormCell>
                        ))}
                      </>
                    </FormSection>
                  )}

                  {otherInformationFields !== undefined &&
                    otherInformationFields.length >= 1 && (
                      <FormSection label="Other Information">
                        <>
                          {otherInformationFields.map((field) => (
                            <FormCell
                              key={field.id}
                              // span="full"
                            >
                              <InputHandler
                                props={{
                                  placeHolder: "",
                                  disabled: false,
                                  required: false,
                                  ...field,
                                  setValue: inputHelper,
                                }}
                              />
                            </FormCell>
                          ))}
                        </>
                      </FormSection>
                    )}
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
                <Button
                  label="Save Changes"
                  type="submit"
                  disabled={checkFormRequiredFields() ? true : false}
                />
              </div>
            </form>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

//TODO: Parse per sections
