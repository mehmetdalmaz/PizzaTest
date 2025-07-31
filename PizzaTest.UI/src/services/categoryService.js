import { methods } from "../api/api";

export const categoryService = {
  getAllCategories: () => methods.get("Category"),
  addCategory: (data) => methods.post("Category", data),
  updateCategory: (id, data) => methods.put(`Category/${id}`, data),
  deleteCategory: (id) => methods.delete(`Category/${id}`),
  getCategoryById: (id) => methods.get(`Category/${id}`),
};
