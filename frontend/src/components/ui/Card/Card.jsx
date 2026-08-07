import "./Card.css";

function Card({
    children,
    className = "",
    variant = "default",
    padding = "default",
    shadow = "default",
    hover = true,
    onClick
}) {

    const classes = [
        "card",
        `card--${variant}`,
        `card--${padding}`,
        `card--shadow-${shadow}`,
        hover && "card--hover",
        onClick && "card--clickable",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <article
            className={classes}
            onClick={onClick}
        >

            {children}

        </article>

    );

}

export default Card;