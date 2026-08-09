// Permissions atomiques (Document 06 Ch.5, Document 13 Ch.7.2).
// Miroir exact de frontend/src/constants/permissions.js — toute
// nouvelle permission doit être ajoutée aux deux endroits.

export const PERMISSIONS = [

    { key: "product.read", module: "product", description: "Voir les produits" },
    { key: "product.create", module: "product", description: "Créer un produit" },
    { key: "product.update", module: "product", description: "Modifier un produit" },
    { key: "product.delete", module: "product", description: "Supprimer un produit" },

    { key: "customer.read", module: "customer", description: "Voir les clients" },
    { key: "customer.create", module: "customer", description: "Créer un client" },
    { key: "customer.update", module: "customer", description: "Modifier un client" },
    { key: "customer.delete", module: "customer", description: "Supprimer un client" },

    { key: "employee.read", module: "employee", description: "Voir les employés" },
    { key: "employee.create", module: "employee", description: "Créer un employé" },
    { key: "employee.update", module: "employee", description: "Modifier un employé" },
    { key: "employee.delete", module: "employee", description: "Supprimer un employé" },

    { key: "order.read", module: "order", description: "Voir les commandes" },
    { key: "order.create", module: "order", description: "Créer une commande" },
    { key: "order.update", module: "order", description: "Modifier une commande" },
    { key: "order.delete", module: "order", description: "Supprimer une commande" },

    { key: "consultation.read", module: "consultation", description: "Voir les consultations" },
    { key: "consultation.create", module: "consultation", description: "Créer une consultation" },
    { key: "consultation.update", module: "consultation", description: "Modifier une consultation" },
    { key: "consultation.delete", module: "consultation", description: "Supprimer une consultation" },

    { key: "event.read", module: "event", description: "Voir les événements" },
    { key: "event.create", module: "event", description: "Créer un événement" },
    { key: "event.update", module: "event", description: "Modifier un événement" },
    { key: "event.delete", module: "event", description: "Supprimer un événement" },

    { key: "invoice.read", module: "invoice", description: "Voir les factures" },
    { key: "invoice.create", module: "invoice", description: "Créer une facture" },

];

export async function seedPermissions(prisma) {

    for (const permission of PERMISSIONS) {

        await prisma.permission.upsert({
            where: { key: permission.key },
            update: {},
            create: permission,
        });

    }

    console.log(`   ✓ ${PERMISSIONS.length} permissions`);

}
