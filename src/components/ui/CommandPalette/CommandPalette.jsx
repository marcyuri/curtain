import { useEffect, useMemo, useState } from "react";
import { Search, CornerDownLeft, X } from "lucide-react";
import "./CommandPalette.css";

function CommandPalette({
    open = false,
    onClose,
    commands = [],
    placeholder = "Rechercher une commande..."
}) {

    const [query, setQuery] = useState("");

    useEffect(() => {

        if (!open) {

            setQuery("");

            return;

        }

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {

                onClose?.();

            }

        };

        document.addEventListener("keydown", handleKeyDown);

        document.body.style.overflow = "hidden";

        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            document.body.style.overflow = "";

        };

    }, [open, onClose]);

    const filteredCommands = useMemo(() => {

        return commands.filter((command) =>
            command.label
                .toLowerCase()
                .includes(query.toLowerCase())
        );

    }, [commands, query]);

    if (!open) return null;

    return (

        <div className="command-palette">

            <div
                className="command-palette__overlay"
                onClick={onClose}
            />

            <div className="command-palette__dialog">

                <div className="command-palette__search">

                    <Search size={18} />

                    <input
                        autoFocus
                        value={query}
                        placeholder={placeholder}
                        onChange={(event) =>
                            setQuery(event.target.value)
                        }
                    />

                    <button
                        type="button"
                        onClick={onClose}
                        className="command-palette__close"
                    >

                        <X size={18} />

                    </button>

                </div>

                <div className="command-palette__results">

                    {filteredCommands.length === 0 && (

                        <div className="command-palette__empty">

                            Aucun résultat

                        </div>

                    )}

                    {filteredCommands.map((command) => (

                        <button
                            key={command.id}
                            type="button"
                            className="command-palette__item"
                            onClick={() => {

                                command.action?.();

                                onClose?.();

                            }}
                        >

                            <div className="command-palette__left">

                                {command.icon && (

                                    <command.icon size={18} />

                                )}

                                <span>

                                    {command.label}

                                </span>

                            </div>

                            <CornerDownLeft size={15} />

                        </button>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default CommandPalette;