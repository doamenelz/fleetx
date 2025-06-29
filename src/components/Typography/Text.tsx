import { FC } from "react";
import { TextProps } from "./Text.types";

import { Lbl } from "./Lbl";
import { BodyCopy } from "./BodyCopy";
import clsx from "clsx";

/** The Text Label component is used to present items with a label and copy e.g. Texts on Forms. It can also be used to present a label and a subComponent */
export const TextLabel: FC<TextProps> = (props) => {
  return (
    <div
      className={clsx(
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
          copy={props.copy}
          copyStyle={props.copyStyle}
        />
      ) : (
        props.copy
      )}
    </div>
  );
};
