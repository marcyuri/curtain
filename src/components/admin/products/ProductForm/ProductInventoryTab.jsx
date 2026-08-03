import "./ProductInventoryTab.css";

function ProductInventoryTab({

    product,

    warehouses = [],

    onChange,

}) {

    const update = ({ target }) => {

        onChange?.({

            ...product,

            [target.name]: target.value,

        });

    };

    return (

        <section className="product-inventory">

            <div className="product-card">

                <h2>

                    Gestion du stock

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            SKU

                        </span>

                        <input

                            name="sku"

                            value={product.sku}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Code-barres

                        </span>

                        <input

                            name="barcode"

                            value={product.barcode}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Quantité

                        </span>

                        <input

                            type="number"

                            name="quantity"

                            value={product.quantity}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Stock minimum

                        </span>

                        <input

                            type="number"

                            name="minimumStock"

                            value={product.minimumStock}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Stock maximum

                        </span>

                        <input

                            type="number"

                            name="maximumStock"

                            value={product.maximumStock}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Entrepôt

                        </span>

                        <select

                            name="warehouse"

                            value={product.warehouse}

                            onChange={update}

                        >

                            {

                                warehouses.map((warehouse) => (

                                    <option

                                        key={warehouse.id}

                                        value={warehouse.id}

                                    >

                                        {warehouse.name}

                                    </option>

                                ))

                            }

                        </select>

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Disponibilité

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Autoriser les précommandes

                        </span>

                        <select

                            name="preorder"

                            value={product.preorder}

                            onChange={update}

                        >

                            <option value={false}>

                                Non

                            </option>

                            <option value={true}>

                                Oui

                            </option>

                        </select>

                    </label>

                    <label>

                        <span>

                            Continuer à vendre en rupture

                        </span>

                        <select

                            name="continueSelling"

                            value={product.continueSelling}

                            onChange={update}

                        >

                            <option value={false}>

                                Non

                            </option>

                            <option value={true}>

                                Oui

                            </option>

                        </select>

                    </label>

                </div>

            </div>

        </section>

    );

}

export default ProductInventoryTab;