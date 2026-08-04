// Normalise les erreurs Axios vers le format défini par le Document 07,
// Chapitre 13, pour que les composants n'aient jamais à interpréter la
// forme brute d'une erreur réseau.

export function normalizeApiError(error) {

    if (error.response) {

        return {
            success: false,
            message: error.response.data?.message ?? "Une erreur est survenue.",
            errors: error.response.data?.errors ?? null,
            status: error.response.status,
        };

    }

    if (error.request) {

        return {
            success: false,
            message: "Impossible de contacter le serveur. Vérifiez votre connexion.",
            errors: null,
            status: null,
        };

    }

    return {
        success: false,
        message: "Une erreur inattendue est survenue.",
        errors: null,
        status: null,
    };

}
