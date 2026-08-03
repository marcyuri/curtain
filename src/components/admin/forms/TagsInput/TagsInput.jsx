import { X } from "lucide-react";
import { useState } from "react";
import "./TagsInput.css";

function TagsInput({
  label,
  tags=[],
  placeholder="Ajouter un tag...",
  disabled=false,
  helperText="",
  error="",
  onChange,
}){
  const [value,setValue]=useState("");

  const addTag=()=>{
    const tag=value.trim();
    if(!tag||tags.includes(tag)) return;
    onChange?.([...tags,tag]);
    setValue("");
  };

  const removeTag=(tag)=>{
    onChange?.(tags.filter(t=>t!==tag));
  };

  return(
    <div className="tags-input">
      {label&&<label className="tags-input__label">{label}</label>}

      <div className={`tags-input__control ${error?"tags-input__control--error":""}`}>
        <div className="tags-input__list">
          {tags.map(tag=>(
            <span key={tag} className="tags-input__tag">
              {tag}
              <button type="button" onClick={()=>removeTag(tag)}>
                <X size={14}/>
              </button>
            </span>
          ))}
          <input
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e)=>setValue(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter"||e.key===","){
                e.preventDefault();
                addTag();
              }
              if(e.key==="Backspace"&&!value&&tags.length){
                removeTag(tags[tags.length-1]);
              }
            }}
          />
        </div>
      </div>

      {error?<small className="tags-input__error">{error}</small>:helperText&&<small className="tags-input__helper">{helperText}</small>}
    </div>
  );
}

export default TagsInput;
