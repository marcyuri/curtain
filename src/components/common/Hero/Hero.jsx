import { ArrowRight } from "lucide-react";
import Button from "../../ui/Button";
import "./Hero.css";

function Hero({
    title,
    subtitle,
    image,
    primaryAction,
    secondaryAction,
    stats = [],
    className = ""
}) {

    const classes = [
        "hero",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <section className={classes}>

            <div className="hero__content">

                <span className="hero__badge">

                    LOVE CAN BUILD

                </span>

                <h1 className="hero__title">

                    {title}

                </h1>

                <p className="hero__subtitle">

                    {subtitle}

                </p>

                <div className="hero__actions">

                    {primaryAction && (

                        <Button
                            onClick={primaryAction.onClick}
                        >

                            {primaryAction.label}

                            <ArrowRight size={18} />

                        </Button>

                    )}

                    {secondaryAction && (

                        <Button
                            variant="secondary"
                            onClick={secondaryAction.onClick}
                        >

                            {secondaryAction.label}

                        </Button>

                    )}

                </div>

                {stats.length > 0 && (

                    <div className="hero__stats">

                        {stats.map((stat) => (

                            <div
                                key={stat.label}
                                className="hero__stat"
                            >

                                <strong>

                                    {stat.value}

                                </strong>

                                <span>

                                    {stat.label}

                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            <div className="hero__image">

                <img

                    src={image}

                    alt={title}

                />

            </div>

        </section>

    );

}

export default Hero;