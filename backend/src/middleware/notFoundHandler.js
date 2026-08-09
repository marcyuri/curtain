import { fail } from "../shared/utils/apiResponse.js";
import { ErrorCodes } from "../errors/errorCodes.js";

// Branché après toutes les routes déclarées (Document 13, Ch.2) —
// toute requête non résolue arrive ici plutôt que sur le comportement
// par défaut d'Express (texte brut).

export function notFoundHandler(req, res) {

    return fail(res, {
        message: `Route ${req.method} ${req.originalUrl} introuvable.`,
        code: ErrorCodes.NOT_FOUND,
        statusCode: 404,
    });

}
