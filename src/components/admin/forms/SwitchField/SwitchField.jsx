import "./SwitchField.css";

function SwitchField({
    label,
    checked=false,
    disabled=false,
    helperText="",
    error="",
    onChange,
}){

    return(
        <div className="switch-field">

            <label className="switch-field__label">

                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(event)=>
                        onChange?.(
                            event.target.checked
                        )
                    }
                />

                <span className="switch-field__slider"/>

                <div className="switch-field__content">

                    <strong>

                        {label}

                    </strong>

                    {
                        helperText&&(
                            <small>

                                {helperText}

                            </small>
                        )
                    }

                </div>

            </label>

            {
                error&&(
                    <small className="switch-field__error">

                        {error}

                    </small>
                )
            }

        </div>
    );

}

export default SwitchField;
