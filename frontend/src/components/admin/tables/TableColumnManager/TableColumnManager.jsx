import {

    GripVertical,

    Eye,

    EyeOff,

    RotateCcw,

    Save,

} from "lucide-react";

import "./TableColumnManager.css";

function TableColumnManager({

    columns = [],

    onToggle,

    onReset,

    onSave,

    onMove,

}) {

    return (

        <aside className="table-column-manager">

            <header className="table-column-manager__header">

                <h3>

                    Colonnes

                </h3>

            </header>

            <div className="table-column-manager__list">

                {

                    columns.map((column, index) => (

                        <div

                            key={column.key}

                            className="table-column-manager__item"

                        >

                            <button

                                type="button"

                                className="table-column-manager__drag"

                                title="Déplacer"

                            >

                                <GripVertical

                                    size={18}

                                />

                            </button>

                            <span>

                                {column.label}

                            </span>

                            <button

                                type="button"

                                className="table-column-manager__visibility"

                                onClick={() =>

                                    onToggle?.(

                                        column.key

                                    )

                                }

                            >

                                {

                                    column.visible

                                        ? (

                                            <Eye

                                                size={18}

                                            />

                                        )

                                        : (

                                            <EyeOff

                                                size={18}

                                            />

                                        )

                                }

                            </button>

                            <input

                                type="number"

                                min={80}

                                max={600}

                                value={column.width}

                                onChange={(event) =>

                                    onMove?.(

                                        index,

                                        {

                                            ...column,

                                            width: Number(

                                                event.target.value

                                            ),

                                        }

                                    )

                                }

                            />

                        </div>

                    ))

                }

            </div>

            <footer className="table-column-manager__footer">

                <button

                    type="button"

                    onClick={onReset}

                >

                    <RotateCcw

                        size={18}

                    />

                    Réinitialiser

                </button>

                <button

                    type="button"

                    className="table-column-manager__save"

                    onClick={onSave}

                >

                    <Save

                        size={18}

                    />

                    Enregistrer

                </button>

            </footer>

        </aside>

    );

}

export default TableColumnManager;