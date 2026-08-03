import { Minus, Plus, Hash } from "lucide-react";
import "./NumberField.css";

function NumberField({
  label,
  name,
  value=0,
  min,
  max,
  step=1,
  required=false,
  disabled=false,
  readOnly=false,
  helperText="",
  error="",
  onChange,
}){
  const update=(v)=>{
    let n=Number(v);
    if(!Number.isFinite(n)) n=0;
    if(min!==undefined) n=Math.max(min,n);
    if(max!==undefined) n=Math.min(max,n);
    onChange?.(n);
  };

  return (
    <div className="number-field">
      {label && <label htmlFor={name} className="number-field__label">{label}{required&&<span>*</span>}</label>}
      <div className={`number-field__control ${error?"number-field__control--error":""}`}>
        <Hash size={18}/>
        <button type="button" onClick={()=>update(value-step)} disabled={disabled||readOnly}><Minus size={16}/></button>
        <input
          id={name}
          name={name}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          readOnly={readOnly}
          onChange={(e)=>update(e.target.value)}
        />
        <button type="button" onClick={()=>update(value+step)} disabled={disabled||readOnly}><Plus size={16}/></button>
      </div>
      {error?<small className="number-field__error">{error}</small>:helperText&&<small className="number-field__helper">{helperText}</small>}
    </div>
  );
}

export default NumberField;
