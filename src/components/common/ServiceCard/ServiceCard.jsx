import {
    ArrowRight,
    Clock3,
    Tag
} from "lucide-react";

import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import "./ServiceCard.css";

function ServiceCard({

    service,

    onClick,

    className = ""

}) {

    const {

        icon,

        image,

        title,

        description,

        duration,

        category,

        badge,

        disabled = false

    } = service;

    return (

        <article
            className={`service-card ${className}`}
        >

            {image && (

                <div className="service-card__image">

                    <img
                        src={image}
                        alt={title}
                    />

                </div>

            )}

            <div className="service-card__content">

                {badge && (

                    <Badge>

                        {badge}

                    </Badge>

                )}

                <div className="service-card__icon">

                    {icon}

                </div>

                <h3>

                    {title}

                </h3>

                <p>

                    {description}

                </p>

                <div className="service-card__meta">

                    <span>

                        <Clock3 size={16} />

                        {duration}

                    </span>

                    <span>

                        <Tag size={16} />

                        {category}

                    </span>

                </div>

                <Button
                    fullWidth
                    disabled={disabled}
                    onClick={() => onClick?.(service)}
                >

                    Découvrir

                    <ArrowRight size={18} />

                </Button>

            </div>

        </article>

    );

}

export default ServiceCard;