// Catalogue centralisé des codes d'erreur (Document 13, Ch.10.2).
// Un code machine-readable, stable, distinct du message humain.

export const ErrorCodes = {

    VALIDATION_FAILED: "VALIDATION_FAILED",
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    CONFLICT: "CONFLICT",
    INTERNAL_ERROR: "INTERNAL_ERROR",

    // Réservés pour la Phase 1 (module auth), déjà listés ici pour
    // que le catalogue soit visible dès maintenant :
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    SESSION_EXPIRED: "SESSION_EXPIRED",
    PERMISSION_DENIED: "PERMISSION_DENIED",
    EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",

};
