import axiosClient, { setAccessToken, clearAccessToken } from "@api/axiosClient";
import { normalizeApiError } from "@api/normalizeApiError";

// Un service = une ressource (Document 07, Chapitre 3).
// Ce service ne contient aucune règle métier : il transmet la requête
// et retourne une réponse normalisée. Les décisions (rediriger,
// afficher un message...) restent du ressort des hooks/pages appelants.

async function login({ email, password }) {

    try {

        const { data } = await axiosClient.post("/auth/login", { email, password });

        setAccessToken(data?.data?.accessToken);

        return { success: true, data: data.data };

    } catch (error) {

        return normalizeApiError(error);

    }

}

async function register(payload) {

    try {

        const { data } = await axiosClient.post("/auth/register", payload);

        return { success: true, data: data.data };

    } catch (error) {

        return normalizeApiError(error);

    }

}

async function logout() {

    try {

        await axiosClient.post("/auth/logout");

        return { success: true };

    } catch (error) {

        return normalizeApiError(error);

    } finally {

        clearAccessToken();

    }

}

async function getCurrentUser() {

    try {

        const { data } = await axiosClient.get("/auth/me");

        return { success: true, data: data.data };

    } catch (error) {

        return normalizeApiError(error);

    }

}

async function forgotPassword({ email }) {

    try {

        await axiosClient.post("/auth/forgot-password", { email });

        return { success: true };

    } catch (error) {

        return normalizeApiError(error);

    }

}

async function resetPassword({ token, password }) {

    try {

        await axiosClient.post("/auth/reset-password", { token, password });

        return { success: true };

    } catch (error) {

        return normalizeApiError(error);

    }

}

async function verifyEmail({ token }) {

    try {

        await axiosClient.post("/auth/verify-email", { token });

        return { success: true };

    } catch (error) {

        return normalizeApiError(error);

    }

}

const authService = {
    login,
    register,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
};

export default authService;
