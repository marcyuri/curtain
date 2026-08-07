import "./ProductPublishTab.css";

function ProductPublishTab({

    product,

    countries = [],

    languages = [],

    onChange,

}) {

    const update = ({ target }) => {

        const {

            name,

            type,

            checked,

            value,

        } = target;

        onChange?.({

            ...product,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        });

    };

    return (

        <section className="product-publish">

            <div className="product-card">

                <h2>

                    Publication

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Statut

                        </span>

                        <select

                            name="status"

                            value={product.status}

                            onChange={update}

                        >

                            <option value="draft">

                                Brouillon

                            </option>

                            <option value="published">

                                Publié

                            </option>

                            <option value="archived">

                                Archivé

                            </option>

                        </select>

                    </label>

                    <label>

                        <span>

                            Date de publication

                        </span>

                        <input

                            type="datetime-local"

                            name="publishedAt"

                            value={product.publishedAt}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Date de dépublication

                        </span>

                        <input

                            type="datetime-local"

                            name="unpublishedAt"

                            value={product.unpublishedAt}

                            onChange={update}

                        />

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Visibilité

                </h2>

                <div className="product-grid">

                    <label className="product-switch">

                        <input

                            type="checkbox"

                            name="featured"

                            checked={product.featured}

                            onChange={update}

                        />

                        <span>

                            Produit vedette

                        </span>

                    </label>

                    <label className="product-switch">

                        <input

                            type="checkbox"

                            name="visible"

                            checked={product.visible}

                            onChange={update}

                        />

                        <span>

                            Visible sur le site

                        </span>

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Pays disponibles

                </h2>

                <div className="product-checkbox-grid">

                    {

                        countries.map((country) => (

                            <label

                                key={country.code}

                            >

                                <input

                                    type="checkbox"

                                />

                                {country.name}

                            </label>

                        ))

                    }

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Langues disponibles

                </h2>

                <div className="product-checkbox-grid">

                    {

                        languages.map((language) => (

                            <label

                                key={language.code}

                            >

                                <input

                                    type="checkbox"

                                />

                                {language.name}

                            </label>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default ProductPublishTab;