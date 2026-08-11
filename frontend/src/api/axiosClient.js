import axios from "axios";

import env from "@config/env";

// Client Axios unique du projet (Document 07, Chapitre 4).
// Contient uniquement : baseURL, timeout, headers, token, refresh token,
// interceptors, gestion des erreurs. Jamais de logique métier ici.

const axiosClient = axios.create({
    baseURL: env.apiBaseUrl,
    timeout: env.apiTimeout,
    headers: {
        "Content-Type": "application/json",
    },
    // Requis pour que le navigateur envoie/stocke le cookie httpOnly du
    // Refresh Token (Document 13 Backend Ch.6.1) — sans ça, aucun cookie
    // n'est échangé, même en local (ports différents = origines
    // différentes pour le navigateur).
    withCredentials: true,
});

let accessToken = null;
let isRefreshing = false;
let pendingRequests = [];

export function setAccessToken(token) {
    accessToken = token;
}

export function clearAccessToken() {
    accessToken = null;
}

axiosClient.interceptors.request.use((config) => {

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;

});

axiosClient.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        const isUnauthorized = error.response?.status === 401;

        if (!isUnauthorized || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                pendingRequests.push({ resolve, reject, originalRequest });
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {

            const { data } = await axiosClient.post("/auth/refresh");

            setAccessToken(data?.data?.accessToken);

            pendingRequests.forEach(({ resolve, originalRequest: pending }) => {
                resolve(axiosClient(pending));
            });

            pendingRequests = [];

            return axiosClient(originalRequest);

        } catch (refreshError) {

            pendingRequests.forEach(({ reject }) => reject(refreshError));
            pendingRequests = [];

            clearAccessToken();

            return Promise.reject(refreshError);

        } finally {

            isRefreshing = false;

        }

    }

);

export default axiosClient;
