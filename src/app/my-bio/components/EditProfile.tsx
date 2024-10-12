import { useState } from "react";
import { BackHeader, PageContainer, SCREEN_WIDTH } from "@/components";
import { Employee, sampleEmployee } from "@/models";

import React from "react";
import { ProfileFormView } from "./ProfileFormView";

export const ProfileContext = React.createContext<{
  employee?: Employee;
  setEmployee: Function;
}>({
  setEmployee: () => {},
});

export const RegisterProfile = () => {
  //   const employee = sampleEmployee;
  const [employee, setEmployee] = useState<Employee>(sampleEmployee);
  const [editMode, setEditMode] = useState(true);

  const setEmployeeHandler = () => {};
  return (
    <PageContainer
      documentTitle="Register Bio"
      fullWidth={SCREEN_WIDTH.regular}
      isLoading={false}
    >
      <BackHeader previousPathName="to Home" />
      <div className="pb-4 border-b">
        <h2 className="text-lg font-semibold leading-7 text-gray-900">
          Complete your Profile
        </h2>
      </div>

      <ProfileContext.Provider
        value={{
          employee: employee,
          setEmployee: setEmployeeHandler,
        }}
      >
        <ProfileFormView editMode={editMode} />
      </ProfileContext.Provider>
    </PageContainer>
  );
};
