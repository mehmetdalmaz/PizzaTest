import { methods } from "../api/api";

export const cartService = {
  getCart: () => methods.get("Cart"),
  addCart: ({ productId, quantity }) =>
    methods.post(`Cart?productId=${productId}&quantity=${quantity}`),
  removeCart: (productId, quantity = 1) =>
    methods.delete(`Cart/${productId}?quantity=${quantity}`),
  updateCart: (id, quantity) => methods.put(`Cart/${id}`, quantity),
  clearCart: () => methods.delete("Cart/clear"),
};
