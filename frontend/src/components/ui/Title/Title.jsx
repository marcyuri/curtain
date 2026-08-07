import "./Title.css";

function Title({
    children,
    level = 2,
    align = "left",
    color = "default",
    className = ""
}) {

    const Tag = `h${level}`;

    const classes = [
        "title",
        `title--${align}`,
        `title--${color}`,
        `title--h${level}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <Tag className={classes}>

            {children}

        </Tag>

    );

}

export default Title;