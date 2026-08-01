// Routes
import { Routes, Route } from "react-router-dom";

import MainLayout from "@layouts/MainLayout";

// Pages
import HomePage from "@pages/HomePage";
import AboutPage from "@pages/AboutPage";
import ProductsPage from "@pages/ProductsPage";
import ServicesPage from "@pages/ServicesPage";
import ConsultationsPage from "@pages/ConsultationsPage";
import EventsPage from "@pages/EventsPage";
import BlogPage from "@pages/BlogPage";
import GalleryPage from "@pages/GalleryPage";
import TestimonialsPage from "@pages/TestimonialsPage";
import ContactPage from "@pages/ContactPage";
import AppointmentPage from "@pages/AppointmentPage";
import FaqPage from "@pages/FaqPage";
import PrivacyPolicyPage from "@pages/PrivacyPolicyPage";
import TermsPage from "@pages/TermsPage";
import NotFoundPage from "@pages/NotFoundPage";

function AppRouter() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />

                <Route
                    path="/products"
                    element={<ProductsPage />}
                />

                <Route
                    path="/services"
                    element={<ServicesPage />}
                />

                <Route
                    path="/consultations"
                    element={<ConsultationsPage />}
                />

                <Route
                    path="/appointment"
                    element={<AppointmentPage />}
                />

                <Route
                    path="/events"
                    element={<EventsPage />}
                />

                <Route
                    path="/blog"
                    element={<BlogPage />}
                />

                <Route
                    path="/gallery"
                    element={<GalleryPage />}
                />

                <Route
                    path="/testimonials"
                    element={<TestimonialsPage />}
                />

                <Route
                    path="/contact"
                    element={<ContactPage />}
                />

                <Route
                    path="/faq"
                    element={<FaqPage />}
                />

                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicyPage />}
                />

                <Route
                    path="/terms"
                    element={<TermsPage />}
                />

            </Route>

            <Route
                path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    );
}

export default AppRouter;