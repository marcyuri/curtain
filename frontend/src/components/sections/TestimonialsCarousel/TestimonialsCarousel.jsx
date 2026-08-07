import { useEffect, useState } from "react";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import TestimonialCard from "../TestimonialCard";

import "./TestimonialsCarousel.css";

function TestimonialsCarousel({

    testimonials = [],

    autoPlay = true,

    interval = 5000,

}) {

    const [current, setCurrent] = useState(0);

    useEffect(() => {

        if (

            !autoPlay ||

            testimonials.length <= 1

        ) {

            return;

        }

        const timer = setInterval(() => {

            setCurrent((index) =>

                index === testimonials.length - 1

                    ? 0

                    : index + 1

            );

        }, interval);

        return () => clearInterval(timer);

    }, [

        autoPlay,

        interval,

        testimonials.length,

    ]);

    if (testimonials.length === 0) {

        return null;

    }

    const previous = () => {

        setCurrent((index) =>

            index === 0

                ? testimonials.length - 1

                : index - 1

        );

    };

    const next = () => {

        setCurrent((index) =>

            index === testimonials.length - 1

                ? 0

                : index + 1

        );

    };

    return (

        <section className="testimonials-carousel">

            <header className="testimonials-carousel__header">

                <h2>

                    Ce que disent nos clients

                </h2>

                <p>

                    Découvrez quelques témoignages de personnes accompagnées par LOVE CAN BUILD.

                </p>

            </header>

            <div className="testimonials-carousel__content">

                <button

                    type="button"

                    className="testimonials-carousel__button"

                    onClick={previous}

                >

                    <ChevronLeft size={22} />

                </button>

                <div className="testimonials-carousel__card">

                    <TestimonialCard

                        {...testimonials[current]}

                    />

                </div>

                <button

                    type="button"

                    className="testimonials-carousel__button"

                    onClick={next}

                >

                    <ChevronRight size={22} />

                </button>

            </div>

            <div className="testimonials-carousel__dots">

                {testimonials.map((_, index) => (

                    <button

                        key={index}

                        type="button"

                        className={

                            current === index

                                ? "testimonials-carousel__dot testimonials-carousel__dot--active"

                                : "testimonials-carousel__dot"

                        }

                        onClick={() =>

                            setCurrent(index)

                        }

                    />

                ))}

            </div>

        </section>

    );

}

export default TestimonialsCarousel;