import {
    Quote,
    Star,
    UserRound,
    BadgeCheck,
} from "lucide-react";

import "./TestimonialCard.css";

function TestimonialCard({

    avatar,

    name,

    role,

    message,

    rating = 5,

    verified = true,

    date,

}) {

    return (

        <article className="testimonial-card">

            <Quote

                size={36}

                className="testimonial-card__quote"

            />

            <p className="testimonial-card__message">

                {message}

            </p>

            <div className="testimonial-card__rating">

                {Array.from({

                    length: rating,

                }).map((_, index) => (

                    <Star

                        key={index}

                        size={16}

                        fill="currentColor"

                    />

                ))}

            </div>

            <footer className="testimonial-card__footer">

                <div className="testimonial-card__avatar">

                    {avatar ? (

                        <img

                            src={avatar}

                            alt={name}

                        />

                    ) : (

                        <UserRound size={32} />

                    )}

                </div>

                <div className="testimonial-card__author">

                    <div>

                        <strong>

                            {name}

                        </strong>

                        {verified && (

                            <BadgeCheck

                                size={16}

                                className="testimonial-card__verified"

                            />

                        )}

                    </div>

                    {role && (

                        <span>

                            {role}

                        </span>

                    )}

                    {date && (

                        <small>

                            {date}

                        </small>

                    )}

                </div>

            </footer>

        </article>

    );

}

export default TestimonialCard;