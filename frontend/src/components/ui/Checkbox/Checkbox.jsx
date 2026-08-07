import "./Checkbox.css";

function Checkbox({
    id,
    name,
    label,
    checked = false,
    onChange,
    disabled = false,
    required = false,
    error = ""
}) {
    return (
        <div className="checkbox">

            <label
                htmlFor={id}
                className="checkbox__label"
            >

                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className="checkbox__input"
                />

                <span className="checkbox__box"></span>

                <span className="checkbox__text">
                    {label}
                </span>

            </label>

            {error && (
                <span className="checkbox__error">
                    {error}
                </span>
            )}

        </div>
    );
}

export default Checkbox;