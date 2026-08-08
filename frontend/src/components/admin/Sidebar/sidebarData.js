import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    HeartHandshake,
    CalendarClock,
    CalendarDays,
    UserCog,
    UserRound,
    CreditCard,
    Newspaper,
    MessageSquare,
    Mail,
    Settings,
    LogOut,
} from "lucide-react";

import { ROLES } from "@constants/roles";

const sidebarItems = [

    {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR, ROLES.EMPLOYEE, ROLES.CONSULTANT],
    },

    {
        id: "products",
        label: "Produits",
        icon: Package,
        path: "/admin/products",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR],
    },

    {
        id: "categories",
        label: "Catégories",
        icon: Tags,
        path: "/admin/categories",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR],
    },

    {
        id: "orders",
        label: "Commandes",
        icon: ShoppingCart,
        path: "/admin/orders",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },

    {
        id: "customers",
        label: "Clients",
        icon: Users,
        path: "/admin/customers",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },

    {
        id: "consultations",
        label: "Consultations",
        icon: HeartHandshake,
        path: "/admin/consultations",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR, ROLES.CONSULTANT],
    },

    {
        id: "bookings",
        label: "Réservations",
        icon: CalendarClock,
        path: "/admin/bookings",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR, ROLES.CONSULTANT, ROLES.EMPLOYEE],
    },

    {
        id: "events",
        label: "Évènements",
        icon: CalendarDays,
        path: "/admin/events",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR],
    },

    {
        id: "employees",
        label: "Employés",
        icon: UserCog,
        path: "/admin/employees",
        roles: [ROLES.SUPER_ADMIN],
    },

    {
        id: "users",
        label: "Utilisateurs",
        icon: UserRound,
        path: "/admin/users",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR],
    },

    {
        id: "payments",
        label: "Paiements",
        icon: CreditCard,
        path: "/admin/payments",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR],
    },

    {
        id: "news",
        label: "Actualités",
        icon: Newspaper,
        path: "/admin/news",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR],
    },

    {
        id: "messages",
        label: "Messages",
        icon: MessageSquare,
        path: "/admin/messages",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR, ROLES.EMPLOYEE],
    },

    {
        id: "newsletter",
        label: "Newsletter",
        icon: Mail,
        path: "/admin/newsletter",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR],
    },

    {
        id: "settings",
        label: "Paramètres",
        icon: Settings,
        path: "/admin/settings",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR],
    },

];

export default sidebarItems;

export const logoutItem = {
    label: "Déconnexion",
    icon: LogOut,
};
