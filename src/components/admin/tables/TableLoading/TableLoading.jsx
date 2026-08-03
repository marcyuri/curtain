import Skeleton from "../../feedback/Skeleton";

import "./TableLoading.css";

function TableLoading({

    columns = 6,

    rows = 8,

    selectable = true,

}) {

    return (

        <div className="table-loading">

            <table>

                <thead>

                    <tr>

                        {

                            selectable && (

                                <th>

                                    <Skeleton

                                        width="20px"

                                        height="20px"

                                    />

                                </th>

                            )

                        }

                        {

                            Array.from({

                                length: columns,

                            }).map((_, index) => (

                                <th

                                    key={index}

                                >

                                    <Skeleton

                                        width="80%"

                                        height="18px"

                                    />

                                </th>

                            ))

                        }

                    </tr>

                </thead>

                <tbody>

                    {

                        Array.from({

                            length: rows,

                        }).map((_, row) => (

                            <tr

                                key={row}

                            >

                                {

                                    selectable && (

                                        <td>

                                            <Skeleton

                                                width="20px"

                                                height="20px"

                                            />

                                        </td>

                                    )

                                }

                                {

                                    Array.from({

                                        length: columns,

                                    }).map((_, column) => (

                                        <td

                                            key={column}

                                        >

                                            <Skeleton

                                                width="100%"

                                                height="18px"

                                            />

                                        </td>

                                    ))

                                }

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TableLoading;