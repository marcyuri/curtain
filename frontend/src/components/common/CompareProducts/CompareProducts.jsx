import "./CompareProducts.css";
function CompareProducts({products=[],onRemove,onAddToCart}){
if(products.length===0){return <div className="compare-products compare-products--empty">Aucun produit à comparer.</div>;}
const fields=[["image","Image"],["name","Nom"],["price","Prix"],["category","Catégorie"],["brand","Marque"],["rating","Note"],["stock","Stock"],["description","Description"]];
return <section className="compare-products"><table><tbody>{fields.map(([k,l])=><tr key={k}><th>{l}</th>{products.map(p=><td key={p.id+k}>{k==="image"?<img src={p.image} alt={p.name}/>:p[k]??"-"}</td>)}</tr>)}<tr><th>Actions</th>{products.map(p=><td key={p.id}><button onClick={()=>onAddToCart?.(p)}>Ajouter au panier</button><button onClick={()=>onRemove?.(p)}>Retirer</button></td>)}</tr></tbody></table></section>}
export default CompareProducts;
