import {
    HeartHandshake,
    ShoppingBag,
    CalendarDays,
} from "lucide-react";

import ServiceCard from "../ServiceCard";

import "./ServiceGrid.css";

const DEFAULT_SERVICES = [

    {
        id: 1,

        title: "Consultations",

        description:
            "Bénéficiez d'un accompagnement personnalisé pour votre développement personnel, familial ou professionnel.",

        icon: HeartHandshake,

        duration: "Sur rendez-vous",

        badge: "Populaire",
    },

    {
        id: 2,

        title: "Boutique",

        description:
            "Découvrez notre sélection de vêtements et d'articles soigneusement choisis pour vous.",

        icon: ShoppingBag,

        badge: "Nouveautés",
    },

    {
        id: 3,

        title: "Évènements",

        description:
            "Participez à nos conférences, ateliers, formations et rencontres organisés tout au long de l'année.",

        icon: CalendarDays,

        badge: "À venir",
    },

];

function ServiceGrid({

    title = "Nos Services",

    subtitle = "LOVE CAN BUILD",

    description =
    "Nous proposons plusieurs services destinés à accompagner votre croissance personnelle et votre bien-être.",

    services = DEFAULT_SERVICES,

    onSelect,

}) {

    return (

        <section className="service-grid">

            <header className="service-grid__header">

                <span>

                    {subtitle}

                </span>

                <h2>

                    {title}

                </h2>

                <p>

                    {description}

                </p>

            </header>

            <div className="service-grid__content">

                {services.map((service) => (

                    <ServiceCard

                        key={service.id}

                        {...service}

                        onClick={() =>

                            onSelect?.(service)

                        }

                    />

                ))}

            </div>

        </section>

    );

}

export default ServiceGrid;