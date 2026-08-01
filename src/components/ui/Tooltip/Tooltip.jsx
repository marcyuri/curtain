import "./Tooltip.css";

function Tooltip({
    children,
    content,
    position = "top",
    className = ""
}) {

    const classes = [
        "tooltip",
        `tooltip--${position}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div className={classes}>

            {children}

            <span
                className="tooltip__content"
                role="tooltip"
            >
                {content}
            </span>

        </div>

    );

}

export default Tooltip;