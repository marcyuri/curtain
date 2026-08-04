import { useCallback, useEffect, useMemo, useState } from "react";

import authService from "@services/authService";
import { AuthContext } from "./AuthContextInstance";

// AuthProvider ne décide jamais si une action est autorisée (Document 10,
// Ch.6). Il expose uniquement l'utilisateur courant, ses permissions
// (fournies par le Backend) et les actions d'authentification.

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const loadCurrentUser = useCallback(async () => {

        setIsLoading(true);

        const response = await authService.getCurrentUser();

        setUser(response.success ? response.data : null);

        setIsLoading(false);

    }, []);

    useEffect(() => {

        loadCurrentUser();

    }, [loadCurrentUser]);

    const login = useCallback(async (credentials) => {

        const response = await authService.login(credentials);

        if (response.success) {
            setUser(response.data.user);
        }

        return response;

    }, []);

    const logout = useCallback(async () => {

        await authService.logout();

        setUser(null);

    }, []);

    const hasPermission = useCallback(

        (permission) => Boolean(user?.permissions?.includes(permission)),

        [user]

    );

    const value = useMemo(

        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            login,
            logout,
            hasPermission,
            refresh: loadCurrentUser,
        }),

        [user, isLoading, login, logout, hasPermission, loadCurrentUser]

    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;
