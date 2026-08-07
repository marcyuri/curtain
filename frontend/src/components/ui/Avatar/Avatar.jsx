import "./Avatar.css";

function Avatar({
    src,
    alt = "Avatar",
    name = "",
    size = "default",
    shape = "circle",
    status,
    className = ""
}) {

    const initials = name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase())
        .join("");

    const classes = [
        "avatar",
        `avatar--${size}`,
        `avatar--${shape}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div className={classes}>

            {src ? (

                <img
                    src={src}
                    alt={alt}
                    className="avatar__image"
                />

            ) : (

                <span className="avatar__initials">

                    {initials || "?"}

                </span>

            )}

            {status && (

                <span
                    className={`avatar__status avatar__status--${status}`}
                />

            )}

        </div>

    );

}

export default Avatar;