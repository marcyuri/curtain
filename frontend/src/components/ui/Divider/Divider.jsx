import "./Divider.css";

function Divider({
    orientation = "horizontal",
    variant = "solid",
    color = "default",
    spacing = "default",
    className = ""
}) {

    const classes = [
        "divider",
        `divider--${orientation}`,
        `divider--${variant}`,
        `divider--${color}`,
        `divider--${spacing}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <hr
            className={classes}
            aria-hidden="true"
        />
    );

}

export default Divider;