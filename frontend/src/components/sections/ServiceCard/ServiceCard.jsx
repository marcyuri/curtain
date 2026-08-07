import {
    ArrowRight,
    Clock3,
} from "lucide-react";

import Button from "../../ui/Button";

import "./ServiceCard.css";

function ServiceCard({

    title,

    description,

    image,

    icon: Icon,

    duration,

    badge,

    buttonLabel = "Découvrir",

    onClick,

}) {

    return (

        <article className="service-card">

            {badge && (

                <span className="service-card__badge">

                    {badge}

                </span>

            )}

            <div className="service-card__image">

                {image ? (

                    <img
                        src={image}
                        alt={title}
                    />

                ) : (

                    <div className="service-card__placeholder">

                        {Icon && <Icon size={48} />}

                    </div>

                )}

            </div>

            <div className="service-card__body">

                <h3>

                    {title}

                </h3>

                <p>

                    {description}

                </p>

                {duration && (

                    <div className="service-card__duration">

                        <Clock3 size={16} />

                        <span>

                            {duration}

                        </span>

                    </div>

                )}

            </div>

            <footer className="service-card__footer">

                <Button

                    onClick={onClick}

                >

                    {buttonLabel}

                    <ArrowRight size={18} />

                </Button>

            </footer>

        </article>

    );

}

export default ServiceCard;