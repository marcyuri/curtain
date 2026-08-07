// États d'une commande (Document 06, Chapitre 17).
// Ces états proviennent du backend ; cette constante évite seulement
// les chaînes magiques côté Frontend.

export const ORDER_STATUS = {
    DRAFT: "draft",
    PENDING: "pending",
    CONFIRMED: "confirmed",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    REFUNDED: "refunded",
};
