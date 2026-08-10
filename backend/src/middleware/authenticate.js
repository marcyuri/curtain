import { verifyAccessToken } from "../shared/utils/jwt.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { ErrorCodes } from "../errors/errorCodes.js";

// Document 13, Ch.7.3. Vérifie l'Access Token, attache req.user
// (userId, email, roles, permissions — déjà présents dans le payload
// du token, Document 13 Ch.7.4, pour éviter une requête base de
// données à chaque appel protégé).

export function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Authentification requise.", ErrorCodes.UNAUTHORIZED));
    }

    const token = authHeader.slice("Bearer ".length);

    try {

        const payload = verifyAccessToken(token);

        req.user = {
            id: payload.sub,
            email: payload.email,
            roles: payload.roles,
            permissions: payload.permissions,
        };

        return next();

    } catch {

        return next(new UnauthorizedError("Session invalide ou expirée.", ErrorCodes.TOKEN_EXPIRED));

    }

}
