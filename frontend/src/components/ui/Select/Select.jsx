import "./Select.css";

function Select({
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    options = [],
    placeholder = "Sélectionner...",
    required = false,
    disabled = false,
    error = "",
    fullWidth = true
}) {

    return (
        <div className={`select ${fullWidth ? "select--full" : ""}`}>

            {label && (
                <label
                    htmlFor={id}
                    className="select__label"
                >
                    {label}

                    {required && (
                        <span className="select__required">*</span>
                    )}

                </label>
            )}

            <select

                id={id}

                name={name}

                value={value}

                onChange={onChange}

                onBlur={onBlur}

                disabled={disabled}

                className={`select__field ${error ? "select__field--error" : ""
                    }`}

            >

                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (

                    <option
                        key={option.value}
                        value={option.value}
                    >

                        {option.label}

                    </option>

                ))}

            </select>

            {error && (

                <span className="select__error">

                    {error}

                </span>

            )}

        </div>
    );

}

export default Select;