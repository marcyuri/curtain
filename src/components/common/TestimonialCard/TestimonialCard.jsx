import {
    Quote,
    Star,
    BadgeCheck
} from "lucide-react";

import Avatar from "../../ui/Avatar";
import Badge from "../../ui/Badge";

import "./TestimonialCard.css";

function TestimonialCard({

    testimonial,

    variant = "default",

    className = ""

}) {

    const {

        photo,

        name,

        role,

        rating = 5,

        message,

        service,

        date,

        verified = false

    } = testimonial;

    return (

        <article
            className={`
                testimonial-card
                testimonial-card--${variant}
                ${className}
            `}
        >

            <Quote
                className="testimonial-card__quote"
                size={42}
            />

            <div className="testimonial-card__header">

                <Avatar

                    src={photo}

                    alt={name}

                    size="lg"

                />

                <div>

                    <h3>

                        {name}

                    </h3>

                    <span>

                        {role}

                    </span>

                </div>

            </div>

            <div className="testimonial-card__rating">

                {Array.from({
                    length: rating
                }).map((_, index) => (

                    <Star

                        key={index}

                        size={18}

                        fill="currentColor"

                    />

                ))}

            </div>

            <p className="testimonial-card__message">

                "{message}"

            </p>

            <div className="testimonial-card__footer">

                <div>

                    <Badge>

                        {service}

                    </Badge>

                </div>

                <div className="testimonial-card__infos">

                    <span>

                        {date}

                    </span>

                    {verified && (

                        <span
                            className="testimonial-card__verified"
                        >

                            <BadgeCheck
                                size={16}
                            />

                            Client vérifié

                        </span>

                    )}

                </div>

            </div>

        </article>

    );

}

export default TestimonialCard;