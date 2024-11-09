"use client";
import React from "react";
import { FC } from "react";
import { AVATAR_SIZES } from "./Avatar.types";
import { Avatar } from "./Avatar";
import { classNames } from "@/lib/utilities/helperFunctions";
export const AvatarCell: FC<{
  firstName: string;
  lastName: string;
  imageUrl?: string;
  size?: AVATAR_SIZES;
  hasPadding?: boolean;
  highlightName?: boolean;
  fullName: string;
  row2?: string;
  row3?: string;
  rowComponent?: JSX.Element;
  dark?: boolean;
}> = (props) => {
  const _size = props.size === undefined ? AVATAR_SIZES.md : props.size;
  const _hasPadding = props.hasPadding === undefined ? false : props.hasPadding;
  const _dark = props.dark === undefined ? false : props.dark;
  return (
    <div
      className={`flex text-left ${
        props.row3 !== undefined || props.rowComponent !== undefined
          ? ""
          : "items-center"
      } ${props.highlightName && "group cursor-pointer"}`}
    >
      <Avatar
        size={_size}
        firstName={props.firstName}
        lastName={props.lastName}
        imageUrl={props.imageUrl}
        hasPadding={_hasPadding}
      />

      <div className="ml-3">
        <p
          className={classNames(
            "text-xs font-medium ",
            props.highlightName
              ? "text-brand-blueRoyal group-hover:text-brand-persianBlue"
              : _dark
              ? "text-gray-100"
              : "text-gray-900"
          )}
        >
          {props.fullName}
        </p>
        {props.row2 && (
          <p
            className={classNames(
              "text-xs font-light ",
              _dark ? "text-gray-200" : "text-gray-900"
            )}
          >
            {props.row2}
          </p>
        )}

        {props.row3 && (
          <p
            className={classNames(
              "text-xs font-light ",
              _dark ? "text-gray-300" : "text-gray-500"
            )}
          >
            {props.row3}
          </p>
        )}
        {props.rowComponent}
      </div>
    </div>
  );
};

// AvatarCell.defaultProps = {
//   size: AVATAR_SIZES.md,
//   hasPadding: false,
//   dark: false,
// };
