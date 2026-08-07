import "./Container.css";

function Container({
    children,
    size = "default",
    className = ""
}) {

    const classes = [
        "container",
        `container--${size}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div className={classes}>

            {children}

        </div>

    );

}

export default Container;