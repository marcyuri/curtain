import "./Switch.css";

function Switch({
    id,
    name,
    label,
    checked = false,
    onChange,
    disabled = false
}) {
    return (
        <label
            htmlFor={id}
            className={`switch ${disabled ? "switch--disabled" : ""}`}
        >
            <input
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="switch__input"
            />

            <span className="switch__slider"></span>

            {label && (
                <span className="switch__label">
                    {label}
                </span>
            )}

        </label>
    );
}

export default Switch;