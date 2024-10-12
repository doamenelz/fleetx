"use client";

import { FC } from "react";
export enum BUTTON_GROUP {
  text,
}

export const ButtonGroup: FC<{ type: BUTTON_GROUP }> = ({ type }) => {
  return (
    <>
      {type === BUTTON_GROUP.text && (
        <span className="isolate inline-flex rounded-md border border-gray-200 p-0.5 divide-x shadow-sm">
          <ButtonText label="3M" onClick={() => {}} />
          <ButtonText label="6M" onClick={() => {}} />
          <ButtonText label="YTD" onClick={() => {}} />
        </span>
      )}
    </>
  );
};

const ButtonText: FC<{ label: string; onClick: Function }> = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick}
      type="button"
      className="relative inline-flex items-center bg-white px-3 py-1 text-xs font-semibold text-gray-600 border-0 hover:bg-gray-50 focus:z-10"
    >
      {label}
    </button>
  );
};
