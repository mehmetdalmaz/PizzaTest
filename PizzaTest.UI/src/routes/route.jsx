import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/UsersPage/HomePage";
import LoginPage from "../pages/UsersPage/LoginPage";
import RegisterPage from "../pages/UsersPage/RegisterPage";
import AdminLoginPage from "../pages/AdminPage/AdminLoginPage";
import AdminHomePage from "../pages/AdminPage/AdminHomePage";
import PrivateRoute from "../components/PrivateRoute";
import OrderPage from "../pages/UsersPage/OrderPage";
import Products from "../pages/AdminPage/Products";
import Categories from "../pages/AdminPage/Categories";
import Orders from "../pages/AdminPage/Orders";
import AdminLayout from "../layouts/AdminLayout";
import Users from "../pages/AdminPage/Users";

const isLoggedIn = !!localStorage.getItem("token");

export const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: isLoggedIn ? (
          <Navigate to="/home" />
        ) : (
          <Navigate to="/auth/login" />
        ),
      },
      {
        path: "home",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      { path: "order", element: <OrderPage /> },

      {
        path: "auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
    ],
  },

  { path: "/admin", element: <AdminLoginPage /> },

  {
    path: "/admin-panel",
    element: <AdminLayout />,
    children: [
      { path: "home", element: <AdminHomePage /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "orders", element: <Orders /> },
      { path: "users", element: <Users /> },
    ],
  },
]);
