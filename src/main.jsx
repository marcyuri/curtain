import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AuthProvider from "@contexts/AuthContext";

import App from "./App";

import "./styles/base/reset.css";
import "./styles/base/fonts.css";
import "./styles/base/variables.css";
import "./styles/base/global.css";

import "./locales/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <HelmetProvider>

            <BrowserRouter>

                <AuthProvider>

                    <App />

                </AuthProvider>

            </BrowserRouter>

        </HelmetProvider>

    </React.StrictMode>
);