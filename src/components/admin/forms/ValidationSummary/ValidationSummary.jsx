import { AlertTriangle, ArrowRight } from "lucide-react";
import "./ValidationSummary.css";

function ValidationSummary({
  title="Des erreurs doivent être corrigées",
  errors=[],
  onSelectError,
}){
  if(!errors.length) return null;

  return (
    <div className="validation-summary" role="alert">
      <div className="validation-summary__header">
        <AlertTriangle size={20}/>
        <div>
          <strong>{title}</strong>
          <p>{errors.length} erreur(s) détectée(s).</p>
        </div>
      </div>

      <ul className="validation-summary__list">
        {errors.map((error,index)=>(
          <li key={index}>
            <button
              type="button"
              onClick={()=>onSelectError?.(error,index)}
            >
              <span>{error.label || error.message}</span>
              <ArrowRight size={16}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ValidationSummary;
