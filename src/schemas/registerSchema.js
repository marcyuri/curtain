import { z } from "zod";

const registerSchema = z
    .object({

        firstName: z.string().min(1, "Le prénom est requis."),

        lastName: z.string().min(1, "Le nom est requis."),

        phone: z.string().optional(),

        email: z
            .string()
            .min(1, "L'email est requis.")
            .email("Format d'email invalide."),

        password: z
            .string()
            .min(8, "Le mot de passe doit contenir au moins 8 caractères."),

        confirmPassword: z.string(),

        acceptTerms: z
            .boolean()
            .refine((value) => value === true, "Vous devez accepter les conditions."),

    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas.",
        path: ["confirmPassword"],
    });

export default registerSchema;
