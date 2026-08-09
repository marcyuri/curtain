// Format de réponse unique, produit par une fonction utilitaire plutôt
// que construit à la main dans chaque controller (Document 13, Ch.5.3).

export function success(res, { message = "OK", data = null, meta = null, statusCode = 200 } = {}) {

    return res.status(statusCode).json({
        success: true,
        message,
        data,
        meta,
        errors: null,
    });

}

export function fail(res, { message = "An error occurred.", errors = null, code = null, statusCode = 500 } = {}) {

    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
        meta: null,
        errors,
        code,
    });

}
