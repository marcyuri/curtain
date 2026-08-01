import "./FeaturesSection.css";
import Button from "../../form/Button";

const FeaturesSection = ({
    title = "Pourquoi nous choisir ?",
    subtitle,
    features = [],
    columns = 3,
}) => {
    return (
        <section className="features-section">
            {(title || subtitle) && (
                <header className="features-section__header">
                    {title && <h2>{title}</h2>}
                    {subtitle && <p>{subtitle}</p>}
                </header>
            )}

            <div
                className="features-section__grid"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(260px,1fr))`,
                }}
            >
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <article
                            key={feature.id}
                            className={`features-section__card ${feature.featured
                                    ? "features-section__card--featured"
                                    : ""
                                }`}
                        >
                            {Icon && (
                                <div className="features-section__icon">
                                    <Icon size={36} />
                                </div>
                            )}

                            <h3>{feature.title}</h3>

                            <p>{feature.description}</p>

                            {feature.buttonLabel && (
                                <Button
                                    variant="outline"
                                    onClick={feature.onClick}
                                >
                                    {feature.buttonLabel}
                                </Button>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default FeaturesSection;