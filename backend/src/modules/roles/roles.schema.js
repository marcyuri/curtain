import { z } from "zod";

// Document 13, Ch.9.1. La clé d'un rôle suit la même convention que
// les constantes ROLES.* déjà utilisées côté Frontend et dans le seed
// (Document 13 Ch.7.1) : MAJUSCULES_SNAKE_CASE.

export const createRoleSchema = z.object({

    key: z
        .string()
        .min(1, "La clé du rôle est requise.")
        .regex(/^[A-Z][A-Z0-9_]*$/, "La clé doit être en MAJUSCULES_SNAKE_CASE."),

    label: z.string().min(1, "Le libellé est requis."),

    description: z.string().optional(),

    permissionIds: z.array(z.string().uuid()).default([]),

});

export const updateRoleSchema = z.object({

    label: z.string().min(1).optional(),

    description: z.string().optional(),

    permissionIds: z.array(z.string().uuid()).optional(),

});

export const roleIdParamSchema = z.object({

    id: z.string().uuid("Identifiant de rôle invalide."),

});
