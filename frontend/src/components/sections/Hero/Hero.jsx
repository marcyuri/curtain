import {
    ArrowRight,
    CalendarDays,
    ShoppingBag,
    HeartHandshake,
} from "lucide-react";

import Button from "../../ui/Button";

import "./Hero.css";

function Hero({

    logo = "/images/logo.png",

    title = "Construisons ensemble un avenir meilleur.",

    subtitle = "LOVE CAN BUILD",

    description = "LOVE CAN BUILD vous accompagne grâce à des consultations, des événements inspirants et une boutique proposant des produits soigneusement sélectionnés pour votre bien-être.",

    primaryLabel = "Prendre un rendez-vous",

    secondaryLabel = "Découvrir la boutique",

    onAppointment,

    onShop,

}) {

    return (

        <section className="hero">

            <div className="hero__content">

                <div className="hero__badge">

                    ❤️ LOVE CAN BUILD

                </div>

                <img

                    src={logo}

                    alt="LOVE CAN BUILD"

                    className="hero__logo"

                />

                <span className="hero__subtitle">

                    {subtitle}

                </span>

                <h1>

                    {title}

                </h1>

                <p>

                    {description}

                </p>

                <div className="hero__actions">

                    <Button

                        onClick={onAppointment}

                    >

                        <CalendarDays size={18} />

                        {primaryLabel}

                    </Button>

                    <Button

                        variant="outline"

                        onClick={onShop}

                    >

                        <ShoppingBag size={18} />

                        {secondaryLabel}

                    </Button>

                </div>

                <div className="hero__stats">

                    <article>

                        <HeartHandshake size={26} />

                        <strong>

                            Accompagnement

                        </strong>

                        <span>

                            Consultations personnalisées

                        </span>

                    </article>

                    <article>

                        <ShoppingBag size={26} />

                        <strong>

                            Boutique

                        </strong>

                        <span>

                            Produits de qualité

                        </span>

                    </article>

                    <article>

                        <ArrowRight size={26} />

                        <strong>

                            Évènements

                        </strong>

                        <span>

                            Rencontres & conférences

                        </span>

                    </article>

                </div>

            </div>

        </section>

    );

}

export default Hero;