import "./Radio.css";

function Radio({
    name,
    options = [],
    value,
    onChange,
    label,
    required = false,
    disabled = false,
    error = ""
}) {

    return (

        <div className="radio">

            {label && (

                <p className="radio__label">

                    {label}

                    {required && (
                        <span className="radio__required">*</span>
                    )}

                </p>

            )}

            <div className="radio__group">

                {options.map((option) => (

                    <label
                        key={option.value}
                        className="radio__option"
                    >

                        <input

                            type="radio"

                            name={name}

                            value={option.value}

                            checked={value === option.value}

                            onChange={onChange}

                            disabled={disabled}

                        />

                        <span className="radio__circle"></span>

                        <span className="radio__text">

                            {option.label}

                        </span>

                    </label>

                ))}

            </div>

            {error && (

                <span className="radio__error">

                    {error}

                </span>

            )}

        </div>

    );

}

export default Radio;