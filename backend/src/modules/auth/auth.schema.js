import { z } from "zod";

// Document 13, Ch.9.1. Miroir des schémas déjà validés côté Frontend
// (frontend/src/schemas/loginSchema.js, registerSchema.js) — la
// validation Backend reste la source de vérité (Document 07 Ch.14),
// le Frontend ne fait que du confort utilisateur.

export const loginSchema = z.object({

    email: z.string().min(1, "L'email est requis.").email("Format d'email invalide."),

    password: z.string().min(1, "Le mot de passe est requis."),

});

export const registerSchema = z.object({

    email: z.string().min(1, "L'email est requis.").email("Format d'email invalide."),

    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),

    firstName: z.string().min(1, "Le prénom est requis."),

    lastName: z.string().min(1, "Le nom est requis."),

    phone: z.string().optional(),

});

export const forgotPasswordSchema = z.object({

    email: z.string().min(1, "L'email est requis.").email("Format d'email invalide."),

});

export const resetPasswordSchema = z.object({

    token: z.string().min(1, "Le token est requis."),

    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),

});

export const verifyEmailSchema = z.object({

    token: z.string().min(1, "Le token est requis."),

});
