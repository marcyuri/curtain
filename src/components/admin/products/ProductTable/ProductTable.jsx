import DataTable from "../../DataTable";

import {

    productColumns,

} from "./productColumns";

import "./ProductTable.css";

function ProductTable({

    products = [],

    loading = false,

    onView,

    onEdit,

    onDelete,

}) {

    const columns = productColumns.map(

        (column) => ({

            ...column,

            render: column.render

                ? (row) =>

                    column.render(

                        row,

                        {

                            onView,

                            onEdit,

                            onDelete,

                        }

                    )

                : undefined,

        })

    );

    return (

        <DataTable

            title="Produits"

            subtitle="Catalogue des produits"

            columns={columns}

            rows={products}

            loading={loading}

        />

    );

}

export default ProductTable;