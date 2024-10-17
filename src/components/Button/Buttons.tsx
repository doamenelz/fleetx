"use client";
import { FC } from "react";
import {
  ButtonProps,
  BUTTON_SIZES,
  BUTTON_SKIN,
  ICON_POSITION,
} from "./Buttons.types";
import { classNames } from "@/lib/utilities/helperFunctions";
import Link from "next/link";
/** Only use this button if you require an action performed on a page, for navigation, use Link instead */
export const Button: FC<ButtonProps> = ({
  size,
  skin,
  label,
  onClick,
  type,
  fillWidth,
  componentType,
  link,
  destructive,
  icon,
  disabled,
  isLoading,
}) => {
  let sizeClass: string;
  let skinStyleClass: string;

  const _size = size ?? BUTTON_SIZES.md;
  const _skin = skin ?? BUTTON_SKIN.primary;
  const _type = type ?? "button";
  const _componentType = componentType ?? "button";
  const _destructive = destructive ?? false;

  switch (_size) {
    case BUTTON_SIZES.sm:
      sizeClass = `${
        _skin === BUTTON_SKIN.link || BUTTON_SKIN.linkColor ? "py-0" : "py-1"
      } ${fillWidth ? "w-full mx-auto" : "px-4 inline-flex"}`;
      break;
    case BUTTON_SIZES.md:
      sizeClass = `py-2
       ${fillWidth ? "w-full mx-auto" : "px-4 inline-flex"}`;

      break;
    case BUTTON_SIZES.lg:
      sizeClass = `py-3
      ${fillWidth ? "w-full mx-auto" : "px-4 inline-flex"}`;
      break;
    default:
      sizeClass =
        (_skin === BUTTON_SKIN.link || BUTTON_SKIN.linkColor) &&
        `py-1 ${fillWidth ? "w-full mx-auto" : "px-4 inline-flex"}`;
      break;
  }

  switch (_skin) {
    case BUTTON_SKIN.primary:
      skinStyleClass = `${
        _destructive
          ? "bg-error-600 border-error-600 focus-visible:outline-error-200 hover:bg-error-700"
          : disabled
          ? "bg-slate-400 border-indigo-400"
          : " bg-gradient-to-r from-brand-indiGlow to-brand-indiGlow hover:bg-gradient-to-r hover:from-indigo-700 hover:to-indigo-700 focus-visible:outline-indigo-200"
      } border text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1`;
      break;
    case BUTTON_SKIN.secondary:
      skinStyleClass = `bg-white ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 ${
        _destructive
          ? "focus-visible:outline-error-400 text-error-600 ring-error-300 hover:bg-error-50"
          : "focus-visible:outline-gray-100 text-primary-700 ring-gray-300 hover:bg-gray-50"
      } `;
      break;
    case BUTTON_SKIN.secondaryColor:
      skinStyleClass = `${
        _destructive
          ? "bg-error-100 border-error-300 text-error-900 hover:text-slate-50 text-error-700 hover:bg-error-700 focus-visible:outline-error-400"
          : "bg-indigo-50 ring-indigo-300 text-indigo-900 hover:bg-brand-blueAnchorFish hover:text-indigo-100 focus-visible:outline-indigo-100"
      }  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1`;
      break;
    case BUTTON_SKIN.link:
      skinStyleClass = `${
        _destructive
          ? "hover:bg-error-50 text-error-600"
          : "hover:bg-gray-50 text-primary-700"
      } hover:text-${
        _destructive ? "error" : "gray"
      }-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 ${
        _destructive
          ? "focus-visible:outline-error-100"
          : "focus-visible:outline-gray-100"
      }`;
      break;
    case BUTTON_SKIN.linkColor:
      skinStyleClass = ` text-${
        _destructive ? "error" : "primary"
      }-700 hover:text-${
        destructive ? "error" : "primary"
      }-900 focus:outline-none`;
      break;

    default:
      skinStyleClass = `bg-${
        _destructive ? "error" : "primary"
      }-600 ring-1 ring-${_destructive ? "error" : "primary"}-600 hover:bg-${
        _destructive ? "error" : "primary"
      }-800 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-${
        _destructive ? "error" : "primary"
      }-200`;
      break;
  }

  return (
    <>
      {_componentType === "link" ? (
        <div>
          <Link href={link!}>
            <div
              className={classNames(
                sizeClass,
                skinStyleClass,
                `items-center text-sm font-medium text-center rounded-md gap-x-2 sm:text-sm ${
                  (disabled || isLoading) && "cursor-not-allowed"
                } `
              )}
            >
              <ButtonLabel
                label={label}
                isLoading={isLoading}
                icon={icon}
              />
            </div>
          </Link>
        </div>
      ) : (
        <button
          disabled={disabled || isLoading}
          type={_type}
          onClick={onClick}
          className={classNames(
            sizeClass,
            skinStyleClass,
            `items-center  font-medium text-center rounded-md gap-x-2 sm:text-xs ${
              (disabled || isLoading) && "cursor-not-allowed "
            } ${fillWidth && "w-full"} `
          )}
        >
          <ButtonLabel
            label={label}
            isLoading={isLoading}
            icon={icon}
          />
        </button>
      )}
    </>
  );
};

const ButtonLabel: FC<{
  label: string;
  icon?: { position: ICON_POSITION; asset: JSX.Element };
  isLoading?: boolean;
}> = ({ label, isLoading, icon }) => {
  return (
    <>
      {/* {label} */}
      {icon ? (
        icon.position === ICON_POSITION.leading ? (
          <div className="flex items-center justify-center text-xs gap-x-2">
            <span className={`${isLoading && "animate-spin"}`}>
              {icon.asset}
            </span>
            {label}
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs gap-x-2">
            <p>{label}</p>

            <span className={`${isLoading && "animate-spin"}`}>
              {icon.asset}
            </span>
          </div>
        )
      ) : (
        <p className="text-xs">{label}</p>
      )}
    </>
  );
};

export const IconButton: FC<{ onClick: () => void; skin: string }> = (
  props
) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${props.skin} p-2 rounded-full shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600`}
    >
      {/* <Icon size={ICON_SIZES.md} icon={IconList.xMark} /> */}
    </button>
  );
};

export const IconStyleQL: FC<{
  url: string;
  label: string;
  copy: string;
  icon: any;
}> = ({ url, label, copy, icon }) => {
  return (
    <Link
      href={url}
      className="relative flex items-center py-6 border-b gap-x-6 group"
    >
      <div className="flex items-center justify-center flex-none w-10 h-10 rounded-lg shadow-sm text-primary-900 ring-1 ring-gray-900/10">
        {icon}
      </div>
      <div className="flex-auto">
        <h3 className="text-sm font-semibold leading-6 text-gray-900 group-hover:text-primary-900">
          <span
            className="absolute inset-0"
            aria-hidden="true"
          />
          {label}
        </h3>
        <p className="mt-1 text-sm font-light leading-6 text-gray-600">
          {copy}
        </p>
      </div>
      <div className="self-center flex-none group-hover:text-primary-910">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
};
