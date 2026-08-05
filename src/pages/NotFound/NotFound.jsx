import { SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EmptyState from "@components/ui/EmptyState";

import "./NotFound.css";

function NotFound() {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="not-found">

            <EmptyState
                icon={SearchX}
                title={t("notFound.title")}
                description={t("notFound.description")}
                actionLabel={t("notFound.action")}
                onAction={handleGoHome}
            />

        </div>
    );
}

export default NotFound;
