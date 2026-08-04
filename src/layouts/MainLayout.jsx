import { Outlet } from "react-router-dom";

import Navbar from "@layouts/Navbar";
import Footer from "@components/common/Footer";
import CookieConsent from "@components/common/CookieConsent";

import "./MainLayout.css";

function MainLayout() {
    return (
        <div className="layout">

            <Navbar />

            <main className="layout__content">

                <Outlet />

            </main>

            <Footer />

            <CookieConsent />

        </div>
    );
}

export default MainLayout;
