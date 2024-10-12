"use client";
import { PageContainer, SCREEN_WIDTH } from "@/components";
import { Employee, sampleEmployee } from "@/models";
import { ProfileFormView, EmployeeHero, ProfileContext } from "@/modules/MyBio";
import { useState } from "react";

export default function Page() {
  const [employee, setEmployee] = useState<Employee>(sampleEmployee);
  const updateEmployeeHandler = () => {};
  const [editMode, setEditMode] = useState(false);
  const editModeHandler = () => {
    setEditMode(!editMode);
  };

  // const path = usePathname();

  // const navigation = PrimaryNavigation.find((nav) => path.includes(nav.link));
  return (
    <PageContainer
      documentTitle="My Profile"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showFooter={true}
    >
      <EmployeeHero
        employee={sampleEmployee}
        contact={true}
        screenWidth={SCREEN_WIDTH.regular}
      />
      <ProfileContext.Provider
        value={{
          employee: employee,
          setEmployee: updateEmployeeHandler,
        }}
      >
        <ProfileFormView editMode={editMode} />
      </ProfileContext.Provider>
    </PageContainer>
  );
}
