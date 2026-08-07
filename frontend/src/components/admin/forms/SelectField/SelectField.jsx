import { ChevronDown } from "lucide-react";
import "./SelectField.css";

function SelectField({
  label,
  name,
  value="",
  options=[],
  placeholder="Sélectionner...",
  required=false,
  disabled=false,
  helperText="",
  error="",
  onChange,
  onBlur,
}){
  return (
    <div className="select-field">
      {label&&<label htmlFor={name} className="select-field__label">{label}{required&&<span>*</span>}</label>}
      <div className={`select-field__control ${error?"select-field__control--error":""}`}>
        <select
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value="">{placeholder}</option>
          {options.map(option=>(
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18}/>
      </div>
      {error?<small className="select-field__error">{error}</small>:helperText&&<small className="select-field__helper">{helperText}</small>}
    </div>
  );
}
export default SelectField;
