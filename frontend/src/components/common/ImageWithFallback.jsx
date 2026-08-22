import { useState } from "react";
import { ImageOff } from "lucide-react";

import "./ImageWithFallback.css";

function ImageWithFallback({ src, alt = "", fallbackLabel = "Image indisponible", className = "" }) {
    const [hasError, setHasError] = useState(!src);

    if (hasError) {
        return (
            <div className={`image-fallback ${className}`} role="img" aria-label={fallbackLabel}>
                <ImageOff size={28} aria-hidden="true" />
                <span>{fallbackLabel}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    );
}

export default ImageWithFallback;