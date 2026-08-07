import "./ProductSeoTab.css";

function ProductSeoTab({

    product,

    onChange,

}) {

    const update = ({ target }) => {

        onChange?.({

            ...product,

            [target.name]: target.value,

        });

    };

    return (

        <section className="product-seo">

            <div className="product-card">

                <h2>

                    Référencement (SEO)

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Titre SEO

                        </span>

                        <input

                            name="seoTitle"

                            value={product.seoTitle}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            URL canonique

                        </span>

                        <input

                            name="canonicalUrl"

                            value={product.canonicalUrl}

                            onChange={update}

                        />

                    </label>

                </div>

                <label>

                    <span>

                        Description SEO

                    </span>

                    <textarea

                        rows="4"

                        name="seoDescription"

                        value={product.seoDescription}

                        onChange={update}

                    />

                </label>

                <label>

                    <span>

                        Mots-clés

                    </span>

                    <input

                        name="seoKeywords"

                        placeholder="mode, t-shirt, love, premium"

                        value={product.seoKeywords}

                        onChange={update}

                    />

                </label>

            </div>

            <div className="product-card">

                <h2>

                    Réseaux sociaux

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Open Graph Title

                        </span>

                        <input

                            name="ogTitle"

                            value={product.ogTitle}

                            onChange={update}

                        />

                    </label>

                    <label>

                        <span>

                            Twitter Card Title

                        </span>

                        <input

                            name="twitterTitle"

                            value={product.twitterTitle}

                            onChange={update}

                        />

                    </label>

                </div>

                <label>

                    <span>

                        Open Graph Description

                    </span>

                    <textarea

                        rows="3"

                        name="ogDescription"

                        value={product.ogDescription}

                        onChange={update}

                    />

                </label>

                <label>

                    <span>

                        Twitter Description

                    </span>

                    <textarea

                        rows="3"

                        name="twitterDescription"

                        value={product.twitterDescription}

                        onChange={update}

                    />

                </label>

            </div>

            <div className="product-card">

                <h2>

                    Indexation

                </h2>

                <div className="product-grid">

                    <label>

                        <span>

                            Robots

                        </span>

                        <select

                            name="robots"

                            value={product.robots}

                            onChange={update}

                        >

                            <option value="index,follow">

                                Index / Follow

                            </option>

                            <option value="noindex,follow">

                                No Index

                            </option>

                            <option value="index,nofollow">

                                No Follow

                            </option>

                            <option value="noindex,nofollow">

                                No Index / No Follow

                            </option>

                        </select>

                    </label>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Aperçu Google

                </h2>

                <div className="seo-preview">

                    <span>

                        https://lovecanbuild.com/products/{product.slug}

                    </span>

                    <h3>

                        {product.seoTitle || product.name || "Titre SEO"}

                    </h3>

                    <p>

                        {

                            product.seoDescription ||

                            "La description SEO apparaîtra ici."

                        }

                    </p>

                </div>

            </div>

        </section>

    );

}

export default ProductSeoTab;