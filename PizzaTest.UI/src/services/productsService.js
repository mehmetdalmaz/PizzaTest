import { methods } from "../api/api";

export const productService = {
  getAllProducts: () => methods.get("Product"),
  addProduct: (data) => methods.post("Product", data),
  updateProduct: (id, data) => methods.put(`Product/${id}`, data),
  deleteProduct: (id) => methods.delete(`Product/${id}`),
  getProductById: (id) => methods.get(`Product/${id}`),
};
