import { SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

import EmptyState from "@components/ui/EmptyState";

import "./NotFound.css";

function NotFound() {

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="not-found">

            <EmptyState
                icon={SearchX}
                title="Page introuvable"
                description="La page que vous recherchez n'existe pas ou a été déplacée."
                actionLabel="Retour à l'accueil"
                onAction={handleGoHome}
            />

        </div>
    );
}

export default NotFound;
