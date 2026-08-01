import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone
} from "lucide-react";

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer({

    logo,

    description,

    navigation = [],

    services = [],

    contact = {},

    socialLinks = {},

    legalLinks = [],

    copyright,

    className = ""

}) {

    return (

        <footer className={`footer ${className}`}>

            <div className="footer__container">

                <div className="footer__brand">

                    {logo}

                    <p>

                        {description}

                    </p>

                </div>

                <div className="footer__column">

                    <h3>

                        Navigation

                    </h3>

                    {navigation.map((item) => (

                        <Link

                            key={item.label}

                            to={item.path}

                            className="footer__link"

                        >

                            {item.label}

                        </Link>

                    ))}

                </div>

                <div className="footer__column">

                    <h3>

                        Services

                    </h3>

                    {services.map((item) => (

                        <Link

                            key={item.label}

                            to={item.path}

                            className="footer__link"

                        >

                            {item.label}

                        </Link>

                    ))}

                </div>

                <div className="footer__column">

                    <h3>

                        Contact

                    </h3>

                    {contact.address && (

                        <div className="footer__contact">

                            <MapPin size={18} />

                            <span>{contact.address}</span>

                        </div>

                    )}

                    {contact.phone && (

                        <div className="footer__contact">

                            <Phone size={18} />

                            <span>{contact.phone}</span>

                        </div>

                    )}

                    {contact.email && (

                        <div className="footer__contact">

                            <Mail size={18} />

                            <span>{contact.email}</span>

                        </div>

                    )}

                    <div className="footer__social">

                        {socialLinks.facebook && (

                            <a

                                href={socialLinks.facebook}

                                target="_blank"

                                rel="noreferrer"

                            >

                                <Facebook size={20} />

                            </a>

                        )}

                        {socialLinks.instagram && (

                            <a

                                href={socialLinks.instagram}

                                target="_blank"

                                rel="noreferrer"

                            >

                                <Instagram size={20} />

                            </a>

                        )}

                        {socialLinks.linkedin && (

                            <a

                                href={socialLinks.linkedin}

                                target="_blank"

                                rel="noreferrer"

                            >

                                <Linkedin size={20} />

                            </a>

                        )}

                    </div>

                </div>

            </div>

            <div className="footer__bottom">

                <span>

                    {copyright}

                </span>

                <div className="footer__legal">

                    {legalLinks.map((item) => (

                        <Link

                            key={item.label}

                            to={item.path}

                            className="footer__legal-link"

                        >

                            {item.label}

                        </Link>

                    ))}

                </div>

            </div>

        </footer>

    );

}

export default Footer;