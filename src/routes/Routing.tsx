import DashboardLayout from "@/layouts/DashboardLayout"
import { LoginPage } from "@/module/auth/pages/LoginPage"
import UserListPage from "@/module/users/pages/UserListPage"
import Categories from "@/pages/Categories"
import Dashboard from "@/pages/Dashboard"
import Products from "@/pages/Products"
import Reports from "@/pages/Reports"
import { shallowEqual, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"

const Routing = () => {
  const maintenanceStatus = false;

  const { token } = useSelector((state: any) => state.auth, shallowEqual);

  if (maintenanceStatus) {
    return <h2>Site is on maintenance mode!</h2>;
  }

  return (
    <Routes>
      {/* 🔹 Public Routes (Not Logged In) */}
      {!token && (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {/* 🔹 Private Routes (Logged In) */}
      {token && (
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/categories" element={<Categories />} />

          {/* redirect login if already logged in */}
          <Route path="/login" element={<Navigate to="/" replace />} />

          {/* fallback for unknown private routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default Routing;
