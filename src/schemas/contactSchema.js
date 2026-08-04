import { z } from "zod";

const contactSchema = z.object({

    firstName: z.string().min(1, "Le prénom est requis."),

    lastName: z.string().min(1, "Le nom est requis."),

    email: z
        .string()
        .min(1, "L'email est requis.")
        .email("Format d'email invalide."),

    phone: z.string().optional(),

    subject: z.string().min(1, "Le sujet est requis."),

    message: z.string().min(1, "Le message est requis."),

});

export default contactSchema;
