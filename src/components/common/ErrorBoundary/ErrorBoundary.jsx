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