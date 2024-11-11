export interface ModulesConfig {
  type: string;
}

export const parseRoleDisplay = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "Administrator";
    case "EMPLOYEE":
      return "Employee";

    default:
      return "User";
  }
};

export const checkIfUserHasRole = (role: string, currentRoles: string[]) => {
  const isSelected = currentRoles.find((userRole) => userRole === role);
  if (isSelected !== undefined && isSelected === role) {
    return true;
  } else {
    return false;
  }
};

export const checkField = () => {
  return true;
};
