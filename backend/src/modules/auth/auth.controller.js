import authService from "./auth.service.js";
import { success } from "../../shared/utils/apiResponse.js";
import { REFRESH_TOKEN_COOKIE_NAME, getRefreshTokenCookieOptions } from "./auth.cookie.js";

function getContext(req) {

    return {
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
    };

}

async function login(req, res) {

    const { accessToken, rawRefreshToken, user } = await authService.login(req.body, getContext(req));

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, rawRefreshToken, getRefreshTokenCookieOptions());

    return success(res, {
        message: "Connexion réussie.",
        data: { accessToken, user },
    });

}

async function register(req, res) {

    const user = await authService.register(req.body);

    return success(res, {
        message: "Compte créé avec succès.",
        data: { user },
        statusCode: 201,
    });

}

async function refresh(req, res) {

    const { accessToken, rawRefreshToken } = await authService.refresh(
        req.cookies?.[REFRESH_TOKEN_COOKIE_NAME],
        getContext(req)
    );

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, rawRefreshToken, getRefreshTokenCookieOptions());

    return success(res, {
        message: "Session rafraîchie.",
        data: { accessToken },
    });

}

async function logout(req, res) {

    await authService.logout(req.cookies?.[REFRESH_TOKEN_COOKIE_NAME]);

    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, getRefreshTokenCookieOptions());

    return success(res, {
        message: "Déconnexion réussie.",
    });

}

async function me(req, res) {

    const user = await authService.getCurrentUser(req.user.id);

    return success(res, {
        message: "Utilisateur récupéré avec succès.",
        data: user,
    });

}

async function forgotPassword(req, res) {

    await authService.forgotPassword(req.body);

    return success(res, {
        message: "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
    });

}

async function resetPassword(req, res) {

    await authService.resetPassword(req.body);

    return success(res, {
        message: "Mot de passe réinitialisé avec succès.",
    });

}

async function verifyEmail(req, res) {

    await authService.verifyEmail(req.body);

    return success(res, {
        message: "Email vérifié avec succès.",
    });

}

const authController = {
    login,
    register,
    refresh,
    logout,
    me,
    forgotPassword,
    resetPassword,
    verifyEmail,
};

export default authController;
