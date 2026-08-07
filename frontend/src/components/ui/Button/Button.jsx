import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    fullWidth = false,
    disabled = false,
    loading = false,
    icon = null,
    onClick,
    className = ""
}) {

    const classes = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? "button--full" : "",
        loading ? "button--loading" : "",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            onClick={onClick}
        >

            {loading && (
                <span className="button__spinner" />
            )}

            {!loading && icon}

            <span className="button__label">
                {children}
            </span>

        </button>
    );
}

export default Button;