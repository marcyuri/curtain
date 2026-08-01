import "./Badge.css";

function Badge({
    children,
    variant = "primary",
    size = "default",
    rounded = true,
    className = ""
}) {

    const classes = [
        "badge",
        `badge--${variant}`,
        `badge--${size}`,
        rounded && "badge--rounded",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <span className={classes}>

            {children}

        </span>

    );

}

export default Badge;