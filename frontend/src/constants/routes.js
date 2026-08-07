// Chemins de route centralisés (Document 02, Ch.9 — éviter les chaînes
// magiques). Reflète exactement les routes déclarées dans
// src/routes/AppRouter.jsx.

export const ROUTES = {

    HOME: "/",
    ABOUT: "/about",
    PRODUCTS: "/products",
    PRODUCT_DETAILS: (slug) => `/products/${slug}`,
    CONSULTATIONS: "/consultations",
    EVENTS: "/events",
    CONTACT: "/contact",
    APPOINTMENT: "/appointment",

    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_EMAIL: "/verify-email",

    ADMIN_LOGIN: "/admin/login",
    ADMIN_ACCESS: "/admin/access",
    ADMIN_DASHBOARD: "/admin",
    ADMIN_PRODUCTS: "/admin/products",

};
