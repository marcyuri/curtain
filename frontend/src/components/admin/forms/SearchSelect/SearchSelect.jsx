import { Search, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import "./SearchSelect.css";

function SearchSelect({
  label,
  options=[],
  value="",
  placeholder="Rechercher...",
  disabled=false,
  helperText="",
  error="",
  onChange,
}){
  const [query,setQuery]=useState("");
  const filtered=useMemo(()=>options.filter(o=>o.label.toLowerCase().includes(query.toLowerCase())),[options,query]);

  return(
    <div className="search-select">
      {label&&<label className="search-select__label">{label}</label>}
      <div className={`search-select__control ${error?"search-select__control--error":""}`}>
        <Search size={18}/>
        <input value={query} disabled={disabled} placeholder={placeholder} onChange={e=>setQuery(e.target.value)}/>
      </div>
      <ul className="search-select__list">
        {filtered.map(item=>(
          <li key={item.value}>
            <button type="button" className={value===item.value?"active":""} onClick={()=>onChange?.(item.value)}>
              <span>{item.label}</span><ChevronDown size={16}/>
            </button>
          </li>
        ))}
      </ul>
      {error?<small className="search-select__error">{error}</small>:helperText&&<small className="search-select__helper">{helperText}</small>}
    </div>
  );
}
export default SearchSelect;
