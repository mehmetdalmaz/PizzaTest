import { methods } from "../api/api";

export const addressService = {
  getAllAddresses: () => methods.get("Address"),
  addAddress: (data) => methods.post("Address", data),
};
