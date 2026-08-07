import "./Spinner.css";

function Spinner({
    size = "default",
    color = "primary",
    className = ""
}) {

    const classes = [
        "spinner",
        `spinner--${size}`,
        `spinner--${color}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span
            className={classes}
            role="status"
            aria-label="Chargement"
        />
    );

}

export default Spinner;