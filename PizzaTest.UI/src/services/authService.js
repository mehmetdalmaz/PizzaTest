import { methods } from "../api/api";

export const authService = {
  login: (data) => methods.post("Auth/login", data),
  register: (data) => methods.post("Auth/register", data),
};
