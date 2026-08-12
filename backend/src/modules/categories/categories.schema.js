import { z } from "zod";

import { APP_CONFIG_DEFAULTS } from "../../shared/utils/pagination.js";

export const createCategorySchema = z.object({

    name: z.string().min(1, "Le nom est requis."),

    description: z.string().optional(),

});

export const updateCategorySchema = z.object({

    name: z.string().min(1).optional(),

    description: z.string().optional(),

});

export const categoryIdParamSchema = z.object({

    id: z.string().uuid("Identifiant de catégorie invalide."),

});

export const categoryQuerySchema = z.object({

    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(APP_CONFIG_DEFAULTS.DEFAULT_PAGE_SIZE),

    search: z.string().optional(),

});
