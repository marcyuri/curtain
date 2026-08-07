import { createContext } from "react";

// AuthContext ne décide jamais si une action est autorisée (Document 10,
// Ch.6). Séparé de AuthProvider pour rester compatible avec le Fast
// Refresh de Vite (un fichier de composant ne doit exporter que des
// composants).

export const AuthContext = createContext(null);
