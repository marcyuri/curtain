import { useEffect } from "react";

function ScrollReveal() {
    useEffect(() => {
        const selector = [
            ".home > section > header",
            ".home > section > [class*='__header']",
            ".home [class$='-card']",
            ".home [class*='__card']",
            ".home [class*='__item']",
            "main[class*='-page'] [class$='-card']",
            "main[class*='-page'] [class*='__card']",
            "main[class*='-page'] [class*='__item']",
            "main[class*='-page'] [data-scroll-reveal]",
            "[data-scroll-reveal]",
        ].join(", ");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            document.querySelectorAll(selector).forEach((element) => {
                element.classList.add("is-visible");
            });
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove("is-hidden");
                    } else {
                        entry.target.classList.add("is-hidden");
                    }
                });
            },
            { threshold: 0.01, rootMargin: "-4% 0px -4%" }
        );

        const updateVisibility = () => {
            document.querySelectorAll(selector).forEach((element) => {
                const bounds = element.getBoundingClientRect();
                const isVisible =
                    bounds.top < window.innerHeight * 0.92 &&
                    bounds.bottom > window.innerHeight * 0.08;

                element.classList.toggle("is-hidden", !isVisible);
            });
        };

        const scan = () => {
            document.querySelectorAll(selector).forEach((element, index) => {
                if (!element.classList.contains("scroll-reveal")) {
                    element.classList.add("scroll-reveal");
                    element.classList.remove("is-hidden");
                    element.style.setProperty(
                        "--reveal-delay",
                        `${Math.min(index % 4, 3) * 70}ms`
                    );
                    observer.observe(element);
                }
            });
        };

        requestAnimationFrame(() => {
            scan();
            updateVisibility();
        });

        const handleViewportChange = () => {
            window.requestAnimationFrame(updateVisibility);
        };

        window.addEventListener("scroll", handleViewportChange, { passive: true });
        window.addEventListener("resize", handleViewportChange);

        const mutations = new MutationObserver(scan);
        const content = document.querySelector(".layout__content");

        if (content) {
            mutations.observe(content, { childList: true, subtree: true });
        }

        return () => {
            observer.disconnect();
            mutations.disconnect();
            window.removeEventListener("scroll", handleViewportChange);
            window.removeEventListener("resize", handleViewportChange);
        };
    }, []);

    return null;
}

export default ScrollReveal;