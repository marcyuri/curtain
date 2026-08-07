import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import "./FormStepper.css";

function FormStepper({
  steps=[],
  currentStep=0,
  canGoNext=true,
  canGoPrevious=true,
  onNext,
  onPrevious,
  onStepChange,
  children,
}){

  const progress=((currentStep+1)/Math.max(steps.length,1))*100;

  return(
    <div className="form-stepper">

      <div className="form-stepper__header">
        {steps.map((step,index)=>(
          <button
            key={step.id||index}
            type="button"
            className={`form-stepper__step ${index===currentStep?"active":""} ${index<currentStep?"completed":""}`}
            onClick={()=>onStepChange?.(index)}
          >
            <span className="form-stepper__index">
              {index<currentStep?<Check size={16}/>:index+1}
            </span>
            <span>{step.label}</span>
          </button>
        ))}
      </div>

      <div className="form-stepper__progress">
        <div
          className="form-stepper__progress-bar"
          style={{width:`${progress}%`}}
        />
      </div>

      <div className="form-stepper__content">
        {children}
      </div>

      <div className="form-stepper__actions">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          <ChevronLeft size={18}/>
          Précédent
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
        >
          Suivant
          <ChevronRight size={18}/>
        </button>
      </div>

    </div>
  );
}

export default FormStepper;
