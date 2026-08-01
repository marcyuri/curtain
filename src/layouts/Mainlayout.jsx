import { Outlet } from "react-router-dom";

import Header from "@components/layout/Header";
import Navbar from "@components/layout/Navbar";
import Footer from "@components/layout/Footer";

import ScrollToTop from "@components/common/ScrollToTop";
import BackToTopButton from "@components/common/BackToTopButton";
import CookieBanner from "@components/common/CookieBanner";

import "./MainLayout.css";

function MainLayout() {
    return (
        <div className="layout">

            <Header />

            <Navbar />

            <main className="layout__content">

                <Outlet />

            </main>

            <Footer />

            <BackToTopButton />

            <CookieBanner />

            <ScrollToTop />

        </div>
    );
}

export default MainLayout;