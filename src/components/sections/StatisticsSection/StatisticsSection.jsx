import {
    Users,
    ShoppingBag,
    CalendarDays,
    HeartHandshake,
} from "lucide-react";

import "./StatisticsSection.css";

const DEFAULT_STATISTICS = [

    {
        id: 1,

        icon: Users,

        value: "2 500+",

        label: "Clients accompagnés",

    },

    {
        id: 2,

        icon: HeartHandshake,

        value: "800+",

        label: "Consultations",

    },

    {
        id: 3,

        icon: ShoppingBag,

        value: "1 200+",

        label: "Produits vendus",

    },

    {
        id: 4,

        icon: CalendarDays,

        value: "150+",

        label: "Évènements organisés",

    },

];

function StatisticsSection({

    title = "LOVE CAN BUILD en chiffres",

    subtitle = "Nos résultats",

    description = "Chaque chiffre représente une personne accompagnée, un projet réalisé ou un événement organisé avec passion.",

    statistics = DEFAULT_STATISTICS,

}) {

    return (

        <section className="statistics-section">

            <header className="statistics-section__header">

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

            <div className="statistics-section__grid">

                {statistics.map((item) => {

                    const Icon = item.icon;

                    return (

                        <article

                            key={item.id}

                            className="statistics-card"

                        >

                            <div className="statistics-card__icon">

                                <Icon size={34} />

                            </div>

                            <strong>

                                {item.value}

                            </strong>

                            <span>

                                {item.label}

                            </span>

                        </article>

                    );

                })}

            </div>

        </section>

    );

}

export default StatisticsSection;