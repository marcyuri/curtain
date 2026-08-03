import {
Bold,Italic,Underline,Strikethrough,
List,ListOrdered,Link,Image,
Undo2,Redo2,Eye
} from "lucide-react";
import "./RichTextEditor.css";

const TOOLS=[
{icon:Bold,label:"Gras"},
{icon:Italic,label:"Italique"},
{icon:Underline,label:"Souligné"},
{icon:Strikethrough,label:"Barré"},
{icon:List,label:"Liste"},
{icon:ListOrdered,label:"Liste num."},
{icon:Link,label:"Lien"},
{icon:Image,label:"Image"},
{icon:Undo2,label:"Annuler"},
{icon:Redo2,label:"Rétablir"},
{icon:Eye,label:"Aperçu"},
];

function RichTextEditor({
label,
value="",
placeholder="Commencez à écrire...",
disabled=false,
helperText="",
error="",
onChange,
}){

return(
<div className="rte">
{label&&<label className="rte__label">{label}</label>}

<div className="rte__toolbar">
{TOOLS.map(({icon:Icon,label})=>(
<button key={label} type="button" title={label} disabled={disabled}>
<Icon size={18}/>
</button>
))}
</div>

<textarea
className={`rte__editor ${error?"rte__editor--error":""}`}
value={value}
placeholder={placeholder}
disabled={disabled}
onChange={(e)=>onChange?.(e.target.value)}
/>

{error?<small className="rte__error">{error}</small>:helperText&&<small className="rte__helper">{helperText}</small>}
</div>
);
}

export default RichTextEditor;
