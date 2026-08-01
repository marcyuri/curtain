import {
    Calendar,
    Clock3,
    Globe,
    MapPin,
    Star
} from "lucide-react";

import Avatar from "../../ui/Avatar";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

import "./ConsultationCard.css";

function ConsultationCard({

    consultation,

    onBook,

    className = ""

}) {

    const {

        photo,

        name,

        specialty,

        description,

        duration,

        mode,

        languages = [],

        rating = 0,

        availableSlots = 0,

        nextAvailable,

        badge

    } = consultation;

    return (

        <article className={`consultation-card ${className}`}>

            <div className="consultation-card__header">

                <Avatar
                    src={photo}
                    alt={name}
                    size="xl"
                />

                <div>

                    {badge && (

                        <Badge>

                            {badge}

                        </Badge>

                    )}

                    <h3>

                        {name}

                    </h3>

                    <span className="consultation-card__specialty">

                        {specialty}

                    </span>

                </div>

            </div>

            <p className="consultation-card__description">

                {description}

            </p>

            <div className="consultation-card__infos">

                <span>

                    <Clock3 size={16} />

                    {duration}

                </span>

                <span>

                    {mode === "online"

                        ? <Globe size={16} />

                        : <MapPin size={16} />}

                    {mode === "online"
                        ? "En ligne"
                        : "Présentiel"}

                </span>

            </div>

            <div className="consultation-card__languages">

                {languages.map(language => (

                    <Badge
                        key={language}
                    >

                        {language}

                    </Badge>

                ))}

            </div>

            <div className="consultation-card__footer">

                <div>

                    <div className="consultation-card__rating">

                        <Star
                            size={16}
                            fill="currentColor"
                        />

                        {rating}

                    </div>

                    <span>

                        {availableSlots} créneaux disponibles

                    </span>

                    {nextAvailable && (

                        <div className="consultation-card__next">

                            <Calendar size={15} />

                            {nextAvailable}

                        </div>

                    )}

                </div>

                <Button

                    onClick={() => onBook?.(consultation)}

                >

                    Prendre rendez-vous

                </Button>

            </div>

        </article>

    );

}

export default ConsultationCard;