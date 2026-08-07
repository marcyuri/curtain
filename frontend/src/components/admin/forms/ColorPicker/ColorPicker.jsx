import { Copy, Pipette } from "lucide-react";
import "./ColorPicker.css";

const DEFAULT_COLORS = [
  "#EF4444","#F97316","#FACC15","#22C55E",
  "#3B82F6","#8B5CF6","#EC4899","#111827"
];

function ColorPicker({
  label,
  value="#3B82F6",
  colors=DEFAULT_COLORS,
  disabled=false,
  helperText="",
  error="",
  onChange,
}){

  const copyColor=()=>{
    navigator.clipboard?.writeText(value);
  };

  return(
    <div className="color-picker">

      {label&&(
        <label className="color-picker__label">
          {label}
        </label>
      )}

      <div className="color-picker__header">

        <div
          className="color-picker__preview"
          style={{background:value}}
        />

        <input
          type="color"
          value={value}
          disabled={disabled}
          onChange={(e)=>onChange?.(e.target.value)}
        />

        <input
          className="color-picker__hex"
          value={value}
          disabled={disabled}
          onChange={(e)=>onChange?.(e.target.value)}
        />

        <button
          type="button"
          onClick={copyColor}
        >
          <Copy size={16}/>
        </button>

      </div>

      <div className="color-picker__palette">

        {colors.map(color=>(

          <button
            key={color}
            type="button"
            className="color-picker__swatch"
            style={{background:color}}
            onClick={()=>onChange?.(color)}
          >
            {value===color&&<Pipette size={14}/>}
          </button>

        ))}

      </div>

      {error
        ?<small className="color-picker__error">{error}</small>
        :helperText&&(
          <small className="color-picker__helper">
            {helperText}
          </small>
        )}

    </div>
  );

}

export default ColorPicker;
