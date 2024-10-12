"use client";
import {
  AVATAR_SIZES,
  Avatar,
  AvatarCell,
  AvatarStack,
  BUTTON_SKIN,
  Button,
  Lbl,
  STATUS_COLORS,
  StatusBadge,
} from "@/components";
import { Employee, sampleEmployeeList } from "@/models";
import { FC } from "react";

export const EmployeeCard: FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="rounded-md border pb-12">
      <div className="bg-gradient-to-r from-yellow-600 to-red-600 h-20 rounded-tl-md rounded-tr-md"></div>
      <div className="text-center block mx-auto px-4 align-baseline w-full -m-10 space-y-6">
        <div className="flex justify-between items-end">
          <Avatar
            firstName={employee.bioData.firstName}
            lastName={employee.bioData.lastName}
            imageUrl={employee.bioData.avatar}
            size={AVATAR_SIZES.xxl}
          />
          <Button label="View Profile" skin={BUTTON_SKIN.secondaryColor} />
        </div>

        <div className="text-left space-y-1">
          <p className="text-slate-900 font-semibold">
            {employee.bioData.fullName}
          </p>
          <p className="text-slate-700 text-sm">
            {employee.jobInformation?.jobTitle}
          </p>
          <p className="text-slate-700 text-xs">#: {employee.id}</p>
          <StatusBadge label="Active" statusType={STATUS_COLORS.success} />
        </div>

        <div className="border-t py-4 space-y-4">
          <div className="py-2 space-y-2">
            <Lbl label="Manager" />
            <AvatarCell
              firstName={employee.lineManager?.bioData.firstName ?? ""}
              lastName={employee.lineManager?.bioData.lastName ?? ""}
              fullName={employee.lineManager?.bioData.fullName ?? ""}
              imageUrl={employee.lineManager?.bioData.avatar ?? ""}
              row2={employee.lineManager?.jobInformation?.jobTitle ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Lbl label="Direct Reports" />
            <AvatarStack
              employees={sampleEmployeeList}
              size={AVATAR_SIZES.sm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
