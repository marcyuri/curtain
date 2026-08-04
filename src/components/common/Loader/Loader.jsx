import "./Loader.css";

function Loader({
    text = "Chargement..."
}) {
    return (
        <div className="loader">

            <div className="loader__spinner"></div>

            <p className="loader__text">
                {text}
            </p>

        </div>
    );
}

export default Loader;