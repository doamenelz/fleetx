import { FC } from "react";
import { Employee } from "@/models";
import {
  Avatar,
  AVATAR_SIZES,
  HeaderBackdrop,
  SCREEN_WIDTH,
  setScreenWidth,
  STATUS_COLORS,
  StatusBadge,
} from "@/components";
import { AtSymbolIcon } from "@heroicons/react/20/solid";
import { DevicePhoneMobileIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/lib/utilities/helperFunctions";
export const EmployeeHero: FC<{
  employee: Employee;
  contact?: boolean;
  button?: JSX.Element;
  screenWidth?: SCREEN_WIDTH;
  bottomBorder?: boolean;
}> = ({ employee, contact, button, screenWidth, bottomBorder }) => {
  return (
    <div className={classNames("flex-1 mb-10")}>
      <HeaderBackdrop />
      <div
        className={classNames(
          "px-4 -my-12",
          bottomBorder ? "border-b pb-10" : "",
          setScreenWidth(screenWidth ?? SCREEN_WIDTH.full)
        )}
      >
        <Avatar
          firstName={employee.bioData.firstName}
          lastName={employee.bioData.lastName}
          size={AVATAR_SIZES.xxl}
          imageUrl={employee.bioData.avatar}
        />

        <div className="flex justify-between items-center">
          <div className="mt-4 space-y-2 text-slate-700">
            <p className="text-2xl leading-7 font-semibold text-slate-900">
              {employee.bioData.firstName} {employee.bioData.lastName}
            </p>
            <p className="text-sm font-medium text-slate-700">
              {employee.jobInformation?.jobTitle}
            </p>
            <StatusBadge
              statusType={STATUS_COLORS.regular}
              label={`ID: ${employee.id}`}
            />

            {contact && (
              <div className="space-y-2 mt-4">
                <BioCell
                  type="email"
                  label={employee.contactDetails?.emailAddress ?? ""}
                />
                <BioCell
                  type="phone"
                  label={employee.contactDetails?.phoneNumber ?? ""}
                />
                <BioCell
                  type="location"
                  label={employee.jobInformation?.location ?? ""}
                />
              </div>
            )}
          </div>
          {button}
        </div>
      </div>
    </div>
  );
};

const BioCell: FC<{ type: "email" | "phone" | "location"; label: string }> = ({
  type,
  label,
}) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        {type === "email" && <AtSymbolIcon className="w-4 h-4" />}
        {type === "phone" && <DevicePhoneMobileIcon className="w-4 h-4" />}
        {type === "location" && <MapPinIcon className="w-4 h-4 " />}

        {(type === "email" || type === "phone") && (
          <button
            onClick={() =>
              (window.location.href =
                type === "email"
                  ? `mailto:${label ?? ""}`
                  : `tel:${label ?? ""}`)
            }
            className="text-sm font-light text-indigo-700  hover:text-indigo-600"
          >
            {label}
          </button>
        )}

        {type === "location" && (
          <p className="text-sm font-light text-slate-600">{label}</p>
        )}
      </div>
    </>
  );
};
