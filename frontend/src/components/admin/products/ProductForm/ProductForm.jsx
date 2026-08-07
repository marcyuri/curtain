import { useState } from "react";

import {

    ArrowLeft,

    Save,

    Send,

} from "lucide-react";

import productTabs from "./productTabs";

import "./ProductForm.css";

function ProductForm({

    mode = "create",

    children,

    onSave,

    onPublish,

    onBack,

}) {

    const [activeTab, setActiveTab] = useState("general");

    return (

        <section className="product-form">

            <header className="product-form__header">

                <div>

                    <button

                        onClick={onBack}

                    >

                        <ArrowLeft size={18} />

                    </button>

                    <div>

                        <h1>

                            {

                                mode === "create"

                                    ? "Créer un produit"

                                    : "Modifier un produit"

                            }

                        </h1>

                        <p>

                            Gérer toutes les informations du produit.

                        </p>

                    </div>

                </div>

                <div>

                    <button

                        onClick={onSave}

                    >

                        <Save size={18} />

                        Enregistrer

                    </button>

                    <button

                        className="product-form__publish"

                        onClick={onPublish}

                    >

                        <Send size={18} />

                        Publier

                    </button>

                </div>

            </header>

            <nav className="product-form__tabs">

                {

                    productTabs.map((tab) => (

                        <button

                            key={tab.id}

                            className={

                                activeTab === tab.id

                                    ?

                                    "product-form__tab product-form__tab--active"

                                    :

                                    "product-form__tab"

                            }

                            onClick={() => setActiveTab(tab.id)}

                        >

                            {tab.label}

                        </button>

                    ))

                }

            </nav>

            <section className="product-form__body">

                <aside className="product-form__sidebar">

                    <div className="product-preview">

                        <div className="product-preview__image">

                            Image

                        </div>

                        <h3>

                            Nom du produit

                        </h3>

                        <span>

                            Brouillon

                        </span>

                        <ul>

                            <li>Prix</li>

                            <li>Stock</li>

                            <li>Catégorie</li>

                            <li>SKU</li>

                        </ul>

                    </div>

                </aside>

                <main className="product-form__content">

                    {children}

                </main>

            </section>

        </section>

    );

}

export default ProductForm;