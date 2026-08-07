import { Clock3 } from "lucide-react";
import "./TimeField.css";

function TimeField({
    label,
    name,
    value="",
    required=false,
    disabled=false,
    readOnly=false,
    helperText="",
    error="",
    min,
    max,
    step=60,
    onChange,
    onBlur,
}){

    return(
        <div className="time-field">

            {label&&(
                <label
                    htmlFor={name}
                    className="time-field__label"
                >
                    {label}
                    {required&&<span>*</span>}
                </label>
            )}

            <div className={`time-field__control ${error?"time-field__control--error":""}`}>

                <Clock3 size={18}/>

                <input
                    id={name}
                    name={name}
                    type="time"
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={onChange}
                    onBlur={onBlur}
                />

            </div>

            {error
                ? <small className="time-field__error">{error}</small>
                : helperText&&(
                    <small className="time-field__helper">
                        {helperText}
                    </small>
                )
            }

        </div>
    );

}

export default TimeField;
