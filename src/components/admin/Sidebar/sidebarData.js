import { LayoutDashboard, Package } from "lucide-react";

const sidebarItems = [

    {
        id: "dashboard",
        label: "Tableau de bord",
        path: "/admin",
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN", "ADMINISTRATOR", "MANAGER"],
    },

    {
        id: "products",
        label: "Produits",
        path: "/admin/products",
        icon: Package,
        roles: ["SUPER_ADMIN", "ADMINISTRATOR", "MANAGER"],
    },

];

export default sidebarItems;
