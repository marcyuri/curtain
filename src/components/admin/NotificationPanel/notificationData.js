// Données d'exemple en attendant le service de notifications (Document 07).
// À remplacer par un appel réel : notificationService.getAll()

const notifications = [

    {
        id: "1",
        type: "order",
        title: "Nouvelle commande",
        message: "Une nouvelle commande a été passée.",
        read: false,
    },

    {
        id: "2",
        type: "consultation",
        title: "Consultation planifiée",
        message: "Une nouvelle consultation a été réservée.",
        read: false,
    },

    {
        id: "3",
        type: "stock",
        title: "Stock faible",
        message: "Un produit atteint son seuil de réapprovisionnement.",
        read: true,
    },

];

export default notifications;
