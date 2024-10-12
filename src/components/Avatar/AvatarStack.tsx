"use client";
import { Employee } from "@/models";
import { AVATAR_SIZES, Avatar } from ".";
import { FC } from "react";
export const AvatarStack: FC<{
  employees: Employee[];
  size: AVATAR_SIZES;
}> = ({ employees, size }) => {
  return (
    <div>
      <div className="flex flex-shrink-0 -space-x-1">
        {employees.slice(0, 5).map((employee) => (
          <Avatar
            key={employee.id}
            firstName={employee.bioData.firstName}
            lastName={employee.bioData.lastName}
            size={size}
            imageUrl={employee.bioData.avatar}
          />
        ))}
      </div>
    </div>
  );
};
