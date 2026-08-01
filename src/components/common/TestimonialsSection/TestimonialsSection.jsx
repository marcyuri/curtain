import { useMemo, useState } from "react";
import "./TestimonialsSection.css";
import Button from "../../form/Button";
import TestimonialCard from "../TestimonialCard";

const TestimonialsSection = ({
    title = "Ils nous font confiance",
    subtitle,
    testimonials = [],
    categories = [],
    carousel = false,
    autoplay = false,
    limit,
    showMoreLabel = "Voir tous les avis",
    onShowMore,
}) => {
    const [category, setCategory] = useState("all");

    const filteredTestimonials = useMemo(() => {
        if (category === "all") return testimonials;

        return testimonials.filter(
            (testimonial) =>
                testimonial.category === category
        );
    }, [category, testimonials]);

    const displayedTestimonials = limit
        ? filteredTestimonials.slice(0, limit)
        : filteredTestimonials;

    const averageRating = testimonials.length
        ? (
            testimonials.reduce(
                (sum, item) => sum + item.rating,
                0
            ) / testimonials.length
        ).toFixed(1)
        : "0.0";

    return (
        <section className="testimonials-section">
            <header className="testimonials-section__header">
                <div>
                    <h2>{title}</h2>

                    {subtitle && <p>{subtitle}</p>}
                </div>

                <div className="testimonials-section__summary">
                    <strong>{averageRating} ★</strong>

                    <span>
                        {testimonials.length} avis
                    </span>
                </div>
            </header>

            {categories.length > 0 && (
                <div className="testimonials-section__filters">
                    <button
                        className={
                            category === "all"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCategory("all")
                        }
                    >
                        Tous
                    </button>

                    {categories.map((item) => (
                        <button
                            key={item}
                            className={
                                category === item
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setCategory(item)
                            }
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}

            <div
                className={`testimonials-section__content ${carousel
                        ? "testimonials-section__content--carousel"
                        : ""
                    }`}
                data-autoplay={autoplay}
            >
                {displayedTestimonials.map(
                    (testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            {...testimonial}
                        />
                    )
                )}
            </div>

            {limit &&
                filteredTestimonials.length >
                limit &&
                onShowMore && (
                    <div className="testimonials-section__footer">
                        <Button
                            onClick={onShowMore}
                        >
                            {showMoreLabel}
                        </Button>
                    </div>
                )}
        </section>
    );
};

export default TestimonialsSection;