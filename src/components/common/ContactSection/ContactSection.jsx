import "./ContactSection.css";

import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Navigation,
    Facebook,
    Instagram,
    Linkedin
} from "lucide-react";

import Button from "../../form/Button";
import ContactForm from "../ContactForm";

const SOCIAL_ICONS = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
};

const ContactSection = ({
    title = "Contactez-nous",
    subtitle,

    offices = [],

    showMap = true,
    map,

    showForm = true,

    socialLinks = [],

    primaryAction,
}) => {

    return (

        <section className="contact-section">

            <header className="contact-section__header">

                <h2>{title}</h2>

                {subtitle && (
                    <p>{subtitle}</p>
                )}

            </header>

            <div className="contact-section__layout">

                <aside className="contact-section__sidebar">

                    {offices.map((office) => (
                        <article
                            key={office.id}
                            className="contact-section__office"
                        >

                            <h3>{office.name}</h3>

                            <ul>

                                <li>
                                    <MapPin size={18} />
                                    <span>{office.address}</span>
                                </li>

                                <li>
                                    <Phone size={18} />
                                    <a href={`tel:${office.phone}`}>
                                        {office.phone}
                                    </a>
                                </li>

                                <li>
                                    <Mail size={18} />
                                    <a href={`mailto:${office.email}`}>
                                        {office.email}
                                    </a>
                                </li>

                                <li>
                                    <Clock size={18} />
                                    <span>{office.schedule}</span>
                                </li>

                            </ul>

                            <div className="contact-section__actions">

                                <Button
                                    variant="outline"
                                    onClick={office.onDirection}
                                >
                                    <Navigation size={18} />
                                    Itinéraire
                                </Button>

                                <Button
                                    onClick={office.onCall}
                                >
                                    Appeler
                                </Button>

                            </div>

                        </article>
                    ))}

                    {socialLinks.length > 0 && (

                        <div className="contact-section__socials">

                            {socialLinks.map((social) => {

                                const Icon =
                                    SOCIAL_ICONS[social.type];

                                return (

                                    <a
                                        key={social.type}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {Icon && <Icon size={20} />}
                                    </a>

                                );

                            })}

                        </div>

                    )}

                </aside>

                <div className="contact-section__content">

                    {showMap && map && (

                        <iframe
                            title="Carte"
                            src={map}
                            loading="lazy"
                            className="contact-section__map"
                        />

                    )}

                    {showForm && (
                        <ContactForm />
                    )}

                    {primaryAction && (

                        <div className="contact-section__footer">

                            <Button
                                onClick={primaryAction.onClick}
                            >
                                {primaryAction.label}
                            </Button>

                        </div>

                    )}

                </div>

            </div>

        </section>

    );

};

export default ContactSection;