import { FC } from "react";
import { TextProps } from "./Text.types";
import { classNames } from "@/lib/utilities/helperFunctions";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Address } from "@/models";
import { ChartData } from "@/lib/utilities/ChartStyles";

/** The Text Label component is used to present items with a label and copy e.g. Texts on Forms. It can also be used to present a label and a subComponent */
export const TextLabel: FC<TextProps> = (props) => {
  return (
    <div
      className={classNames(
        "space-y-1 tracking-tight",
        props.direction === "flex" ? "flex items-center gap-2" : "",
        props.textAlign ? props.textAlign : ""
      )}
    >
      <Lbl
        label={props.label}
        isLight={props.isLight}
        labelComponent={props.labelComponent}
      />
      {typeof props.copy === "string" ? (
        <BodyCopy
          isLight={props.isLight}
          text={props.copy}
          style={props.copyStyle}
        />
      ) : (
        props.copy
      )}
    </div>
  );
};

export const Lbl: FC<TextProps> = (props) => {
  return (
    <label
      htmlFor={props.label}
      className={` flex items-center gap-1 ${
        !props.isLight ? "text-xs  text-slate-600" : "text-xs  text-slate-600"
      }`}
    >
      {props.label}
      {props.required && <span className="text-red-600">*</span>}
      {props.labelComponent && <span>{props.labelComponent}</span>}
    </label>
  );
};

export const BodyCopy: FC<{
  text: string;
  isLight?: boolean;
  style?: string;
}> = ({ text, isLight, style }) => {
  return (
    <>
      <p
        className={classNames(
          style
            ? style
            : isLight
            ? "font-normal text-sm text-slate-700"
            : "font-medium text-slate-900 text-sm"
        )}
      >
        {text}
      </p>
    </>
  );
};

export const AddressCopy: FC<{ address: Address }> = ({ address }) => {
  return (
    <div>
      <BodyCopy text={address.streetAddress} />
      <BodyCopy isLight text={address.city} />
      <BodyCopy isLight text={address.state} />
    </div>
  );
};

// TextLabel.defaultProps = {
//   isLight: false,
// };

// Lbl.defaultProps = {
//   isLight: false,
// };

export const ChartLegendItem: FC<ChartData> = (props) => {
  return (
    <>
      <div className="">
        <div className=" text-xs gap-4 w-full pt-2 font-light text-gray-700 border-gray-400 tracking-tight">
          <p className="flex items-center gap-1">
            <span
              className={`block w-2 h-2`}
              style={{ backgroundColor: `${props.fill}` }}
            ></span>
            {props.name}
          </p>
          {/* <p className="text-slate-900 font-medium">({props.value})</p> */}
        </div>
      </div>
    </>
  );
};
