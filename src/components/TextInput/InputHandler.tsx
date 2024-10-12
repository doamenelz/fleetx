import { FC } from "react";
import { INPUT_TYPES, TextInputProps } from ".";
import { TextLabel, TextInput, TextArea, Dropdown, DatePicker } from "..";
export const InputHandler: FC<{
  props: TextInputProps;
}> = ({ props }) => {
  return (
    <>
      {(props.style === INPUT_TYPES.text ||
        props.style === INPUT_TYPES.email ||
        props.style === INPUT_TYPES.number ||
        props.style === INPUT_TYPES.password ||
        props.style === INPUT_TYPES.phone) && (
        <>
          {!props.editMode ? (
            <TextLabel label={props.label} copy={props.copy} />
          ) : (
            <TextInput props={props} />
          )}
        </>
      )}

      {props.style === INPUT_TYPES.textarea && (
        <>
          {!props.editMode ? (
            <TextLabel label={props.label} copy={props.copy} />
          ) : (
            <TextArea
              label={props.label}
              id={props.id}
              placeHolder={props.placeHolder}
              disabled={props.disabled}
              span={props.span}
              defaultValue={props.defaultValue}
              style={props.style}
              required={props.required}
              setValue={props.setValue}
            />
          )}
        </>
      )}

      {props.style === INPUT_TYPES.address && (
        <>
          {!props.editMode ? (
            <TextLabel
              label={props.label}
              copy={
                <div className="space-y-1 text-sm">
                  <p>{props.address?.streetAddress}</p>
                  <p className="text-xs text-gray-700">
                    {props.address?.city && `${props.address.city}`}
                    {props.address?.state && ` | ${props.address.state}`}
                    {props.address?.phone && ` | ${props.address.phone}`}
                  </p>
                </div>
              }
            />
          ) : (
            <TextArea
              label={props.label}
              id={props.id}
              placeHolder={props.placeHolder}
              disabled={props.disabled}
              span={props.span}
              defaultValue={props.defaultValue}
              style={props.style}
              required={props.required}
              setValue={props.setValue}
            />
          )}
        </>
      )}

      {props.style === INPUT_TYPES.dropdown && (
        <>
          {!props.editMode ? (
            <TextLabel label={props.label} copy={props.copy} />
          ) : (
            <Dropdown
              label={props.label}
              id={props.id}
              items={props.items!}
              setValue={props.setValue}
              span={props.span}
              defaultValue={props.defaultValue}
              disabled={props.disabled}
              value={props.value!}
              required={props.required}
              errorLabel={props.errorLabel}
              showError={props.showError}
              style={props.style}
            />
          )}
        </>
      )}

      {props.style === INPUT_TYPES.date && (
        <>
          {!props.editMode ? (
            <TextLabel label={props.label} copy={props.copy} />
          ) : (
            <DatePicker
              label={props.label}
              id={props.id}
              span={props.span}
              selectedDate={
                props.defaultValue ? new Date(props.defaultValue) : new Date()
              }
              setValue={props.setValue}
              showError={props.showError}
              errorLabel={props.errorLabel}
              style={props.style}
            />
          )}
        </>
      )}
    </>
  );
};
