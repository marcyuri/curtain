import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { APP_CONFIG } from "@config/app";

import fr from "./fr/translation.json";
import en from "./en/translation.json";

// Configuration i18next (Document 06, Chapitre 19 — toutes les chaînes
// affichées à l'utilisateur sont destinées à être traduites).

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({

        resources: {
            fr: { translation: fr },
            en: { translation: en },
        },

        fallbackLng: APP_CONFIG.DEFAULT_LANGUAGE,
        supportedLngs: APP_CONFIG.SUPPORTED_LANGUAGES,

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: ["localStorage", "navigator"],
            lookupLocalStorage: "language",
            caches: ["localStorage"],
        },

    });

export default i18n;
