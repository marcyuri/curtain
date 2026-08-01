import "./CTASection.css";
import Button from "../../form/Button";

const CTASection = ({
    badge,
    title,
    description,
    backgroundImage,
    overlay = 0.55,
    align = "center",
    variant = "default",
    primaryButton,
    secondaryButton,
}) => {
    return (
        <section
            className={`cta-section cta-section--${variant}`}
            style={{
                "--cta-overlay": overlay,
                backgroundImage: backgroundImage
                    ? `url(${backgroundImage})`
                    : undefined,
            }}
        >
            <div
                className={`cta-section__content cta-section__content--${align}`}
            >
                {badge && (
                    <span className="cta-section__badge">
                        {badge}
                    </span>
                )}

                {title && <h2>{title}</h2>}

                {description && (
                    <p>{description}</p>
                )}

                <div className="cta-section__actions">
                    {primaryButton && (
                        <Button
                            onClick={primaryButton.onClick}
                        >
                            {primaryButton.label}
                        </Button>
                    )}

                    {secondaryButton && (
                        <Button
                            variant="outline"
                            onClick={secondaryButton.onClick}
                        >
                            {secondaryButton.label}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CTASection;