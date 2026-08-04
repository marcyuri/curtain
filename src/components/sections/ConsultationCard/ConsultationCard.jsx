import {
    CalendarDays,
    Clock3,
    MapPin,
    Monitor,
    UserRound,
    CheckCircle2,
} from "lucide-react";

import Button from "../../ui/Button";

import "./ConsultationCard.css";

function ConsultationCard({

    title,

    specialist,

    description,

    duration,

    mode = "Présentiel",

    available = true,

    image,

    buttonLabel = "Prendre rendez-vous",

    onBook,

}) {

    return (

        <article className="consultation-card">

            <div className="consultation-card__image">

                {image ? (

                    <img

                        src={image}

                        alt={title}

                    />

                ) : (

                    <div className="consultation-card__placeholder">

                        <UserRound size={70} />

                    </div>

                )}

            </div>

            <div className="consultation-card__body">

                <div className="consultation-card__status">

                    <CheckCircle2 size={16} />

                    <span>

                        {available

                            ? "Disponible"

                            : "Indisponible"}

                    </span>

                </div>

                <h3>

                    {title}

                </h3>

                <p>

                    {description}

                </p>

                <div className="consultation-card__details">

                    <div>

                        <UserRound size={18} />

                        <span>

                            {specialist}

                        </span>

                    </div>

                    <div>

                        <Clock3 size={18} />

                        <span>

                            {duration}

                        </span>

                    </div>

                    <div>

                        {mode === "En ligne"

                            ? <Monitor size={18} />

                            : <MapPin size={18} />

                        }

                        <span>

                            {mode}

                        </span>

                    </div>

                </div>

            </div>

            <footer className="consultation-card__footer">

                <Button

                    disabled={!available}

                    onClick={onBook}

                >

                    <CalendarDays size={18} />

                    {buttonLabel}

                </Button>

            </footer>

        </article>

    );

}

export default ConsultationCard;