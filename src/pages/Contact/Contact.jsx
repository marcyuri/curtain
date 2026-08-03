import ContactCard from "../../components/sections/ContactCard";
import ContactForm from "../../components/sections/ContactForm";
import FAQAccordion from "../../components/sections/FAQAccordion";
import CTASection from "../../components/sections/CTASection";

import {

    company,

    faq,

} from "./data";

import "./Contact.css";

function Contact() {

    return (

        <main className="contact-page">

            <section className="contact-page__hero">

                <span>

                    LOVE CAN BUILD

                </span>

                <h1>

                    Contactez-nous

                </h1>

                <p>

                    Notre équipe est disponible pour répondre à toutes vos questions.

                </p>

            </section>

            <section className="contact-page__content">

                <div className="contact-page__left">

                    <ContactCard

                        company={company.name}

                        address={company.address}

                        phone={company.phone}

                        email={company.email}

                        website={company.website}

                        openingHours={company.openingHours}

                    />

                </div>

                <div className="contact-page__right">

                    <ContactForm />

                </div>

            </section>

            <section className="contact-page__map">

                <iframe

                    title="LOVE CAN BUILD"

                    src={company.map}

                    loading="lazy"

                    allowFullScreen

                    referrerPolicy="no-referrer-when-downgrade"

                />

            </section>

            <FAQAccordion

                title="Questions fréquentes"

                items={faq}

            />

            <CTASection

                title="Nous sommes à votre écoute"

                description="N'hésitez pas à nous contacter pour toute demande d'information ou d'accompagnement."

                primaryLabel="Nous appeler"

                secondaryLabel="Prendre rendez-vous"

            />

        </main>

    );

}

export default Contact;