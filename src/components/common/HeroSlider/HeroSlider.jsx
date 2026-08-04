import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "../../ui/Button";

import "./HeroSlider.css";

const HeroSlider = ({
    slides = [],

    autoPlay = true,
    interval = 6000,

    pauseOnHover = true,

    showArrows = true,
    showIndicators = true,

    overlay = true,

    height = "100vh",
}) => {

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const previous = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    useEffect(() => {

        if (
            !autoPlay ||
            paused ||
            slides.length <= 1
        ) {
            return;
        }

        const timer = setInterval(next, interval);

        return () => clearInterval(timer);

    }, [current, paused, autoPlay, interval]);

    if (!slides.length) {return null;}

    const slide = slides[current];

    return (

        <section
            className="hero-slider"
            style={{ height }}
            onMouseEnter={() =>
                pauseOnHover && setPaused(true)
            }
            onMouseLeave={() =>
                pauseOnHover && setPaused(false)
            }
        >

            <AnimatePresence mode="wait">

                <motion.div
                    key={slide.id}
                    className="hero-slider__slide"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .8 }}
                >

                    {slide.video ? (

                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="hero-slider__media"
                        >
                            <source
                                src={slide.video}
                                type="video/mp4"
                            />
                        </video>

                    ) : (

                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="hero-slider__media"
                        />

                    )}

                    {overlay && (
                        <div className="hero-slider__overlay" />
                    )}

                    <div className="hero-slider__content">

                        {slide.subtitle && (
                            <span className="hero-slider__subtitle">
                                {slide.subtitle}
                            </span>
                        )}

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                        >
                            {slide.title}
                        </motion.h1>

                        {slide.description && (

                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: .2
                                }}
                            >
                                {slide.description}
                            </motion.p>

                        )}

                        <div className="hero-slider__buttons">

                            {slide.primaryButton && (

                                <Button
                                    onClick={
                                        slide.primaryButton.onClick
                                    }
                                >
                                    {slide.primaryButton.label}
                                </Button>

                            )}

                            {slide.secondaryButton && (

                                <Button
                                    variant="outline"
                                    onClick={
                                        slide.secondaryButton.onClick
                                    }
                                >
                                    {slide.secondaryButton.label}
                                </Button>

                            )}

                        </div>

                    </div>

                </motion.div>

            </AnimatePresence>

            {showArrows && slides.length > 1 && (

                <>

                    <button
                        className="hero-slider__arrow hero-slider__arrow--left"
                        onClick={previous}
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        className="hero-slider__arrow hero-slider__arrow--right"
                        onClick={next}
                    >
                        <ChevronRight />
                    </button>

                </>

            )}

            {showIndicators && slides.length > 1 && (

                <div className="hero-slider__indicators">

                    {slides.map((_, index) => (

                        <button
                            key={index}
                            className={
                                current === index
                                    ? "hero-slider__dot hero-slider__dot--active"
                                    : "hero-slider__dot"
                            }
                            onClick={() => setCurrent(index)}
                        />

                    ))}

                </div>

            )}

        </section>

    );

};

export default HeroSlider;