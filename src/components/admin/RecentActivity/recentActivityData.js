import {

    ShoppingCart,

    Package,

    HeartHandshake,

    CalendarDays,

    CreditCard,

    UserPlus,

    MessageSquare,

} from "lucide-react";

const recentActivity = [

    {

        id: 1,

        title: "Nouvelle commande",

        description: "Commande #ORD-2026001 créée.",

        user: "Paul Ndzi",

        time: "Il y a 5 min",

        icon: ShoppingCart,

        color: "green",

    },

    {

        id: 2,

        title: "Produit ajouté",

        description: "T-shirt LOVE Premium.",

        user: "Marc",

        time: "Il y a 15 min",

        icon: Package,

        color: "red",

    },

    {

        id: 3,

        title: "Consultation réservée",

        description: "Consultation familiale.",

        user: "Marie",

        time: "Il y a 20 min",

        icon: HeartHandshake,

        color: "purple",

    },

    {

        id: 4,

        title: "Évènement créé",

        description: "Conférence annuelle.",

        user: "Admin",

        time: "Il y a 45 min",

        icon: CalendarDays,

        color: "orange",

    },

    {

        id: 5,

        title: "Paiement validé",

        description: "Facture #FAC-2548.",

        user: "Paul",

        time: "Il y a 1 heure",

        icon: CreditCard,

        color: "blue",

    },

    {

        id: 6,

        title: "Nouvel employé",

        description: "Jean Mvondo ajouté.",

        user: "Marc",

        time: "Aujourd'hui",

        icon: UserPlus,

        color: "cyan",

    },

    {

        id: 7,

        title: "Nouveau message",

        description: "Message reçu depuis le site.",

        user: "Visiteur",

        time: "Aujourd'hui",

        icon: MessageSquare,

        color: "pink",

    },

];

export default recentActivity;