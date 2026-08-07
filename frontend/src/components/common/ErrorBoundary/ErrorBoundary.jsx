import { Component } from "react";

import {
    AlertTriangle,
    RefreshCw,
    Home,
} from "lucide-react";

import Button from "../../ui/Button";

import "./ErrorBoundary.css";

class ErrorBoundary extends Component {

    constructor(props) {

        super(props);

        this.state = {

            hasError: false,

            error: null,

        };

    }

    static getDerivedStateFromError(error) {

        return {

            hasError: true,

            error,

        };

    }

    componentDidCatch(error, errorInfo) {

        console.error(
            "ErrorBoundary",
            error,
            errorInfo
        );

        this.props.onError?.(
            error,
            errorInfo
        );

        // Après un redéploiement, l'index.html mis en cache par le
        // navigateur peut référencer des fichiers JS qui n'existent plus.
        // On tente un rechargement automatique, une seule fois, avant
        // d'afficher l'écran d'erreur.
        const isStaleChunkError =
            /dynamically imported module|Importing a module script failed|Failed to fetch dynamically imported module/i.test(
                error?.message ?? ""
            );

        const alreadyReloaded = sessionStorage.getItem("chunk-reload-attempted");

        if (isStaleChunkError && !alreadyReloaded) {

            sessionStorage.setItem("chunk-reload-attempted", "true");

            window.location.reload();

        }

    }

    reset = () => {

        this.setState({

            hasError: false,

            error: null,

        });

    };

    render() {

        if (!this.state.hasError) {

            return this.props.children;

        }

        return (

            <section className="error-boundary">

                <div className="error-boundary__card">

                    <div className="error-boundary__icon">

                        <AlertTriangle size={70} />

                    </div>

                    <h2>

                        Une erreur est survenue

                    </h2>

                    <p>

                        Une erreur inattendue a empêché
                        l&apos;affichage de cette partie de
                        l&apos;application.

                    </p>

                    {this.props.showDetails &&
                        this.state.error && (

                            <pre>

                                {this.state.error.toString()}

                            </pre>

                        )}

                    <div className="error-boundary__actions">

                        <Button

                            onClick={this.reset}

                        >

                            <RefreshCw size={18} />

                            Réessayer

                        </Button>

                        <Button

                            variant="outline"

                            onClick={() =>

                                window.location.href = "/"

                            }

                        >

                            <Home size={18} />

                            Accueil

                        </Button>

                    </div>

                </div>

            </section>

        );

    }

}

export default ErrorBoundary;