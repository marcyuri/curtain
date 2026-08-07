import "./Input.css";

function Input({
    id,
    name,
    type = "text",
    label,
    placeholder = "",
    value,
    onChange,
    onBlur,
    error = "",
    required = false,
    disabled = false,
    readOnly = false,
    icon = null,
    fullWidth = true,
    autoComplete = "off"
}) {

    return (
        <div className={`input ${fullWidth ? "input--full" : ""}`}>

            {label && (

                <label
                    htmlFor={id}
                    className="input__label"
                >
                    {label}

                    {required && (
                        <span className="input__required">*</span>
                    )}

                </label>

            )}

            <div className="input__wrapper">

                {icon && (

                    <span className="input__icon">

                        {icon}

                    </span>

                )}

                <input

                    id={id}

                    name={name}

                    type={type}

                    value={value}

                    placeholder={placeholder}

                    onChange={onChange}

                    onBlur={onBlur}

                    disabled={disabled}

                    readOnly={readOnly}

                    required={required}

                    autoComplete={autoComplete}

                    className={`input__field ${error ? "input__field--error" : ""}`}

                />

            </div>

            {error && (

                <p className="input__error">

                    {error}

                </p>

            )}

        </div>
    );

}

export default Input;