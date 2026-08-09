// Classe d'erreur métier de base (Document 13, Ch.10.1).
// Chaque service lève une erreur typée dérivée de celle-ci, jamais un
// Error générique ni un objet brut.

export class AppError extends Error {

    constructor(message, { statusCode = 500, code = "INTERNAL_ERROR", details = null } = {}) {

        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);

    }

}
