import "./Avatar.css";

function Avatar({

    src,

    alt = "Avatar",

    name = "",

    size = "md",

}) {

    const initials =

        name

            .split(" ")

            .filter(Boolean)

            .slice(0, 2)

            .map((item) => item[0])

            .join("")

            .toUpperCase();

    return (

        <div

            className={`avatar avatar--${size}`}

        >

            {

                src ? (

                    <img

                        src={src}

                        alt={alt}

                    />

                ) : (

                    <span>

                        {initials || "?"}

                    </span>

                )

            }

        </div>

    );

}

export default Avatar;