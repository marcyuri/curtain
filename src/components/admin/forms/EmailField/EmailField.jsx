import { Mail } from "lucide-react";
import "./EmailField.css";

function EmailField({
    label,
    name,
    value="",
    placeholder="exemple@domaine.com",
    required=false,
    disabled=false,
    readOnly=false,
    helperText="",
    error="",
    onChange,
    onBlur,
}){

    return(
        <div className="email-field">

            {label&&(
                <label
                    htmlFor={name}
                    className="email-field__label"
                >
                    {label}
                    {required&&<span>*</span>}
                </label>
            )}

            <div className={`email-field__control ${error?"email-field__control--error":""}`}>

                <Mail size={18}/>

                <input
                    id={name}
                    name={name}
                    type="email"
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    autoComplete="email"
                    onChange={onChange}
                    onBlur={onBlur}
                />

            </div>

            {error
                ? <small className="email-field__error">{error}</small>
                : helperText && <small className="email-field__helper">{helperText}</small>
            }

        </div>
    );

}

export default EmailField;
