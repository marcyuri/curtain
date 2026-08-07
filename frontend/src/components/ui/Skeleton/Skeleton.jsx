import "./Skeleton.css";

function Skeleton({
    width = "100%",
    height = "1rem",
    variant = "rectangle",
    animated = true,
    className = ""
}) {

    const classes = [
        "skeleton",
        `skeleton--${variant}`,
        animated && "skeleton--animated",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div
            className={classes}
            style={{
                width,
                height
            }}
            aria-hidden="true"
        />

    );

}

export default Skeleton;