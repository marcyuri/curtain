import {
    HeartHandshake,
    ShoppingBag,
    CalendarDays,
    Target,
    Eye,
    Gem,
} from "lucide-react";

import Button from "../../ui/Button";

import "./AboutSection.css";

function AboutSection({

    logo = "/images/logo.png",

    title = "À propos de LOVE CAN BUILD",

    description = "LOVE CAN BUILD est une organisation engagée dans le développement personnel, le bien-être et l'accompagnement des personnes à travers des consultations, des événements et une boutique proposant des produits de qualité.",

    onLearnMore,

}) {

    const services = [

        {
            icon: HeartHandshake,
            title: "Consultations",
            text: "Un accompagnement personnalisé pour favoriser votre bien-être et votre développement.",
        },

        {
            icon: ShoppingBag,
            title: "Boutique",
            text: "Découvrez une sélection de vêtements et de produits pensés pour vous.",
        },

        {
            icon: CalendarDays,
            title: "Évènements",
            text: "Participez à nos conférences, ateliers et rencontres inspirantes.",
        },

    ];

    const values = [

        {
            icon: Target,
            title: "Notre mission",
            text: "Accompagner chaque personne avec professionnalisme, respect et bienveillance.",
        },

        {
            icon: Eye,
            title: "Notre vision",
            text: "Construire une communauté forte où chacun peut grandir et s'épanouir.",
        },

        {
            icon: Gem,
            title: "Nos valeurs",
            text: "Amour • Respect • Excellence • Intégrité • Espoir",
        },

    ];

    return (

        <section className="about-section">

            <div className="about-section__header">

                <img

                    src={logo}

                    alt="LOVE CAN BUILD"

                    className="about-section__logo"

                />

                <div>

                    <span className="about-section__subtitle">

                        Qui sommes-nous ?

                    </span>

                    <h2>

                        {title}

                    </h2>

                    <p>

                        {description}

                    </p>

                    <Button

                        onClick={onLearnMore}

                    >

                        En savoir plus

                    </Button>

                </div>

            </div>

            <div className="about-section__services">

                {services.map((service) => {

                    const Icon = service.icon;

                    return (

                        <article

                            key={service.title}

                            className="about-card"

                        >

                            <div className="about-card__icon">

                                <Icon size={30} />

                            </div>

                            <h3>

                                {service.title}

                            </h3>

                            <p>

                                {service.text}

                            </p>

                        </article>

                    );

                })}

            </div>

            <div className="about-section__values">

                {values.map((item) => {

                    const Icon = item.icon;

                    return (

                        <article

                            key={item.title}

                            className="value-card"

                        >

                            <Icon size={24} />

                            <div>

                                <h4>

                                    {item.title}

                                </h4>

                                <p>

                                    {item.text}

                                </p>

                            </div>

                        </article>

                    );

                })}

            </div>

        </section>

    );

}

export default AboutSection;