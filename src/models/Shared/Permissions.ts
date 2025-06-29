import { User } from "./User";

export const parseVehicleModulePermissions = (user: User, screen: string) => {
  const views: string[] = [];

  switch (user.profile) {
    case "employee":
      break;
    case "driver":
      break;
    case "mechanic":
      break;
    case "vendor":
      break;
    case "admin":
      break;
    case "finance":
      break;

    default:
      break;
  }
  user.roles
    .find((module) => module.module === "vehicles")
    ?.crudValues.forEach((role: string) => {
      switch (role) {
        case "value":
          break;

        default:
          break;
      }
    });
};
