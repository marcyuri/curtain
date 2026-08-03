import { Coins } from "lucide-react";
import "./CurrencyField.css";

const CURRENCIES=[
 {code:"XAF",symbol:"FCFA"},
 {code:"EUR",symbol:"€"},
 {code:"USD",symbol:"$"},
];

function CurrencyField({
 label,
 name,
 value="",
 currency="XAF",
 placeholder="0",
 required=false,
 disabled=false,
 readOnly=false,
 helperText="",
 error="",
 onValueChange,
 onCurrencyChange,
}){

 return(
  <div className="currency-field">
   {label&&(
    <label htmlFor={name} className="currency-field__label">
      {label}{required&&<span>*</span>}
    </label>
   )}

   <div className={`currency-field__control ${error?"currency-field__control--error":""}`}>
      <Coins size={18}/>
      <input
        id={name}
        name={name}
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(e)=>onValueChange?.(e.target.value)}
      />

      <select
        value={currency}
        disabled={disabled}
        onChange={(e)=>onCurrencyChange?.(e.target.value)}
      >
        {CURRENCIES.map(item=>(
          <option key={item.code} value={item.code}>
            {item.symbol}
          </option>
        ))}
      </select>
   </div>

   {error
    ? <small className="currency-field__error">{error}</small>
    : helperText && <small className="currency-field__helper">{helperText}</small>
   }
  </div>
 );
}

export default CurrencyField;
