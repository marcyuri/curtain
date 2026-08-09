import { AppError } from "../errors/AppError.js";
import { ErrorCodes } from "../errors/errorCodes.js";
import { fail } from "../shared/utils/apiResponse.js";
import env from "../config/env.js";

// Dernier middleware de la chaîne (Document 13, Ch.10.3).
//
// - Une AppError connue est formatée telle quelle, avec son statusCode.
// - Toute erreur non prévue est journalisée en détail côté serveur,
//   mais renvoyée au client sous une forme générique — jamais de stack
//   trace, de requête SQL ou de chemin de fichier exposés
//   (Document 10 Ch.11 : les erreurs présentées à l'utilisateur restent
//   compréhensibles et non techniques).

// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {

    if (error instanceof AppError) {

        req.log?.warn({ err: error }, error.message);

        return fail(res, {
            message: error.message,
            errors: error.details,
            code: error.code,
            statusCode: error.statusCode,
        });

    }

    req.log?.error({ err: error }, "Erreur non gérée");

    return fail(res, {
        message: "Une erreur interne est survenue.",
        errors: env.NODE_ENV === "development" ? [{ message: error.message }] : null,
        statusCode: 500,
        code: ErrorCodes.INTERNAL_ERROR,
    });

}
