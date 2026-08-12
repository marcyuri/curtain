// Permissions atomiques (Document 06 Ch.5, Document 13 Ch.7.2).
// Miroir exact de frontend/src/constants/permissions.js — toute
// nouvelle permission doit être ajoutée aux deux endroits.

export const PERMISSIONS = [

    { key: "product.read", module: "product", description: "Voir les produits" },
    { key: "product.create", module: "product", description: "Créer un produit" },
    { key: "product.update", module: "product", description: "Modifier un produit" },
    { key: "product.delete", module: "product", description: "Supprimer un produit" },

    { key: "category.read", module: "category", description: "Voir les catégories" },
    { key: "category.create", module: "category", description: "Créer une catégorie" },
    { key: "category.update", module: "category", description: "Modifier une catégorie" },
    { key: "category.delete", module: "category", description: "Supprimer une catégorie" },

    { key: "brand.read", module: "brand", description: "Voir les marques" },
    { key: "brand.create", module: "brand", description: "Créer une marque" },
    { key: "brand.update", module: "brand", description: "Modifier une marque" },
    { key: "brand.delete", module: "brand", description: "Supprimer une marque" },

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

    { key: "role.read", module: "role", description: "Voir les rôles" },
    { key: "role.create", module: "role", description: "Créer un rôle" },
    { key: "role.update", module: "role", description: "Modifier un rôle" },
    { key: "role.delete", module: "role", description: "Supprimer un rôle" },

    { key: "permission.read", module: "permission", description: "Voir les permissions" },

    { key: "user.read", module: "user", description: "Voir les utilisateurs" },
    { key: "user.create", module: "user", description: "Créer un utilisateur" },
    { key: "user.update", module: "user", description: "Modifier un utilisateur" },
    { key: "user.delete", module: "user", description: "Supprimer un utilisateur" },

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
