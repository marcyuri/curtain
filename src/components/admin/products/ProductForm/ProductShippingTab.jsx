import "./ProductShippingTab.css";

function ProductShippingTab({

    product,

    shippingClasses = [],

    carriers = [],

    onChange,

}) {

    const update = ({ target }) => {

        onChange?.({

            ...product,

            [target.name]: target.value,

        });

    };

    return (

        <section className="product-shipping">

            <div className="product-card">

                <h2>

                    Dimensions

                </h2>

                <div className="product-grid">

                    <label>

                        <span>Poids (kg)</span>

                        <input

                            type="number"

                            step="0.01"

                            name="weight"

                            value={product.weight}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>Longueur (cm)</span>

                        <input

                            type="number"

                            step="0.1"

                            name="length"

                            value={product.length}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>Largeur (cm)</span>

                        <input

                            type="number"

                            step="0.1"

                            name="width"

                            value={product.width}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>Hauteur (cm)</span>

                        <input

                            type="number"

                            step="0.1"

                            name="height"

                            value={product.height}

                            onChange={update}

                        />

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Livraison

                </h2>

                <div className="product-grid">

                    <label>

                        <span>Classe de livraison</span>

                        <select

                            name="shippingClass"

                            value={product.shippingClass}

                            onChange={update}

                        >

                            <option value="">

                                Sélectionner

                            </option>

                            {

                                shippingClasses.map((item) => (

                                    <option

                                        key={item.id}

                                        value={item.id}

                                    >

                                        {item.name}

                                    </option>

                                ))

                            }

                        </select>

                    </label>

                    <label>

                        <span>Transporteur</span>

                        <select

                            name="carrier"

                            value={product.carrier}

                            onChange={update}

                        >

                            <option value="">

                                Sélectionner

                            </option>

                            {

                                carriers.map((carrier) => (

                                    <option

                                        key={carrier.id}

                                        value={carrier.id}

                                    >

                                        {carrier.name}

                                    </option>

                                ))

                            }

                        </select>

                    </label>

                    <label>

                        <span>Délai de préparation (jours)</span>

                        <input

                            type="number"

                            name="preparationTime"

                            value={product.preparationTime}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>Frais de livraison</span>

                        <input

                            type="number"

                            name="shippingPrice"

                            value={product.shippingPrice}

                            onChange={update}

                        />

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Options

                </h2>

                <div className="product-grid">

                    <label>

                        <span>Livraison gratuite</span>

                        <select

                            name="freeShipping"

                            value={product.freeShipping}

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

                        <span>Livraison internationale</span>

                        <select

                            name="internationalShipping"

                            value={product.internationalShipping}

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

export default ProductShippingTab;