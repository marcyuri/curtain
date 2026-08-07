import { Phone } from "lucide-react";
import "./PhoneField.css";

const COUNTRIES=[
 {code:"CM",dial:"+237",label:"🇨🇲"},
 {code:"FR",dial:"+33",label:"🇫🇷"},
 {code:"US",dial:"+1",label:"🇺🇸"},
];

function PhoneField({
 label,
 name,
 country="CM",
 number="",
 required=false,
 disabled=false,
 readOnly=false,
 helperText="",
 error="",
 onCountryChange,
 onNumberChange,
 onBlur,
}){

 return(
  <div className="phone-field">
   {label&&(
    <label className="phone-field__label" htmlFor={name}>
      {label}{required&&<span>*</span>}
    </label>
   )}

   <div className={`phone-field__control ${error?"phone-field__control--error":""}`}>
      <Phone size={18}/>

      <select
        value={country}
        disabled={disabled}
        onChange={(e)=>onCountryChange?.(e.target.value)}
      >
        {COUNTRIES.map(item=>(
          <option key={item.code} value={item.code}>
            {item.label} {item.dial}
          </option>
        ))}
      </select>

      <input
        id={name}
        name={name}
        type="tel"
        value={number}
        placeholder="6XX XXX XXX"
        disabled={disabled}
        readOnly={readOnly}
        autoComplete="tel"
        onChange={(e)=>onNumberChange?.(e.target.value)}
        onBlur={onBlur}
      />
   </div>

   {error
     ? <small className="phone-field__error">{error}</small>
     : helperText && <small className="phone-field__helper">{helperText}</small>
   }
  </div>
 );
}

export default PhoneField;
