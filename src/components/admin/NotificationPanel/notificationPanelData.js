import {

    ShoppingCart,

    CreditCard,

    Package,

    MessageSquare,

    HeartHandshake,

    CalendarDays,

    AlertTriangle,

} from "lucide-react";

const notifications = [

    {

        id: 1,

        title: "Nouvelle commande",

        message: "Une nouvelle commande a été enregistrée.",

        icon: ShoppingCart,

        type: "success",

        read: false,

        time: "2 min",

    },

    {

        id: 2,

        title: "Paiement reçu",

        message: "Le paiement de la commande #2548 est confirmé.",

        icon: CreditCard,

        type: "primary",

        read: false,

        time: "10 min",

    },

    {

        id: 3,

        title: "Stock faible",

        message: "Le T-shirt Premium est bientôt en rupture.",

        icon: Package,

        type: "warning",

        read: false,

        time: "18 min",

    },

    {

        id: 4,

        title: "Nouveau message",

        message: "Un client vous a envoyé un message.",

        icon: MessageSquare,

        type: "info",

        read: true,

        time: "45 min",

    },

    {

        id: 5,

        title: "Consultation",

        message: "Une consultation vient d'être réservée.",

        icon: HeartHandshake,

        type: "success",

        read: true,

        time: "1 h",

    },

    {

        id: 6,

        title: "Evènement",

        message: "Le séminaire commence demain.",

        icon: CalendarDays,

        type: "primary",

        read: true,

        time: "Hier",

    },

    {

        id: 7,

        title: "Attention",

        message: "Une sauvegarde est recommandée.",

        icon: AlertTriangle,

        type: "danger",

        read: false,

        time: "Hier",

    },

];

export default notifications;