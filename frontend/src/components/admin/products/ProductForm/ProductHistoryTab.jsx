import {

    Calendar,

    User,

    History,

    MessageSquare,

} from "lucide-react";

import "./ProductHistoryTab.css";

function ProductHistoryTab({

    product,

    history = [],

    notes = [],

}) {

    return (

        <section className="product-history">

            <div className="product-card">

                <h2>

                    Informations

                </h2>

                <div className="history-grid">

                    <div>

                        <Calendar size={18} />

                        <div>

                            <strong>

                                Créé le

                            </strong>

                            <span>

                                {product.createdAt}

                            </span>

                        </div>

                    </div>

                    <div>

                        <User size={18} />

                        <div>

                            <strong>

                                Créé par

                            </strong>

                            <span>

                                {product.createdBy}

                            </span>

                        </div>

                    </div>

                    <div>

                        <History size={18} />

                        <div>

                            <strong>

                                Dernière modification

                            </strong>

                            <span>

                                {product.updatedAt}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Journal des actions

                </h2>

                <div className="history-timeline">

                    {

                        history.map((item) => (

                            <article

                                key={item.id}

                                className="history-item"

                            >

                                <div

                                    className="history-dot"

                                />

                                <div>

                                    <strong>

                                        {item.action}

                                    </strong>

                                    <p>

                                        {item.description}

                                    </p>

                                    <small>

                                        {item.user}

                                        {" • "}

                                        {item.date}

                                    </small>

                                </div>

                            </article>

                        ))

                    }

                </div>

            </div>

            <div className="product-card">

                <h2>

                    Notes internes

                </h2>

                <div className="notes-list">

                    {

                        notes.map((note) => (

                            <article

                                key={note.id}

                                className="note-item"

                            >

                                <MessageSquare

                                    size={18}

                                />

                                <div>

                                    <strong>

                                        {note.author}

                                    </strong>

                                    <p>

                                        {note.content}

                                    </p>

                                    <small>

                                        {note.date}

                                    </small>

                                </div>

                            </article>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default ProductHistoryTab;