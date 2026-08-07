import "./ProductGeneralTab.css";

function ProductGeneralTab({

    product,

    categories = [],

    brands = [],

    collections = [],

    onChange,

}) {

    const update = ({ target }) => {

        onChange?.({

            ...product,

            [target.name]: target.value,

        });

    };

    return (

        <section className="product-general">

            <div className="product-card">

                <h2>

                    Informations générales

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Nom du produit *

                        </span>

                        <input

                            name="name"

                            value={product.name}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Slug

                        </span>

                        <input

                            name="slug"

                            value={product.slug}

                            onChange={update}

                        />

                    </label>

                </div>

                <label>

                    <span>

                        Description

                    </span>

                    <textarea

                        rows="8"

                        name="description"

                        value={product.description}

                        onChange={update}

                    />

                </label>

            </div>

            <div className="product-card">

                <h2>

                    Classification

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Catégorie

                        </span>

                        <select

                            name="category"

                            value={product.category}

                            onChange={update}

                        >

                            <option value="">

                                Sélectionner

                            </option>

                            {

                                categories.map((category) => (

                                    <option

                                        key={category.id}

                                        value={category.id}

                                    >

                                        {category.name}

                                    </option>

                                ))

                            }

                        </select>

                    </label>

                    <label>

                        <span>

                            Marque

                        </span>

                        <select

                            name="brand"

                            value={product.brand}

                            onChange={update}

                        >

                            <option value="">

                                Sélectionner

                            </option>

                            {

                                brands.map((brand) => (

                                    <option

                                        key={brand.id}

                                        value={brand.id}

                                    >

                                        {brand.name}

                                    </option>

                                ))

                            }

                        </select>

                    </label>

                </div>

                <label>

                    <span>

                        Collection

                    </span>

                    <select

                        name="collection"

                        value={product.collection}

                        onChange={update}

                    >

                        <option value="">

                            Sélectionner

                        </option>

                        {

                            collections.map((collection) => (

                                <option

                                    key={collection.id}

                                    value={collection.id}

                                >

                                    {collection.name}

                                </option>

                            ))

                        }

                    </select>

                </label>

                <label>

                    <span>

                        Tags

                    </span>

                    <input

                        name="tags"

                        placeholder="T-shirt, Premium, Homme..."

                        value={product.tags}

                        onChange={update}

                    />

                </label>

            </div>

        </section>

    );

}

export default ProductGeneralTab;