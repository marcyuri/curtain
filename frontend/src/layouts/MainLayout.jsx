import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "@layouts/Navbar";
import Footer from "@components/common/Footer";
import ConsentBanner from "@components/common/ConsentBanner";
import ScrollReveal from "@components/common/ScrollReveal";

import "./MainLayout.css";

function MainLayout() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        const pageKey = `love-can-build-scroll:${pathname}${search}`;

        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const savePosition = () => {
            sessionStorage.setItem(pageKey, String(window.scrollY));
        };

        const savedPosition = Number(sessionStorage.getItem(pageKey) || 0);
        const restorePosition = () => {
            window.scrollTo({
                top: savedPosition,
                left: 0,
                behavior: "instant",
            });
        };

        window.addEventListener("scroll", savePosition, { passive: true });
        requestAnimationFrame(() => requestAnimationFrame(restorePosition));

        return () => {
            savePosition();
            window.removeEventListener("scroll", savePosition);
        };
    }, [pathname, search]);

    return (
        <div className="layout">

            <Navbar />

            <main className="layout__content">

                <Outlet />

                <ScrollReveal />

            </main>

            <Footer />

            <ConsentBanner />

        </div>
    );
}

export default MainLayout;
