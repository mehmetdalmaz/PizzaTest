import { methods } from "../api/api";

export const orderService = {
  addOrder: (data) => methods.post("Order/create", data),
  getOrders: () => methods.get("Order/getall"),
  deleteOrder: (id) => methods.delete(`Order/delete/${id}`),
};
