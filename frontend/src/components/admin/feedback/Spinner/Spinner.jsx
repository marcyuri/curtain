import "./Spinner.css";

function Spinner({

    size = "md",

    variant = "primary",

    label,

}) {

    return (

        <div className="spinner-wrapper">

            <span

                className={`
                    spinner
                    spinner--${size}
                    spinner--${variant}
                `}

            />

            {

                label && (

                    <span className="spinner-label">

                        {label}

                    </span>

                )

            }

        </div>

    );

}

export default Spinner;