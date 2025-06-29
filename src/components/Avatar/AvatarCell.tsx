"use client";
import React from "react";
import { AVATAR_SIZES, AvatarCellProps } from "./Avatar.types";
import { Avatar } from "./Avatar";
import clsx from "clsx";
export const AvatarCell = ({
  firstName,
  lastName,
  imageUrl,
  size = AVATAR_SIZES.md,
  hasPadding = false,
  highlightName,
  fullName,
  row2,
  row3,
  rowComponent,
  dark = false,
  bgColor,
}: AvatarCellProps) => {
  return (
    <div
      className={`flex text-left ${
        row3 !== undefined || rowComponent !== undefined ? "" : "items-center"
      } ${highlightName && "group cursor-pointer"}`}
    >
      <Avatar
        size={size}
        firstName={firstName}
        lastName={lastName}
        imageUrl={imageUrl}
        hasPadding={hasPadding}
        bgColor={bgColor}
      />

      <div className="ml-2 space-y-1">
        <p
          className={clsx(
            "text-sm font-medium ",
            highlightName
              ? "text-primary-900 group-hover:text-primary-700"
              : dark
              ? "text-gray-100"
              : "text-gray-900"
          )}
        >
          {fullName}
        </p>
        {row2 && (
          <p
            className={clsx(
              "text-xs",
              dark ? "text-gray-200" : "text-gray-700"
            )}
          >
            {row2}
          </p>
        )}

        {row3 && (
          <p
            className={clsx(
              "text-xs",
              dark ? "text-gray-300" : "text-gray-500"
            )}
          >
            {row3}
          </p>
        )}
        {rowComponent}
      </div>
    </div>
  );
};
