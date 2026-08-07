import Hero from "../../components/sections/Hero";
import AboutSection from "../../components/sections/AboutSection";
import StatisticsSection from "../../components/sections/StatisticsSection";
import ServiceGrid from "../../components/sections/ServiceGrid";
import ConsultationList from "../../components/sections/ConsultationList";
import ProductGrid from "../../components/sections/ProductGrid";
import EventTimeline from "../../components/sections/EventTimeline";
import TestimonialsCarousel from "../../components/sections/TestimonialsCarousel";
import GallerySection from "../../components/sections/GallerySection";
import FAQAccordion from "../../components/sections/FAQAccordion";
import Newsletter from "../../components/sections/Newsletter";
import CTASection from "../../components/sections/CTASection";

import {

    consultations,

    products,

    testimonials,

    gallery,

    faq,

    events,

    statistics,

} from "./data";

import "./Home.css";

function Home() {

    return (

        <main className="home">

            <Hero />

            <AboutSection />

            <StatisticsSection

                statistics={statistics}

            />

            <ServiceGrid />

            <ConsultationList

                consultations={consultations}

            />

            <ProductGrid

                products={products}

            />

            <EventTimeline

                events={events}

            />

            <TestimonialsCarousel

                testimonials={testimonials}

            />

            <GallerySection

                images={gallery}

            />

            <FAQAccordion

                items={faq}

            />

            <Newsletter />

            <CTASection />

        </main>

    );

}

export default Home;