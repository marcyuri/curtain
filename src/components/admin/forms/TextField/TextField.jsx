import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import "./TextField.css";

function TextField({
    label,
    name,
    value="",
    placeholder="",
    type="text",
    required=false,
    disabled=false,
    readOnly=false,
    error="",
    helperText="",
    startIcon,
    endIcon,
    onChange,
    onBlur,
}){

    const [showPassword,setShowPassword]=useState(false);

    const inputType=
        type==="password"
            ? (showPassword?"text":"password")
            : type;

    return(
        <div className="text-field">

            {label&&(
                <label
                    htmlFor={name}
                    className="text-field__label"
                >
                    {label}
                    {required&&<span>*</span>}
                </label>
            )}

            <div className={`text-field__control ${error?"text-field__control--error":""}`}>

                {startIcon&&(
                    <span className="text-field__icon">
                        {startIcon}
                    </span>
                )}

                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={onChange}
                    onBlur={onBlur}
                />

                {type==="password"&&(
                    <button
                        type="button"
                        className="text-field__toggle"
                        onClick={()=>setShowPassword(!showPassword)}
                    >
                        {showPassword?<EyeOff size={18}/>:<Eye size={18}/>}
                    </button>
                )}

                {endIcon&&type!=="password"&&(
                    <span className="text-field__icon">
                        {endIcon}
                    </span>
                )}

            </div>

            {error?(
                <small className="text-field__error">
                    {error}
                </small>
            ):(
                helperText&&(
                    <small className="text-field__helper">
                        {helperText}
                    </small>
                )
            )}

        </div>
    );

}

export default TextField;
