import {

    Plus,

    Trash2,

} from "lucide-react";

import "./ProductVariantsTab.css";

function ProductVariantsTab({

    variants = [],

    onAdd,

    onChange,

    onDelete,

}) {

    return (

        <section className="product-variants">

            <div className="product-card">

                <header className="product-card__header">

                    <div>

                        <h2>

                            Variantes

                        </h2>

                        <p>

                            Gérez les tailles, couleurs ou autres déclinaisons.

                        </p>

                    </div>

                    <button

                        onClick={onAdd}

                    >

                        <Plus size={18} />

                        Ajouter

                    </button>

                </header>

                <div className="product-variants__list">

                    {

                        variants.map((variant, index) => (

                            <article

                                key={variant.id || index}

                                className="product-variant"

                            >

                                <div className="product-grid">

                                    <label>

                                        <span>

                                            Nom

                                        </span>

                                        <input

                                            value={variant.name}

                                            onChange={(event) =>

                                                onChange?.(

                                                    index,

                                                    "name",

                                                    event.target.value

                                                )

                                            }

                                        />

                                    </label>

                                    <label>

                                        <span>

                                            Valeur

                                        </span>

                                        <input

                                            value={variant.value}

                                            onChange={(event) =>

                                                onChange?.(

                                                    index,

                                                    "value",

                                                    event.target.value

                                                )

                                            }

                                        />

                                    </label>

                                    <label>

                                        <span>

                                            SKU

                                        </span>

                                        <input

                                            value={variant.sku}

                                            onChange={(event) =>

                                                onChange?.(

                                                    index,

                                                    "sku",

                                                    event.target.value

                                                )

                                            }

                                        />

                                    </label>

                                    <label>

                                        <span>

                                            Prix

                                        </span>

                                        <input

                                            type="number"

                                            value={variant.price}

                                            onChange={(event) =>

                                                onChange?.(

                                                    index,

                                                    "price",

                                                    event.target.value

                                                )

                                            }

                                        />

                                    </label>

                                    <label>

                                        <span>

                                            Stock

                                        </span>

                                        <input

                                            type="number"

                                            value={variant.stock}

                                            onChange={(event) =>

                                                onChange?.(

                                                    index,

                                                    "stock",

                                                    event.target.value

                                                )

                                            }

                                        />

                                    </label>

                                </div>

                                <button

                                    className="product-variant__delete"

                                    onClick={() =>

                                        onDelete?.(index)

                                    }

                                >

                                    <Trash2 size={18} />

                                    Supprimer

                                </button>

                            </article>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default ProductVariantsTab;