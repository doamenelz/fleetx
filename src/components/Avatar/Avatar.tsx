"use client";
import React from "react";
import { FC, useState } from "react";
import { AVATAR_SIZES, AvatarProps } from "./Avatar.types";
import { classNames } from "@/lib/utilities/helperFunctions";
import Image from "next/image";
export const Avatar: FC<AvatarProps> = ({
  size,
  firstName,
  lastName,
  imageUrl,
  hasPadding,
  center,
}) => {
  const avatarColors = [
    "bg-primary-600",
    "bg-gray-900",
    "bg-primary-910",
    "bg-success-500",
  ];

  const getInitials = () => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)} `.toUpperCase();
  };

  const _size = size ?? AVATAR_SIZES.md;
  const _hasPadding = hasPadding ?? false;

  let sizeClass;

  let textPadding;

  const [loadComplete, setLoadComplete] = useState(false);
  const [loadError, setLoadError] = useState(false);

  switch (_size) {
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
        <img
          className={classNames(
            sizeClass,
            _hasPadding ? "p-1 shadow-sm ring-2 ring-white" : "",
            "max-w-none rounded-full object-cover flex-shrink-0",
            center ? "mx-auto" : ""
          )}
          src={imageUrl}
          onLoad={() => setLoadComplete(true)}
          alt=""
          onError={() => setLoadError(true)}
        />
      ) : (
        <div
          className={classNames(
            sizeClass,
            textPadding,
            "items-center flex-shrink-0 justify-center flex text-center rounded-full ring-1 ring-white text-gray-25 bg-gradient-to-r from-gray-600 to-gray-900"
          )}
        >
          <span className="items-center my-auto text-white">
            {getInitials()}
          </span>
        </div>
      )}
    </>
  );
};

// Avatar.defaultProps = {
//   size: AVATAR_SIZES.md,
//   hasPadding: false,
// };

/*
 <img
            className={classNames(
              sizeClass,
              _hasPadding ? "p-1 shadow-sm" : "",
              "max-w-none ring-2 ring-white rounded-full object-cover flex-shrink-0",
              center ? "mx-auto" : ""
            )}
            src={imageUrl}
            // onLoad={() => setLoadComplete(true)}
            alt=""
          />
*/
