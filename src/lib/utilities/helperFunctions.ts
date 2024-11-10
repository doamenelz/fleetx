import { InputObject, NOTIFICATION_TYPE, TextInputProps } from "@/components";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

/** This function simulates a loading animation. The duration(in seconds) determines how long the animation stays */
export const simulateLoader = (setIsLoading: Function, duration: number) => {
  let timer = setTimeout(function () {
    setIsLoading(false);
  }, duration);

  return () => clearTimeout(timer);
};

export const trimString = (string: string, length: number) => {
  const trimmedString =
    string.length > length ? string.substring(0, length - 3) + "..." : string;
  return trimmedString;
};

export const showNotification = (
  type: NOTIFICATION_TYPE,
  header: string,
  copy: string,
  context: any
) => {
  context.setNotificationHeader(header);
  context.setNotificationType(type);
  context.setNotificationCopy(copy ?? "");
  context.toggleNotification(true);
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const setInputs = (inputs: TextInputProps[], setInputs: Function) => {
  let formItems: InputObject[] = [];
  inputs.forEach((item) => {
    let _inputObject: InputObject = {
      id: item.id,
      stringValue: item.defaultValue as string,
      boolValue: item.defaultValue as boolean,
      type: item.style,
      required: item.required,
    };
    formItems.push(_inputObject);
  });
  setInputs(formItems);
};
