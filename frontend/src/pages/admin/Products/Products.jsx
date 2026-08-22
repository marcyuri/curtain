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

    const [products, setProducts] = useState(mockProducts);

    const [filters, setFilters] = useState(defaultFilters);

    const [search, setSearch] = useState("");
    const [notice, setNotice] = useState("");

    const showNotice = (message) => {
        setNotice(message);
        window.setTimeout(() => setNotice(""), 3000);
    };

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

    const exportProducts = () => {
        const headers = ["name", "category", "price", "stock", "status"];
        const csv = [
            headers.join(","),
            ...filteredProducts.map((product) =>
                headers.map((header) => JSON.stringify(product[header] ?? "")).join(",")
            ),
        ].join("\n");
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = "love-can-build-produits.csv";
        link.click();
        URL.revokeObjectURL(url);
        showNotice("Export CSV téléchargé.");
    };

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

            {notice && <p className="admin-page__notice" role="status">{notice}</p>}

            <ProductToolbar

                search={search}

                onSearch={setSearch}

                onFilter={() => document.querySelector(".product-filters")?.scrollIntoView({ behavior: "smooth" })}

                onRefresh={() => {
                    setProducts([...mockProducts]);
                    showNotice("Catalogue actualisé.");
                }}

                onImport={(file) => file && showNotice(`Fichier sélectionné : ${file.name}`)}

                onExport={exportProducts}

                onCreate={() => showNotice("Le formulaire de création sera disponible avec le service produits.")}

            />

            <ProductFilters

                filters={filters}

                onChange={setFilters}

                onReset={() => setFilters(defaultFilters)}

            />

            <ProductTable

                products={filteredProducts}

                onView={(product) => showNotice(`Produit : ${product.name}`)}

                onEdit={(product) => showNotice(`Modification de ${product.name} disponible avec le service produits.`)}

                onDelete={(product) => {
                    if (window.confirm(`Supprimer ${product.name} ?`)) {
                        setProducts((current) => current.filter((item) => item.id !== product.id));
                        showNotice(`${product.name} supprimé de la liste.`);
                    }
                }}

            />

        </section>

    );

}

export default Products;