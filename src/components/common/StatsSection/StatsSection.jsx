import { useEffect, useRef, useState } from "react";
import "./StatsSection.css";

const Counter = ({ value, duration = 1500, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;

                started.current = true;

                let start = 0;
                const increment = value / (duration / 16);

                const timer = setInterval(() => {
                    start += increment;

                    if (start >= value) {
                        setCount(value);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
            },
            { threshold: 0.4 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [value, duration]);

    return (
        <span ref={ref} className="stats-section__number">
            {count}
            {suffix}
        </span>
    );
};

const StatsSection = ({
    title,
    subtitle,
    stats = [],
}) => {
    return (
        <section className="stats-section">
            {(title || subtitle) && (
                <header className="stats-section__header">
                    {title && <h2>{title}</h2>}
                    {subtitle && <p>{subtitle}</p>}
                </header>
            )}

            <div className="stats-section__grid">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <article
                            key={index}
                            className="stats-section__card"
                        >
                            {Icon && (
                                <div className="stats-section__icon">
                                    <Icon size={32} />
                                </div>
                            )}

                            <Counter
                                value={item.value}
                                suffix={item.suffix}
                            />

                            <h3>{item.label}</h3>

                            {item.description && (
                                <p>{item.description}</p>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default StatsSection;