import { z } from "zod";

import { APP_CONFIG_DEFAULTS } from "../../shared/utils/pagination.js";

// Document 13, Ch.9.1. Le mot de passe est saisi en clair ici (une
// seule fois, à la création) — le hachage est de la responsabilité du
// service, jamais du schéma de validation ni du controller.

export const createUserSchema = z.object({

    email: z.string().min(1, "L'email est requis.").email("Format d'email invalide."),

    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),

    firstName: z.string().min(1, "Le prénom est requis."),

    lastName: z.string().min(1, "Le nom est requis."),

    phone: z.string().optional(),

    roleIds: z.array(z.string().uuid()).default([]),

});

export const updateUserSchema = z.object({

    firstName: z.string().min(1).optional(),

    lastName: z.string().min(1).optional(),

    phone: z.string().optional(),

    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),

    language: z.string().optional(),

    timezone: z.string().optional(),

    roleIds: z.array(z.string().uuid()).optional(),

});

export const userIdParamSchema = z.object({

    id: z.string().uuid("Identifiant d'utilisateur invalide."),

});

export const userQuerySchema = z.object({

    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(APP_CONFIG_DEFAULTS.DEFAULT_PAGE_SIZE),

    search: z.string().optional(),

});
