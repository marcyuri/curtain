import { LayoutDashboard, Package } from "lucide-react";

import { ROLES } from "@constants/roles";

const sidebarItems = [

    {
        id: "dashboard",
        label: "Tableau de bord",
        path: "/admin",
        icon: LayoutDashboard,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR, ROLES.MANAGER],
    },

    {
        id: "products",
        label: "Produits",
        path: "/admin/products",
        icon: Package,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMINISTRATOR, ROLES.MANAGER],
    },

];

export default sidebarItems;
