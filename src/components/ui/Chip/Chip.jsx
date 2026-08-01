import "./Chip.css";

function Chip({
    children,
    selected = false,
    clickable = false,
    removable = false,
    onClick,
    onRemove,
    className = ""
}) {

    const classes = [
        "chip",
        selected && "chip--selected",
        clickable && "chip--clickable",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div
            className={classes}
            onClick={clickable ? onClick : undefined}
        >

            <span className="chip__label">

                {children}

            </span>

            {removable && (

                <button
                    type="button"
                    className="chip__remove"
                    onClick={(event) => {

                        event.stopPropagation();

                        onRemove?.();

                    }}
                    aria-label="Supprimer"
                >

                    ×

                </button>

            )}

        </div>

    );

}

export default Chip;