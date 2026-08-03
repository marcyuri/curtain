import { X } from "lucide-react";
import "./MultiSelectField.css";

function MultiSelectField({
  label,
  options=[],
  values=[],
  required=false,
  disabled=false,
  helperText="",
  error="",
  placeholder="Sélectionner...",
  onChange,
}){
  const toggle=(value)=>{
    if(disabled) return;
    const next=values.includes(value)
      ? values.filter(v=>v!==value)
      : [...values,value];
    onChange?.(next);
  };

  return(
    <div className="multi-select-field">
      {label&&<label className="multi-select-field__label">{label}{required&&<span>*</span>}</label>}

      <div className={`multi-select-field__control ${error?"multi-select-field__control--error":""}`}>
        <select
          disabled={disabled}
          defaultValue=""
          onChange={(e)=>{
            if(e.target.value) toggle(e.target.value);
            e.target.value="";
          }}
        >
          <option value="">{placeholder}</option>
          {options.map(option=>(
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="multi-select-field__tags">
          {values.map(value=>{
            const option=options.find(o=>o.value===value);
            return(
              <span key={value} className="multi-select-field__tag">
                {option?.label??value}
                <button type="button" onClick={()=>toggle(value)}>
                  <X size={14}/>
                </button>
              </span>
            );
          })}
        </div>
      </div>

      {error
        ? <small className="multi-select-field__error">{error}</small>
        : helperText&&<small className="multi-select-field__helper">{helperText}</small>}
    </div>
  );
}

export default MultiSelectField;
