import "./Section.css";

function Section({
    children,
    id,
    className = "",
    spacing = "default",
    background = "transparent"
}) {

    const classes = [
        "section",
        `section--${spacing}`,
        `section--${background}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <section
            id={id}
            className={classes}
        >

            {children}

        </section>

    );

}

export default Section;