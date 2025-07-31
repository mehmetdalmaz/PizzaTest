import { methods } from "../api/api";

export const cartService = {
  getCart: () => methods.get("Cart"),
  addCart: ({ productId, quantity }) =>
    methods.post(`Cart?productId=${productId}&quantity=${quantity}`),
  removeCart: (id) => methods.delete(`Cart/${id}`),
};
