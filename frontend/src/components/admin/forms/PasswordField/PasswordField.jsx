import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import "./PasswordField.css";

function PasswordField({
 label,
 name,
 value="",
 placeholder="Mot de passe",
 required=false,
 disabled=false,
 readOnly=false,
 helperText="",
 error="",
 autoComplete="current-password",
 onChange,
 onBlur,
}){
 const [visible,setVisible]=useState(false);

 return(
  <div className="password-field">
   {label&&(
    <label htmlFor={name} className="password-field__label">
      {label}{required&&<span>*</span>}
    </label>
   )}

   <div className={`password-field__control ${error?"password-field__control--error":""}`}>
      <Lock size={18}/>
      <input
        id={name}
        name={name}
        type={visible?"text":"password"}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
      />
      <button
        type="button"
        className="password-field__toggle"
        onClick={()=>setVisible(!visible)}
      >
        {visible?<EyeOff size={18}/>:<Eye size={18}/>}
      </button>
   </div>

   {error
    ? <small className="password-field__error">{error}</small>
    : helperText&&<small className="password-field__helper">{helperText}</small>
   }

  </div>
 );
}

export default PasswordField;
