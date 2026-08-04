import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@layouts/MainLayout";
import AdminLayout from "@layouts/AdminLayout";

// Pages publiques
const Home = lazy(() => import("@pages/Home"));
const About = lazy(() => import("@pages/About"));
const Shop = lazy(() => import("@pages/Shop"));
const ProductDetails = lazy(() => import("@pages/ProductDetails"));
const Consultations = lazy(() => import("@pages/Consultations"));
const Events = lazy(() => import("@pages/Events"));
const Contact = lazy(() => import("@pages/Contact"));
const Booking = lazy(() => import("@pages/Booking"));

// Authentification
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@pages/ResetPassword"));
const VerifyEmail = lazy(() => import("@pages/VerifyEmail"));

// Back Office
const AdminLogin = lazy(() => import("@pages/admin/AdminLogin"));
const AdminAccess = lazy(() => import("@pages/admin/AdminAccess"));
const Dashboard = lazy(() => import("@pages/admin/Dashboard"));
const Products = lazy(() => import("@pages/admin/Products"));

const NotFound = lazy(() => import("@pages/NotFound"));

function AppRouter() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/products"
                    element={<Shop />}
                />

                <Route
                    path="/products/:slug"
                    element={<ProductDetails />}
                />

                <Route
                    path="/consultations"
                    element={<Consultations />}
                />

                <Route
                    path="/events"
                    element={<Events />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/appointment"
                    element={<Booking />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                <Route
                    path="/verify-email"
                    element={<VerifyEmail />}
                />

            </Route>

            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />

            <Route
                path="/admin/access"
                element={<AdminAccess />}
            />

            <Route element={<AdminLayout />}>

                <Route
                    path="/admin"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/products"
                    element={<Products />}
                />

            </Route>

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default AppRouter;
