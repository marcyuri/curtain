import {

    PackagePlus,

    ShoppingCart,

    HeartHandshake,

    CalendarPlus,

    UserPlus,

    Newspaper,

    Mail,

    Settings,

} from "lucide-react";

const quickActions = [

    {

        id: 1,

        title: "Ajouter un produit",

        description: "Créer un nouveau produit",

        icon: PackagePlus,

        color: "red",

        path: "/admin/products/new",

    },

    {

        id: 2,

        title: "Nouvelle commande",

        description: "Créer une commande",

        icon: ShoppingCart,

        color: "green",

        path: "/admin/orders/new",

    },

    {

        id: 3,

        title: "Consultation",

        description: "Créer un rendez-vous",

        icon: HeartHandshake,

        color: "purple",

        path: "/admin/consultations/new",

    },

    {

        id: 4,

        title: "Nouvel évènement",

        description: "Créer un évènement",

        icon: CalendarPlus,

        color: "orange",

        path: "/admin/events/new",

    },

    {

        id: 5,

        title: "Nouvel employé",

        description: "Ajouter un employé",

        icon: UserPlus,

        color: "blue",

        path: "/admin/employees/new",

    },

    {

        id: 6,

        title: "Actualité",

        description: "Publier un article",

        icon: Newspaper,

        color: "cyan",

        path: "/admin/news/new",

    },

    {

        id: 7,

        title: "Newsletter",

        description: "Nouvelle campagne",

        icon: Mail,

        color: "pink",

        path: "/admin/newsletter/new",

    },

    {

        id: 8,

        title: "Paramètres",

        description: "Configurer l'application",

        icon: Settings,

        color: "gray",

        path: "/admin/settings",

    },

];

export default quickActions;