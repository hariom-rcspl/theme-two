import DashboardLayout from "@/layouts/DashboardLayout"
import Categories from "@/pages/Categories"
import Dashboard from "@/pages/Dashboard"
import Products from "@/pages/Products"
import Reports from "@/pages/Reports"
import Users from "@/pages/Users"
import { Route, Routes } from "react-router-dom"

const Routing = () => {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/categories" element={<Categories />} />
            </Route>
        </Routes>
    )
}

export default Routing
