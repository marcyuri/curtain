import env from "../../config/env.js";

// Document 13, Ch.6.1 — cookie httpOnly + secure + sameSite, persistant
// (Max-Age = plafond absolu de la session, Ch.6.7), jamais accessible
// en JavaScript côté client.
//
// sameSite dépend de l'environnement : en développement, Frontend et
// Backend tournent sur le même site (localhost, ports différents —
// "site" ignore le port), donc 'strict' fonctionne et protège au
// maximum. En production, Frontend (Vercel) et Backend (hébergeur
// séparé) sont sur des domaines différents : une requête cross-site
// avec 'strict' ou 'lax' ne transporterait jamais le cookie. 'none'
// est alors nécessaire (et exige 'secure: true', déjà activé en
// production).

export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export function getRefreshTokenCookieOptions() {

    const isProduction = env.NODE_ENV === "production";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        maxAge: env.JWT_REFRESH_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
        path: "/",
    };

}
