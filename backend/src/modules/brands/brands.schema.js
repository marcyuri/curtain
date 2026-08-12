import { z } from "zod";

import { APP_CONFIG_DEFAULTS } from "../../shared/utils/pagination.js";

export const createBrandSchema = z.object({

    name: z.string().min(1, "Le nom est requis."),

    logo: z.string().url("URL de logo invalide.").optional(),

});

export const updateBrandSchema = z.object({

    name: z.string().min(1).optional(),

    logo: z.string().url("URL de logo invalide.").optional(),

});

export const brandIdParamSchema = z.object({

    id: z.string().uuid("Identifiant de marque invalide."),

});

export const brandQuerySchema = z.object({

    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(APP_CONFIG_DEFAULTS.DEFAULT_PAGE_SIZE),

    search: z.string().optional(),

});
