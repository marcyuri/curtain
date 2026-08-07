import "./Textarea.css";

function Textarea({
    id,
    name,
    label,
    placeholder = "",
    value,
    onChange,
    onBlur,
    rows = 6,
    required = false,
    disabled = false,
    readOnly = false,
    error = "",
    maxLength,
    showCounter = false
}) {

    const currentLength = value?.length ?? 0;

    return (
        <div className="textarea">

            {label && (

                <label
                    htmlFor={id}
                    className="textarea__label"
                >

                    {label}

                    {required && (
                        <span className="textarea__required">
                            *
                        </span>
                    )}

                </label>

            )}

            <textarea

                id={id}

                name={name}

                rows={rows}

                value={value}

                placeholder={placeholder}

                onChange={onChange}

                onBlur={onBlur}

                required={required}

                disabled={disabled}

                readOnly={readOnly}

                maxLength={maxLength}

                className={`textarea__field ${error ? "textarea__field--error" : ""
                    }`}

            />

            <div className="textarea__footer">

                {error && (

                    <span className="textarea__error">

                        {error}

                    </span>

                )}

                {showCounter && maxLength && (

                    <span className="textarea__counter">

                        {currentLength} / {maxLength}

                    </span>

                )}

            </div>

        </div>
    );
}

export default Textarea;