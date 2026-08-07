import "./WhyChooseUs.css";
import Button from "../../ui/Button";

const WhyChooseUs = ({
    image,
    badge = "Pourquoi nous choisir",
    title,
    description,
    features = [],
    stats = [],
    buttonLabel,
    onButtonClick,
    reverse = false,
}) => (
        <section className="why-choose-us">
            <div
                className={`why-choose-us__container ${reverse ? "why-choose-us__container--reverse" : ""
                    }`}
            >
                <div className="why-choose-us__image">
                    <img src={image} alt={title} />
                </div>

                <div className="why-choose-us__content">
                    {badge && (
                        <span className="why-choose-us__badge">
                            {badge}
                        </span>
                    )}

                    <h2>{title}</h2>

                    <p className="why-choose-us__description">
                        {description}
                    </p>

                    <ul className="why-choose-us__features">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <li key={feature.id}>
                                    {Icon && (
                                        <span className="why-choose-us__icon">
                                            <Icon size={20} />
                                        </span>
                                    )}

                                    <div>
                                        <strong>{feature.title}</strong>

                                        {feature.description && (
                                            <p>{feature.description}</p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {stats.length > 0 && (
                        <div className="why-choose-us__stats">
                            {stats.map((stat) => (
                                <div
                                    key={stat.id}
                                    className="why-choose-us__stat"
                                >
                                    <h3>
                                        {stat.value}
                                        {stat.suffix}
                                    </h3>

                                    <span>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {buttonLabel && (
                        <Button onClick={onButtonClick}>
                            {buttonLabel}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );

export default WhyChooseUs;