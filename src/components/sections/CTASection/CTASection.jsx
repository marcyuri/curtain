import {
    ArrowRight,
    CalendarDays,
    ShoppingBag,
} from "lucide-react";

import Button from "../../common/Button";

import "./CTASection.css";

function CTASection({

    badge = "LOVE CAN BUILD",

    title = "Prêt à commencer votre parcours avec nous ?",

    description = "Réservez une consultation, découvrez notre boutique ou participez à nos prochains évènements.",

    primaryLabel = "Prendre un rendez-vous",

    secondaryLabel = "Découvrir la boutique",

    onPrimaryClick,

    onSecondaryClick,

}) {

    return (

        <section className="cta-section">

            <div className="cta-section__background" />

            <div className="cta-section__content">

                <span className="cta-section__badge">

                    {badge}

                </span>

                <h2>

                    {title}

                </h2>

                <p>

                    {description}

                </p>

                <div className="cta-section__actions">

                    <Button

                        onClick={onPrimaryClick}

                    >

                        <CalendarDays size={18} />

                        {primaryLabel}

                    </Button>

                    <Button

                        variant="outline"

                        onClick={onSecondaryClick}

                    >

                        <ShoppingBag size={18} />

                        {secondaryLabel}

                    </Button>

                </div>

                <div className="cta-section__footer">

                    <ArrowRight size={18} />

                    Ensemble, construisons un avenir meilleur.

                </div>

            </div>

        </section>

    );

}

export default CTASection;