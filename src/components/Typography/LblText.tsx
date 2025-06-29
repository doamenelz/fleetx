import clsx from "clsx";
import { TextProps } from "./Text.types";
import { Lbl } from "./Lbl";
import { BodyCopy } from "./BodyCopy";

export const LblText = ({
  label,
  copy,
  textAlign = "text-left",
  copyStyle,
  labelComponent,
  required = false,
  isLight = false,
  direction,
  labelStyle,
}: TextProps) => {
  return (
    <div
      className={clsx(
        "space-y-1 tracking-tight",
        direction === "flex" ? "flex items-center gap-2" : "",
        textAlign
      )}
    >
      <Lbl
        label={label}
        isLight={isLight}
        required={required}
        textAlign={textAlign}
        labelComponent={labelComponent}
        labelStyle={labelStyle}
      />
      {typeof copy === "string" ? (
        <BodyCopy
          isLight={isLight}
          copy={copy}
          copyStyle={copyStyle}
        />
      ) : (
        copy
      )}
    </div>
  );
};
