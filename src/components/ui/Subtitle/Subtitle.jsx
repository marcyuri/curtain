import "./Subtitle.css";

function Subtitle({
    children,
    align = "left",
    color = "default",
    size = "default",
    className = ""
}) {

    const classes = [
        "subtitle",
        `subtitle--${align}`,
        `subtitle--${color}`,
        `subtitle--${size}`,
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

export default Subtitle;