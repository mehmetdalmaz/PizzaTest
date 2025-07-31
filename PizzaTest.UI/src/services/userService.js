import { methods } from "../api/api";

export const userService = {
  getAllUsers: () => methods.get("User"),
};
