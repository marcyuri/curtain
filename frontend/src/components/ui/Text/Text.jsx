import "./Text.css";

function Text({
    children,
    size = "default",
    color = "default",
    align = "left",
    weight = "regular",
    className = ""
}) {

    const classes = [
        "text",
        `text--${size}`,
        `text--${color}`,
        `text--${align}`,
        `text--${weight}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <p className={classes}>

            {children}

        </p>

    );

}

export default Text;