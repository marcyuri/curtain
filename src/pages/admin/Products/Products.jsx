import { useState } from "react";

import ProductToolbar from "../../../components/admin/products/ProductToolbar";
import ProductFilters from "../../../components/admin/products/ProductFilters";
import ProductTable from "../../../components/admin/products/ProductTable";

import mockProducts from "./mockProducts";

import "./Products.css";

const defaultFilters = {

    status: "",

    category: "",

    stock: "",

};

function Products() {

    const [products] = useState(mockProducts);

    const [filters, setFilters] = useState(defaultFilters);

    const [search, setSearch] = useState("");

    const filteredProducts = products.filter((product) => {

        const matchesSearch =

            product.name

                .toLowerCase()

                .includes(search.toLowerCase());

        const matchesCategory =

            !filters.category ||

            product.category === filters.category;

        const matchesStatus =

            !filters.status ||

            product.status === filters.status;

        const matchesStock =

            !filters.stock ||

            (filters.stock === "available" && product.stock > 0) ||

            (filters.stock === "empty" && product.stock === 0);

        return (

            matchesSearch &&

            matchesCategory &&

            matchesStatus &&

            matchesStock

        );

    });

    return (

        <section className="products-page">

            <header className="page-header">

                <div>

                    <h1>

                        Produits

                    </h1>

                    <p>

                        Gérez le catalogue LOVE CAN BUILD.

                    </p>

                </div>

            </header>

            <ProductToolbar

                search={search}

                onSearch={setSearch}

            />

            <ProductFilters

                filters={filters}

                onChange={setFilters}

                onReset={() => setFilters(defaultFilters)}

            />

            <ProductTable

                products={filteredProducts}

                onView={() => {
                    // TODO: brancher sur productService une fois le backend disponible
                }}

                onEdit={() => {
                    // TODO: brancher sur productService une fois le backend disponible
                }}

                onDelete={() => {
                    // TODO: brancher sur productService une fois le backend disponible
                }}

            />

        </section>

    );

}

export default Products;