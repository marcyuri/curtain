import "./MissionVisionSection.css";
import Button from "../../ui/Button";

const MissionVisionSection = ({
    badge = "À propos",
    title = "Notre mission et notre vision",
    description,
    image,
    reverse = false,
    cards = [],
    buttonLabel,
    onButtonClick,
}) => (
        <section className="mission-vision">
            <div
                className={`mission-vision__container ${reverse ? "mission-vision__container--reverse" : ""
                    }`}
            >
                <div className="mission-vision__content">
                    {badge && (
                        <span className="mission-vision__badge">
                            {badge}
                        </span>
                    )}

                    <h2>{title}</h2>

                    {description && (
                        <p className="mission-vision__description">
                            {description}
                        </p>
                    )}

                    <div className="mission-vision__cards">
                        {cards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <article
                                    key={card.id}
                                    className={`mission-vision__card ${card.featured
                                            ? "mission-vision__card--featured"
                                            : ""
                                        }`}
                                >
                                    {Icon && (
                                        <div className="mission-vision__icon">
                                            <Icon size={26} />
                                        </div>
                                    )}

                                    <div>
                                        <h3>{card.title}</h3>

                                        <p>{card.description}</p>

                                        {card.items?.length > 0 && (
                                            <ul>
                                                {card.items.map((item, index) => (
                                                    <li key={index}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {buttonLabel && (
                        <Button onClick={onButtonClick}>
                            {buttonLabel}
                        </Button>
                    )}
                </div>

                {image && (
                    <div className="mission-vision__image">
                        <img
                            src={image}
                            alt={title}
                        />
                    </div>
                )}
            </div>
        </section>
    );

export default MissionVisionSection;