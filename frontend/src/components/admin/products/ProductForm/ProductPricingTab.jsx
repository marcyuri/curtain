import "./ProductPricingTab.css";

function ProductPricingTab({

    product,

    currencies = [],

    taxes = [],

    onChange,

}) {

    const update = ({ target }) => {

        const {

            name,

            value,

        } = target;

        onChange?.({

            ...product,

            [name]: value,

        });

    };

    const margin =

        Number(product.price || 0) -

        Number(product.cost || 0);

    return (

        <section className="product-pricing">

            <div className="product-card">

                <h2>

                    Prix de vente

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Prix

                        </span>

                        <input

                            type="number"

                            name="price"

                            value={product.price}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Ancien prix

                        </span>

                        <input

                            type="number"

                            name="oldPrice"

                            value={product.oldPrice}

                            onChange={update}

                        />

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Coût

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Coût d&apos;achat

                        </span>

                        <input

                            type="number"

                            name="cost"

                            value={product.cost}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Marge

                        </span>

                        <input

                            value={margin}

                            disabled

                        />

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Fiscalité

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Devise

                        </span>

                        <select

                            name="currency"

                            value={product.currency}

                            onChange={update}

                        >

                            {

                                currencies.map((currency) => (

                                    <option

                                        key={currency.code}

                                        value={currency.code}

                                    >

                                        {currency.label}

                                    </option>

                                ))

                            }

                        </select>

                    </label>

                    <label>

                        <span>

                            TVA

                        </span>

                        <select

                            name="tax"

                            value={product.tax}

                            onChange={update}

                        >

                            {

                                taxes.map((tax) => (

                                    <option

                                        key={tax.id}

                                        value={tax.id}

                                    >

                                        {tax.label}

                                    </option>

                                ))

                            }

                        </select>

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Promotion

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Début

                        </span>

                        <input

                            type="date"

                            name="promotionStart"

                            value={product.promotionStart}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Fin

                        </span>

                        <input

                            type="date"

                            name="promotionEnd"

                            value={product.promotionEnd}

                            onChange={update}

                        />

                    </label>

                </div>

            </div>

        </section>

    );

}

export default ProductPricingTab;