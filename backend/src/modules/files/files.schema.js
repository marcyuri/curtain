import { z } from "zod";

import { UPLOAD_PURPOSES } from "./files.constants.js";

export const uploadFileSchema = z.object({

    purpose: z.enum(Object.values(UPLOAD_PURPOSES), {
        errorMap: () => ({ message: "Contexte d'upload invalide." }),
    }),

});

export const fileIdParamSchema = z.object({

    id: z.string().uuid("Identifiant de fichier invalide."),

});
