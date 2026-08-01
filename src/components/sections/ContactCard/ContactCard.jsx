import {
    MapPin,
    Phone,
    Mail,
    Clock3,
    Globe,
    Navigation,
} from "lucide-react";

import Button from "../../common/Button";

import "./ContactCard.css";

function ContactCard({

    company = "LOVE CAN BUILD",

    address,

    phone,

    email,

    website,

    openingHours,

    onDirections,

}) {

    return (

        <article className="contact-card">

            <header className="contact-card__header">

                <h3>

                    {company}

                </h3>

                <p>

                    Nous sommes à votre écoute.

                </p>

            </header>

            <div className="contact-card__infos">

                {address && (

                    <div>

                        <MapPin size={20} />

                        <span>

                            {address}

                        </span>

                    </div>

                )}

                {phone && (

                    <div>

                        <Phone size={20} />

                        <a href={`tel:${phone}`}>

                            {phone}

                        </a>

                    </div>

                )}

                {email && (

                    <div>

                        <Mail size={20} />

                        <a href={`mailto:${email}`}>

                            {email}

                        </a>

                    </div>

                )}

                {website && (

                    <div>

                        <Globe size={20} />

                        <a

                            href={website}

                            target="_blank"

                            rel="noopener noreferrer"

                        >

                            {website}

                        </a>

                    </div>

                )}

                {openingHours && (

                    <div>

                        <Clock3 size={20} />

                        <span>

                            {openingHours}

                        </span>

                    </div>

                )}

            </div>

            <footer className="contact-card__footer">

                <Button

                    onClick={onDirections}

                >

                    <Navigation size={18} />

                    Itinéraire

                </Button>

            </footer>

        </article>

    );

}

export default ContactCard;