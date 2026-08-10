// Document 13, Ch.5.4. DEFAULT_PAGE_SIZE reprend exactement la valeur
// déjà fixée côté Frontend (frontend/src/config/app.js,
// APP_CONFIG.DEFAULT_PAGE_SIZE) — les deux doivent rester synchronisés.

export const APP_CONFIG_DEFAULTS = {
    DEFAULT_PAGE_SIZE: 20,
};

export function buildPaginationMeta({ page, limit, total }) {

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
    };

}
