import { z } from "zod";

const loginSchema = z.object({

    email: z
        .string()
        .min(1, "L'email est requis.")
        .email("Format d'email invalide."),

    password: z
        .string()
        .min(1, "Le mot de passe est requis."),

    remember: z.boolean().optional(),

});

export default loginSchema;
