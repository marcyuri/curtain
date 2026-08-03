import "./Badge.css";

function Badge({

    children,

    color = "primary",

    outlined = false,

    rounded = true,

}) {

    return (

        <span

            className={`

                badge

                badge--${color}

                ${outlined ? "badge--outlined" : ""}

                ${rounded ? "badge--rounded" : ""}

            `}

        >

            {children}

        </span>

    );

}

export default Badge;