import env from "../../config/env.js";

// Document 13, Ch.6.1 — cookie httpOnly + secure + sameSite=strict,
// persistant (Max-Age = plafond absolu de la session, Ch.6.7), jamais
// accessible en JavaScript côté client.

export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export function getRefreshTokenCookieOptions() {

    return {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: env.JWT_REFRESH_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
        path: "/",
    };

}
