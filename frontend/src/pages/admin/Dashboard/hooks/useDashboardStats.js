import {
    Package,
    ShoppingCart,
    Users,
    HeartHandshake,
} from "lucide-react";

// Isole les données des cartes de statistiques du Dashboard (Document 05,
// Partie II — un composant ne mélange jamais affichage et données).
//
// TODO: remplacer par un appel à un futur dashboardService une fois le
// backend disponible (Document 07). La forme des données ci-dessous est
// volontairement identique à ce qu'un tel service retournerait, pour que
// la bascule ne nécessite aucun changement dans Dashboard.jsx.

function useDashboardStats() {

    const stats = [

        {
            id: "products",
            title: "Produits",
            value: "248",
            trend: 12,
            subtitle: "Depuis le mois dernier",
            icon: Package,
            color: "primary",
        },

        {
            id: "orders",
            title: "Commandes",
            value: "156",
            trend: 8,
            subtitle: "Aujourd'hui",
            icon: ShoppingCart,
            color: "green",
        },

        {
            id: "customers",
            title: "Clients",
            value: "842",
            trend: 18,
            subtitle: "Clients actifs",
            icon: Users,
            color: "blue",
        },

        {
            id: "consultations",
            title: "Consultations",
            value: "36",
            trend: 4,
            subtitle: "Cette semaine",
            icon: HeartHandshake,
            color: "purple",
        },

    ];

    return { stats };

}

export default useDashboardStats;
