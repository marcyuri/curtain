import { Search } from "lucide-react";
import { useMemo,useState } from "react";
import "./Autocomplete.css";

function Autocomplete({
 label,
 value="",
 suggestions=[],
 placeholder="Rechercher...",
 disabled=false,
 helperText="",
 error="",
 onChange,
 onSelect,
}){
 const [open,setOpen]=useState(false);
 const items=useMemo(()=>suggestions.filter(s=>s.toLowerCase().includes(value.toLowerCase())),[suggestions,value]);

 return(
 <div className="autocomplete">
  {label&&<label className="autocomplete__label">{label}</label>}
  <div className={`autocomplete__control ${error?"autocomplete__control--error":""}`}>
   <Search size={18}/>
   <input
    value={value}
    placeholder={placeholder}
    disabled={disabled}
    onFocus={()=>setOpen(true)}
    onBlur={()=>setTimeout(()=>setOpen(false),150)}
    onChange={e=>onChange?.(e.target.value)}
   />
  </div>
  {open&&items.length>0&&(
   <ul className="autocomplete__list">
    {items.map(item=>(
      <li key={item}>
       <button type="button" onClick={()=>{onSelect?.(item);setOpen(false);}}>
        {item}
       </button>
      </li>
    ))}
   </ul>
  )}
  {error?<small className="autocomplete__error">{error}</small>:helperText&&<small className="autocomplete__helper">{helperText}</small>}
 </div>);
}
export default Autocomplete;
