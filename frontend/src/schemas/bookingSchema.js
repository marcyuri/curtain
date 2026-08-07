import { z } from "zod";

const bookingSchema = z.object({

    specialist: z.string().min(1, "Veuillez sélectionner un spécialiste."),

    date: z.string().min(1, "La date est requise."),

    time: z.string().min(1, "L'heure est requise."),

    firstName: z.string().min(1, "Le prénom est requis."),

    lastName: z.string().min(1, "Le nom est requis."),

    phone: z.string().min(1, "Le téléphone est requis."),

    email: z
        .string()
        .min(1, "L'email est requis.")
        .email("Format d'email invalide."),

    note: z.string().optional(),

});

export default bookingSchema;
