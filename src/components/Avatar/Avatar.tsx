"use client";
import React from "react";
import { useState } from "react";
import { AVATAR_SIZES, AvatarProps } from "./Avatar.types";
import clsx from "clsx";
export const Avatar = ({
  size = AVATAR_SIZES.md,
  firstName,
  lastName,
  imageUrl,
  hasPadding = false,
  center,
  bgColor = "bg-gradient-to-r from-gray-600 to-gray-900",
}: AvatarProps) => {
  const getInitials = () => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)} `.toUpperCase();
  };

  let sizeClass;
  let textPadding;

  // const [loadComplete, setLoadComplete] = useState(true);
  const [loadError, setLoadError] = useState(false);

  switch (size) {
    case AVATAR_SIZES.xs:
      sizeClass = "w-6 h-6 text-sm";
      textPadding = "text-sm";
      break;
    case AVATAR_SIZES.sm:
      sizeClass = "w-8 h-8 text-sm";
      textPadding = "text-sm";
      break;
    case AVATAR_SIZES.md:
      sizeClass = "w-10 h-10 text-lg";
      textPadding = "";
      break;
    case AVATAR_SIZES.lg:
      sizeClass = "w-12 h-12";
      textPadding = "text-lg";
      break;
    case AVATAR_SIZES.xl:
      sizeClass = "w-16 h-16 ";
      textPadding = "text-xl";
      break;
    case AVATAR_SIZES.xxl:
      sizeClass = "w-24 h-24";
      textPadding = "text-4xl";
      break;
    case AVATAR_SIZES.xxxl:
      sizeClass = "w-28 h-28";
      textPadding = "text-5xl";
      break;
    default:
      sizeClass = "w-10 h-10";
      textPadding = "py-1 text-xs";
  }

  return (
    <>
      {imageUrl !== undefined && imageUrl !== "" && !loadError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={clsx(
            sizeClass,
            hasPadding && "p-1",
            "max-w-none ring-1 ring-white rounded-full object-cover flex-shrink-0",
            center && "mx-auto"
          )}
          src={imageUrl}
          // onLoad={() => setLoadComplete(true)}
          alt=""
          onError={() => setLoadError(true)}
        />
      ) : (
        <div
          className={clsx(
            sizeClass,
            textPadding,
            bgColor,
            "items-center flex-shrink-0 justify-center flex text-center rounded-full ring-1 ring-white text-gray-25"
          )}
        >
          <span className="items-center font-medium my-auto text-white">
            {getInitials()}
          </span>
        </div>
      )}
    </>
  );
};
