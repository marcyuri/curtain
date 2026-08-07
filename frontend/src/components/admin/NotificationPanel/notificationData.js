// Données d'exemple en attendant le service de notifications (Document 07).
// À remplacer par un appel réel : notificationService.getAll()

import { ShoppingBag, CalendarCheck, PackageX } from "lucide-react";

const notifications = [

    {
        id: "1",
        type: "order",
        icon: ShoppingBag,
        title: "Nouvelle commande",
        message: "Une nouvelle commande a été passée.",
        time: "Il y a 5 min",
        read: false,
    },

    {
        id: "2",
        type: "consultation",
        icon: CalendarCheck,
        title: "Consultation planifiée",
        message: "Une nouvelle consultation a été réservée.",
        time: "Il y a 1 h",
        read: false,
    },

    {
        id: "3",
        type: "stock",
        icon: PackageX,
        title: "Stock faible",
        message: "Un produit atteint son seuil de réapprovisionnement.",
        time: "Hier",
        read: true,
    },

];

export default notifications;
