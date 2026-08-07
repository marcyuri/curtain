import {

    Search,

    X,

} from "lucide-react";

import "./SearchBar.css";

function SearchBar({

    value = "",

    placeholder = "Rechercher...",

    onChange,

    onClear,

}) {

    return (

        <div className="search-bar">

            <Search

                size={18}

            />

            <input

                type="search"

                value={value}

                placeholder={placeholder}

                onChange={(event) =>

                    onChange?.(

                        event.target.value

                    )

                }

            />

            {

                value && (

                    <button

                        type="button"

                        onClick={onClear}

                    >

                        <X

                            size={16}

                        />

                    </button>

                )

            }

        </div>

    );

}

export default SearchBar;