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

const sidebarItems = [

    {

        id: "dashboard",

        label: "Dashboard",

        icon: LayoutDashboard,

        path: "/admin",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

            "EMPLOYEE",

            "CONSULTANT",

        ],

    },

    {

        id: "products",

        label: "Produits",

        icon: Package,

        path: "/admin/products",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

        ],

    },

    {

        id: "categories",

        label: "Catégories",

        icon: Tags,

        path: "/admin/categories",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

        ],

    },

    {

        id: "orders",

        label: "Commandes",

        icon: ShoppingCart,

        path: "/admin/orders",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

            "EMPLOYEE",

        ],

    },

    {

        id: "customers",

        label: "Clients",

        icon: Users,

        path: "/admin/customers",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

            "EMPLOYEE",

        ],

    },

    {

        id: "consultations",

        label: "Consultations",

        icon: HeartHandshake,

        path: "/admin/consultations",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

            "CONSULTANT",

        ],

    },

    {

        id: "bookings",

        label: "Réservations",

        icon: CalendarClock,

        path: "/admin/bookings",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

            "CONSULTANT",

            "EMPLOYEE",

        ],

    },

    {

        id: "events",

        label: "Évènements",

        icon: CalendarDays,

        path: "/admin/events",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

        ],

    },

    {

        id: "employees",

        label: "Employés",

        icon: UserCog,

        path: "/admin/employees",

        roles: [

            "SUPER_ADMIN",

        ],

    },

    {

        id: "users",

        label: "Utilisateurs",

        icon: UserRound,

        path: "/admin/users",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

        ],

    },

    {

        id: "payments",

        label: "Paiements",

        icon: CreditCard,

        path: "/admin/payments",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

        ],

    },

    {

        id: "news",

        label: "Actualités",

        icon: Newspaper,

        path: "/admin/news",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

        ],

    },

    {

        id: "messages",

        label: "Messages",

        icon: MessageSquare,

        path: "/admin/messages",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

            "EMPLOYEE",

        ],

    },

    {

        id: "newsletter",

        label: "Newsletter",

        icon: Mail,

        path: "/admin/newsletter",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

        ],

    },

    {

        id: "settings",

        label: "Paramètres",

        icon: Settings,

        path: "/admin/settings",

        roles: [

            "SUPER_ADMIN",

            "ADMIN",

        ],

    },

];

export default sidebarItems;

export const logoutItem = {

    label: "Déconnexion",

    icon: LogOut,

};